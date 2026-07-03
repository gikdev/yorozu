using ErrorOr;
using MediatR;
using Yorozu.Application.Common;
using Yorozu.Common.Data;
using Yorozu.Domain.ConsumptionTrackLists;

namespace Yorozu.Application.ConsumptionTrackLists.UpdateConsumptionTrackList;

internal sealed class UpdateConsumptionTrackListCommandHandler(
    IConsumptionTrackListRepository consumptionTrackListRepository,
    IUnitOfWork unitOfWork
) : IRequestHandler<UpdateConsumptionTrackListCommand, ErrorOr<ConsumptionTrackList>> {
    public async Task<ErrorOr<ConsumptionTrackList>> Handle(UpdateConsumptionTrackListCommand request, CancellationToken cancellationToken) {
        var existingList = await consumptionTrackListRepository.GetByIdAsync(request.Id, cancellationToken);
        if (existingList is null)
            return Error.NotFound("ConsumptionTrackList.NotFound", $"List with ID {request.Id} was not found.");

        existingList.Title = request.Title;
        existingList.Description = request.Description;

        consumptionTrackListRepository.Update(existingList);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return existingList;
    }
}
