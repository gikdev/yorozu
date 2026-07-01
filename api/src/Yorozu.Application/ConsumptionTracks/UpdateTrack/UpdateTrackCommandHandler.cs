using ErrorOr;
using MediatR;
using Yorozu.Application.ConsumptionTracks.Common;
using Yorozu.Application.ContentItems.Common;
using Yorozu.Common.Data;
using Yorozu.Common.Domain;

namespace Yorozu.Application.ConsumptionTracks.UpdateTrack;

internal sealed class UpdateTrackCommandHandler(
    IConsumptionTrackRepository consumptionTrackRepository,
    IContentItemRepository contentItemRepository,
    IUnitOfWork unitOfWork
) : IRequestHandler<UpdateTrackCommand, ErrorOr<ConsumptionTrackSummaryDto>> {
    public async Task<ErrorOr<ConsumptionTrackSummaryDto>> Handle(UpdateTrackCommand request, CancellationToken cancellationToken) {
        var track = await consumptionTrackRepository.GetByIdAsync(request.TrackId, cancellationToken);
        if (track is null) return Error.NotFound(description: "Track not found");

        var contentItem = await contentItemRepository.GetByIdAsync(track.ContentItemId, cancellationToken);
        if (contentItem is null) return Error.NotFound(description: "Parent content item not found");

        var titleResult = NotEmptyString.Create(request.Title);
        if (titleResult.IsError) return titleResult.Errors;
        track.ChangeTitle(titleResult.Value);

        if (request.Description is not null) {
            var descResult = NotEmptyString.Create(request.Description);
            if (descResult.IsError) return descResult.Errors;
            track.ChangeDescription(descResult.Value);
        } else {
            track.ChangeDescription(null);
        }

        consumptionTrackRepository.Update(track);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return ConsumptionTrackMapper.MapToSummary(track, contentItem);
    }
}
