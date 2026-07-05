using ErrorOr;
using MediatR;
using Yorozu.Domain.ContentItems;

namespace Yorozu.Application.ContentItems.GetContentItem;

public sealed record GetContentItemQuery(Guid Id) : IRequest<ErrorOr<ContentItem>>;
