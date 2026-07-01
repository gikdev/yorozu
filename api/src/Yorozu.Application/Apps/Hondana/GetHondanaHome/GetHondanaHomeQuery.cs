using ErrorOr;
using MediatR;

namespace Yorozu.Application.Apps.Hondana.GetHondanaHome;

public sealed record GetHondanaHomeQuery : IRequest<ErrorOr<HondanaHomeDto>>;
