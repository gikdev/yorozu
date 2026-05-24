using System.Reflection;

namespace Yorozu.Application;

public static class AssemblyReference {
    public static readonly Assembly Assembly = typeof(AssemblyReference).Assembly;
}
