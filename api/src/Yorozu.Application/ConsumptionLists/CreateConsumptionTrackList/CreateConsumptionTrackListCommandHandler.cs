using ErrorOr;
using MediatR;
using Yorozu.Application.Common;
using Yorozu.Common.Data;
using Yorozu.Domain.ConsumptionLists;

namespace Yorozu.Application.ConsumptionTrackLists.CreateConsumptionTrackList;

internal sealed class CreateConsumptionTrackListCommandHandler(
    IConsumptionListRepository consumptionTrackListRepository,
    IUnitOfWork unitOfWork
) : IRequestHandler<CreateConsumptionTrackListCommand, ErrorOr<ConsumptionList>> {
    public async Task<ErrorOr<ConsumptionList>> Handle(CreateConsumptionTrackListCommand request, CancellationToken cancellationToken) {
        var newList = new ConsumptionList {
            Title = request.Title,
            Description = request.Description,
        };

        consumptionTrackListRepository.Add(newList);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return newList;
    }
}
