using ErrorOr;
using MediatR;

namespace Yorozu.Application.ContentItems.ListAllContentItemTags;

public record ListAllContentItemTagsQuery : IRequest<ErrorOr<List<string>>>;
