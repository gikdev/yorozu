using ErrorOr;
using MediatR;
using Yorozu.Application.Common;

namespace Yorozu.Application.Apps.Hondana.GetHondanaHome;

internal sealed class GetHondanaHomeQueryHandler(
    IConsumptionTrackListRepository consumptionTrackListRepository
) : IRequestHandler<GetHondanaHomeQuery, ErrorOr<HondanaHomeDto>> {
    public async Task<ErrorOr<HondanaHomeDto>> Handle(GetHondanaHomeQuery request, CancellationToken cancellationToken) {
        var lists = await consumptionTrackListRepository.GetAllAsync(cancellationToken);

        return new HondanaHomeDto {
            ConsumptionTrackLists = lists,
        };
    }
}
