using ErrorOr;
using MediatR;
using Yorozu.Application.Songs.Common;
using Yorozu.Domain.Songs;

namespace Yorozu.Application.Songs.ListSongs;

internal class ListSongsQueryHandler(
    ISongRepository songRepository
) : IRequestHandler<ListSongsQuery, ErrorOr<List<Song>>> {
    public async Task<ErrorOr<List<Song>>> Handle(ListSongsQuery request, CancellationToken cancellationToken) {
        List<Song> songs = await songRepository.ListAsync(cancellationToken);
        return songs;
    }
}
