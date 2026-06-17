using ErrorOr;
using MediatR;

namespace Yorozu.Application.ConsumptionTracks.DeleteTrack;

public record DeleteTrackCommand(Guid TrackId) : IRequest<ErrorOr<Success>>;
