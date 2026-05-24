#pragma warning disable CA1032 // Implement standard exception constructors

namespace Yorozu.Common.Exceptions;

public sealed class YorozuException(
    string requestName,
    Exception? innerException = default
) : Exception("Application exception", innerException) {
    public string RequestName { get; } = requestName;
}
