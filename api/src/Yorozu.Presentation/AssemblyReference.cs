using System.Reflection;

namespace Yorozu.Presentation;

public static class AssemblyReference {
    public static readonly Assembly Assembly = typeof(AssemblyReference).Assembly;
}
