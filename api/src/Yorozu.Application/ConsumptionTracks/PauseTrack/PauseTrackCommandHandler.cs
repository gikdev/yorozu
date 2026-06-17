using ErrorOr;
using MediatR;
using Yorozu.Application.ConsumptionTracks.Common;
using Yorozu.Application.ContentItems.Common;
using Yorozu.Common.Data;

namespace Yorozu.Application.ConsumptionTracks.PauseTrack;

internal class PauseTrackCommandHandler(
    IConsumptionTrackRepository consumptionTrackRepository,
    IContentItemRepository contentItemRepository,
    IUnitOfWork unitOfWork
) : IRequestHandler<PauseTrackCommand, ErrorOr<ConsumptionTrackSummaryDto>> {
    public async Task<ErrorOr<ConsumptionTrackSummaryDto>> Handle(
        PauseTrackCommand request,
        CancellationToken cancellationToken
    ) {
        var track = await consumptionTrackRepository.GetByIdAsync(request.Id, cancellationToken);
        if (track is null) return Error.NotFound(description: "Track not found");

        var result = track.Pause();
        if (result.IsError) return result.Errors;

        var contentItem = await contentItemRepository.GetByIdAsync(track.ContentItemId, cancellationToken);
        if (contentItem is null) return Error.NotFound(description: "Parent content item not found");

        consumptionTrackRepository.Update(track);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return ConsumptionTrackMapper.MapToSummary(track, contentItem);
    }
}
