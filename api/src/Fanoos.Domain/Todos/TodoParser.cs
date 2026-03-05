using System.Diagnostics.CodeAnalysis;

namespace Fanoos.Domain.Todos;

internal static class TodoParser {
    private const char ContextAnnotationSign = '@';
    private const char ProjectAnnotationSign = '+';
    private const char TagAnnotationSign = '#';
    private const char TimeAnnotationSign = '~';

    internal static List<string> SplitToList(string raw) {
        return raw.Split(' ').ToList();
    }

    internal static string JoinTokenList(List<string> tokens) {
        return string.Join(' ', tokens);
    }

    private static string? DecodeAnnotation(string token, char sign) {
        bool startsWithTheSign = token.StartsWith(sign);
        bool isMoreThanTheSign = token.Length > 1;

        bool isValid = startsWithTheSign && isMoreThanTheSign;

        if (!isValid) return null;

        string annotation = token.Substring(1);

        return annotation;
    }

    private static string EncodeAnnotation(string annotation, char sign) {
        return sign.ToString() + annotation;
    }

    internal static string? DecodeContextAnnotation(string token)
        => DecodeAnnotation(token, ContextAnnotationSign);

    internal static string EncodeContextAnnotation(string annotation)
        => EncodeAnnotation(annotation, ContextAnnotationSign);

    internal static string? DecodeProjectAnnotation(string token)
        => DecodeAnnotation(token, ProjectAnnotationSign);

    internal static string EncodeProjectAnnotation(string annotation)
        => EncodeAnnotation(annotation, ProjectAnnotationSign);

    internal static string? DecodeTagAnnotation(string token)
        => DecodeAnnotation(token, TagAnnotationSign);

    internal static string EncodeTagAnnotation(string annotation)
        => EncodeAnnotation(annotation, TagAnnotationSign);

    internal static int? DecodeTimeAnnotation(string token) {
        var annotation = DecodeAnnotation(token, TimeAnnotationSign);

        if (annotation == null) return null;

        bool succeeded = int.TryParse(annotation, out int time);

        if (!succeeded) return null;

        return time;
    }

    internal static string EncodeTimeAnnotation(int time)
        => EncodeAnnotation(time.ToString(), TimeAnnotationSign);

    internal static EnergyLevel? DecodeEnergyAnnotation(string token)
        => token switch {
            ".$" => EnergyLevel.Low,
            ".$$" => EnergyLevel.Medium,
            ".$$$" => EnergyLevel.High,
            _ => null,
        };

    internal static string? EncodeEnergyAnnotation(EnergyLevel? energyLevel)
        => energyLevel switch {
            EnergyLevel.Low => ".$",
            EnergyLevel.Medium => ".$$",
            EnergyLevel.High => ".$$$",
            _ => null,
        };

    internal static EisenhowerMatrix? DecodeEisenhowerMatrixAnnotation(string token)
        => token switch {
            ".*" => new EisenhowerMatrix {
                IsImportant = true,
                IsUrgent = false,
            },
            ".!" => new EisenhowerMatrix {
                IsImportant = false,
                IsUrgent = true,
            },
            ".*!" => new EisenhowerMatrix {
                IsImportant = true,
                IsUrgent = true,
            },
            ".!*" => new EisenhowerMatrix {
                IsImportant = true,
                IsUrgent = true,
            },
            _ => null,
        };

    internal static string? EncodeEisenhowerMatrixAnnotation(EisenhowerMatrix matrix)
        => matrix switch {
            { IsImportant: true, IsUrgent: true } => ".!*",
            { IsImportant: true } => ".*",
            { IsUrgent: true } => ".!",
            _ => null,
        };
}
