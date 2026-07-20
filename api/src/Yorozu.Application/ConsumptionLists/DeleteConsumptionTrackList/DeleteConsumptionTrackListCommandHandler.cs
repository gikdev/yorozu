using ErrorOr;
using MediatR;
using Yorozu.Application.Common;
using Yorozu.Common.Data;

namespace Yorozu.Application.ConsumptionTrackLists.DeleteConsumptionTrackList;

internal sealed class DeleteConsumptionTrackListCommandHandler(
    IConsumptionListRepository consumptionTrackListRepository,
    IUnitOfWork unitOfWork
) : IRequestHandler<DeleteConsumptionTrackListCommand, ErrorOr<Success>> {
    public async Task<ErrorOr<Success>> Handle(DeleteConsumptionTrackListCommand request, CancellationToken cancellationToken) {
        var existingList = await consumptionTrackListRepository.GetByIdAsync(request.Id, cancellationToken);
        if (existingList is null)
            return Error.NotFound("ConsumptionTrackList.NotFound", $"List with ID {request.Id} was not found.");

        consumptionTrackListRepository.Delete(existingList);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return Result.Success;
    }
}
