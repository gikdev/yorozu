using ErrorOr;
using MediatR;
using Yorozu.Application.Common;
using Yorozu.Common.Data;
using Yorozu.Domain.ConsumptionLists;

namespace Yorozu.Application.ConsumptionTrackLists.UpdateConsumptionList;

internal sealed class UpdateConsumptionListCommandHandler(
    IConsumptionListRepository repo,
    IUnitOfWork unitOfWork
) : IRequestHandler<UpdateConsumptionListCommand, ErrorOr<ConsumptionList>> {
    public async Task<ErrorOr<ConsumptionList>> Handle(UpdateConsumptionListCommand request, CancellationToken cancellationToken) {
        var existingList = await repo.GetByIdAsync(request.Id, cancellationToken);
        if (existingList is null)
            return Error.NotFound("ConsumptionTrackList.NotFound", $"List with ID {request.Id} was not found.");

        existingList.Title = request.Title;
        existingList.Description = request.Description;

        repo.Update(existingList);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return existingList;
    }
}
