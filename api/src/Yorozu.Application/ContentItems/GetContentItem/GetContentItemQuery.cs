using ErrorOr;
using MediatR;
using Yorozu.Domain.ContentItems;

namespace Yorozu.Application.ContentItems.GetContentItem;

public record GetContentItemQuery(Guid Id) : IRequest<ErrorOr<ContentItem>>;
