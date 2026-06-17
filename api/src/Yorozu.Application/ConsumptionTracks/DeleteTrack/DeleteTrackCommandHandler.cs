using ErrorOr;
using MediatR;
using Yorozu.Application.ConsumptionTracks.Common;
using Yorozu.Common.Data;

namespace Yorozu.Application.ConsumptionTracks.DeleteTrack;

internal class DeleteTrackCommandHandler(
    IConsumptionTrackRepository consumptionTrackRepository,
    IUnitOfWork unitOfWork
) : IRequestHandler<DeleteTrackCommand, ErrorOr<Success>> {
    public async Task<ErrorOr<Success>> Handle(DeleteTrackCommand request, CancellationToken cancellationToken) {
        var track = await consumptionTrackRepository.GetByIdAsync(request.TrackId, cancellationToken);
        if (track is null) return Error.NotFound(description: "Track not found");

        consumptionTrackRepository.Remove(track);
        await unitOfWork.SaveChangesAsync(cancellationToken);
        return Result.Success;
    }
}
