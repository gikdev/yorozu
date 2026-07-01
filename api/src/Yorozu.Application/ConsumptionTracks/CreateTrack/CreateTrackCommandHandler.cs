using ErrorOr;
using MediatR;
using Yorozu.Application.ConsumptionTracks.Common;
using Yorozu.Application.ContentItems.Common;
using Yorozu.Common.Data;
using Yorozu.Common.Domain;
using Yorozu.Domain;

namespace Yorozu.Application.ConsumptionTracks.CreateTrack;

internal sealed class CreateTrackCommandHandler(
    IContentItemRepository contentItemRepository,
    IConsumptionTrackRepository consumptionTrackRepository,
    IUnitOfWork unitOfWork
) : IRequestHandler<CreateTrackCommand, ErrorOr<ConsumptionTrackSummaryDto>> {
    public async Task<ErrorOr<ConsumptionTrackSummaryDto>> Handle(CreateTrackCommand request, CancellationToken cancellationToken) {
        var contentItem = await contentItemRepository.GetByIdAsync(request.ContentItemId, cancellationToken);
        if (contentItem is null) return Error.NotFound(description: "Content item not found");

        var titleResult = NotEmptyString.Create(request.Title);
        if (titleResult.IsError) return titleResult.Errors;

        NotEmptyString? description = null;
        if (request.Description is not null) {
            var descResult = NotEmptyString.Create(request.Description);
            if (descResult.IsError) return descResult.Errors;
            description = descResult.Value;
        }

        var trackResult = CommonService.CreateTrack(contentItem, titleResult.Value, description);
        if (trackResult.IsError) return trackResult.Errors;

        var track = trackResult.Value;
        consumptionTrackRepository.Add(track);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return ConsumptionTrackMapper.MapToSummary(track, contentItem);
    }
}
