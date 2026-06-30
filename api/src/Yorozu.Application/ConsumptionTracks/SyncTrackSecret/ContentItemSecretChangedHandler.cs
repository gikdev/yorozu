using MediatR;
using Yorozu.Application.ConsumptionTracks.Common;
using Yorozu.Common.Data;
using Yorozu.Domain.ContentItems;

namespace Yorozu.Application.ConsumptionTracks.SyncTrackSecret;

internal sealed class ContentItemSecretChangedHandler(
    IConsumptionTrackRepository trackRepository,
    IUnitOfWork unitOfWork
) : INotificationHandler<ContentItemSecretChangedDomainEvent> {
    public async Task Handle(
        ContentItemSecretChangedDomainEvent notification,
        CancellationToken cancellationToken
    ) {
        var tracks = await trackRepository.GetByContentItemIdAsync(
            notification.ContentItemId,
            cancellationToken
        );

        foreach (var track in tracks)
            track.SyncSecret(notification.IsSecret);

        await unitOfWork.SaveChangesAsync(cancellationToken);
    }
}
