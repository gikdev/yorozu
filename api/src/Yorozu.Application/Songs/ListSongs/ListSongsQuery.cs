using ErrorOr;
using MediatR;
using Yorozu.Domain.Songs;

namespace Yorozu.Application.Songs.ListSongs;

public sealed record ListSongsQuery : IRequest<ErrorOr<List<Song>>>;
