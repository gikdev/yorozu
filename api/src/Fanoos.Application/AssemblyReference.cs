using System.Reflection;

namespace Fanoos.Application;

public static class AssemblyReference {
    public static readonly Assembly Assembly = typeof(AssemblyReference).Assembly;
}
