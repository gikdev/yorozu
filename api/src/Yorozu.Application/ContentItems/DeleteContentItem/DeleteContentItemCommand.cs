using ErrorOr;
using MediatR;

namespace Yorozu.Application.ContentItems.DeleteContentItem;

public record DeleteContentItemCommand(Guid Id) : IRequest<ErrorOr<Deleted>>;
