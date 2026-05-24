using Microsoft.AspNetCore.Routing;

namespace Yorozu.Common.Endpoints;

public interface IEndpoint {
    void MapEndpoint(IEndpointRouteBuilder app);
}
