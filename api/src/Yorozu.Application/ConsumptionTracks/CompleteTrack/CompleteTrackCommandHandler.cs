using ErrorOr;
using MediatR;
using Yorozu.Application.ConsumptionTracks.Common;
using Yorozu.Application.ContentItems.Common;
using Yorozu.Common.Data;

namespace Yorozu.Application.ConsumptionTracks.CompleteTrack;

internal class CompleteTrackCommandHandler(
    IConsumptionTrackRepository consumptionTrackRepository,
    IContentItemRepository contentItemRepository,
    IUnitOfWork unitOfWork
) : IRequestHandler<CompleteTrackCommand, ErrorOr<ConsumptionTrackSummaryDto>> {
    public async Task<ErrorOr<ConsumptionTrackSummaryDto>> Handle(
        CompleteTrackCommand request,
        CancellationToken cancellationToken
    ) {
        var track = await consumptionTrackRepository.GetByIdAsync(request.Id, cancellationToken);
        if (track is null) return Error.NotFound(description: "Track not found");

        var result = track.Complete();
        if (result.IsError) return result.Errors;

        var contentItem = await contentItemRepository.GetByIdAsync(track.ContentItemId, cancellationToken);
        if (contentItem is null) return Error.NotFound(description: "Parent content item not found");

        consumptionTrackRepository.Update(track);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return ConsumptionTrackMapper.MapToSummary(track, contentItem);
    }
}
