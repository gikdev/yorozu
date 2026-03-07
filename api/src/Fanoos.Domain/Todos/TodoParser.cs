#pragma warning disable S3626 // Jump statements should not be redundant

using ErrorOr;

namespace Fanoos.Domain.Todos;

internal static class TodoParser {
    private const char ContextAnnotationSign = '@';
    private const char ProjectAnnotationSign = '+';
    private const char TagAnnotationSign = '#';
    private const char TimeAnnotationSign = '~';

    private static List<string> SplitToList(string raw)
        => raw.Split(' ', StringSplitOptions.RemoveEmptyEntries).ToList();

    private static string JoinTokens(List<string> tokens)
        => string.Join(' ', tokens);

    private static string? DecodeAnnotation(string token, char sign) {
        bool startsWithTheSign = token.StartsWith(sign);
        bool isMoreThanTheSign = token.Length > 1;

        bool isValid = startsWithTheSign && isMoreThanTheSign;

        if (!isValid) return null;

        string annotation = token.Substring(1);

        return annotation;
    }

    private static string? DecodeContextAnnotation(string token)
        => DecodeAnnotation(token, ContextAnnotationSign);

    private static string? DecodeProjectAnnotation(string token)
        => DecodeAnnotation(token, ProjectAnnotationSign);

    private static string? DecodeTagAnnotation(string token)
        => DecodeAnnotation(token, TagAnnotationSign);

    private static int? DecodeTimeAnnotation(string token) {
        var annotation = DecodeAnnotation(token, TimeAnnotationSign);

        if (annotation == null) return null;

        bool succeeded = int.TryParse(annotation, out int time);

        if (!succeeded) return null;

        return time;
    }

    private static EnergyLevel? DecodeEnergyAnnotation(string token)
        => token switch {
            ".$" => EnergyLevel.Low,
            ".$$" => EnergyLevel.Medium,
            ".$$$" => EnergyLevel.High,
            _ => null,
        };

    private static bool? DecodeCompletionAnnotation(string token)
        => token == ".x" ? true : null;

    private static EisenhowerMatrix? DecodeEisenhowerMatrixAnnotation(string token)
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

    internal static ErrorOr<Todo> FromRaw(string raw) {
        if (string.IsNullOrWhiteSpace(raw))
            return TodoErrors.RawInputIsEmpty;

        var input = raw.Trim();

        List<string> tokens = SplitToList(input);

        string? finalContext = null;
        EnergyLevel finalEnergy = EnergyLevel.None;
        TodoBucket finalBucket = TodoBucket.Uncategorized;
        string? finalProject = null;
        string? finalTag = null;
        int? finalTime = null;
        bool? finalIsImportant = null;
        bool? finalIsUrgent = null;
        bool? finalIsDone = null;

        // Iterate backwards to allow removal!
        for (int i = tokens.Count - 1; i >= 0; i--) {
            var token = tokens[i];

            if (DecodeCompletionAnnotation(token) is { } isDone) {
                finalIsDone = isDone;
                tokens.RemoveAt(i);
                continue;
            }

            if (DecodeContextAnnotation(token) is { } context) {
                finalContext = context;
                tokens.RemoveAt(i);
                continue;
            }

            if (DecodeEnergyAnnotation(token) is { } energy) {
                finalEnergy = energy;
                tokens.RemoveAt(i);
                continue;
            }

            if (DecodeProjectAnnotation(token) is { } project) {
                finalProject = project;
                tokens.RemoveAt(i);
                continue;
            }

            if (DecodeTagAnnotation(token) is { } tag) {
                finalTag = tag;
                tokens.RemoveAt(i);
                continue;
            }

            if (DecodeTimeAnnotation(token) is { } time) {
                finalTime = time;
                tokens.RemoveAt(i);
                continue;
            }

            if (DecodeEisenhowerMatrixAnnotation(token) is { } matrix) {
                finalIsImportant = matrix.IsImportant;
                finalIsUrgent = matrix.IsUrgent;
                tokens.RemoveAt(i);
                continue;
            }
        }

        string finalTitle = JoinTokens(tokens);

        return Todo.Create(
            id: null,
            isArchived: null,
            isDone: finalIsDone,
            isUrgent: finalIsUrgent,
            isImportant: finalIsImportant,
            bucket: finalBucket,
            energy: finalEnergy,
            tag: finalTag,
            time: finalTime,
            project: finalProject,
            context: finalContext,
            title: finalTitle
        );
    }
}
