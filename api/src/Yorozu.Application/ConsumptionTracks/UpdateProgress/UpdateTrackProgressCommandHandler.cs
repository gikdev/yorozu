using ErrorOr;
using MediatR;
using Yorozu.Application.ConsumptionTracks.Common;
using Yorozu.Application.ContentItems.Common;
using Yorozu.Common.Data;

namespace Yorozu.Application.ConsumptionTracks.UpdateProgress;

internal sealed class UpdateTrackProgressCommandHandler(
    IConsumptionTrackRepository consumptionTrackRepository,
    IContentItemRepository contentItemRepository,
    IUnitOfWork unitOfWork
) : IRequestHandler<UpdateTrackProgressCommand, ErrorOr<ConsumptionTrackSummaryDto>> {
    public async Task<ErrorOr<ConsumptionTrackSummaryDto>> Handle(UpdateTrackProgressCommand request, CancellationToken cancellationToken) {
        var track = await consumptionTrackRepository.GetByIdAsync(request.TrackId, cancellationToken);
        if (track is null) return Error.NotFound(description: "Track not found");

        var contentItem = await contentItemRepository.GetByIdAsync(track.ContentItemId, cancellationToken);
        if (contentItem is null) return Error.NotFound(description: "Parent content item not found");

        ErrorOr<Success> result = request.Action switch {
            ProgressAction.Set => track.SetProgress(request.Amount),
            ProgressAction.Increment => track.IncrementProgress(request.Amount),
            ProgressAction.Decrement => track.DecrementProgress(request.Amount),
            _ => Error.Validation(description: "Invalid progress action")
        };

        if (result.IsError) return result.Errors;

        consumptionTrackRepository.Update(track);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return ConsumptionTrackMapper.MapToSummary(track, contentItem);
    }
}
