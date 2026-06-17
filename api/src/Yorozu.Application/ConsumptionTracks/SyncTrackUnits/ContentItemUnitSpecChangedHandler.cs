using MediatR;
using Yorozu.Application.ConsumptionTracks.Common;
using Yorozu.Common.Data;
using Yorozu.Domain.ContentItems;

namespace Yorozu.Application.ConsumptionTracks.SyncTrackUnits;

internal sealed class ContentItemUnitSpecChangedHandler(
    IConsumptionTrackRepository trackRepository,
    IUnitOfWork unitOfWork
) : INotificationHandler<ContentItemUnitSpecChangedDomainEvent> {
    public async Task Handle(
        ContentItemUnitSpecChangedDomainEvent notification,
        CancellationToken cancellationToken
    ) {
        var tracks = await trackRepository.GetByContentItemIdAsync(
            notification.ContentItemId,
            cancellationToken
        );

        foreach (var track in tracks)
            track.SyncTotalUnits(notification.TotalUnits);

        await unitOfWork.SaveChangesAsync(cancellationToken);
    }
}
