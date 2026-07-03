using ErrorOr;
using MediatR;
using Yorozu.Application.Common;
using Yorozu.Common.Data;
using Yorozu.Domain.ConsumptionTrackLists;

namespace Yorozu.Application.ConsumptionTrackLists.CreateConsumptionTrackList;

internal sealed class CreateConsumptionTrackListCommandHandler(
    IConsumptionTrackListRepository consumptionTrackListRepository,
    IUnitOfWork unitOfWork
) : IRequestHandler<CreateConsumptionTrackListCommand, ErrorOr<ConsumptionTrackList>> {
    public async Task<ErrorOr<ConsumptionTrackList>> Handle(CreateConsumptionTrackListCommand request, CancellationToken cancellationToken) {
        var newList = new ConsumptionTrackList {
            Title = request.Title,
            Description = request.Description,
        };

        consumptionTrackListRepository.Add(newList);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return newList;
    }
}
