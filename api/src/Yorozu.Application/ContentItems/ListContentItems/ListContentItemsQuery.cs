using ErrorOr;
using MediatR;
using Yorozu.Domain.ContentItems;

namespace Yorozu.Application.ContentItems.ListContentItems;

public record ListContentItemsQuery : IRequest<ErrorOr<List<ContentItem>>>;
