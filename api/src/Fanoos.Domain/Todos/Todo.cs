using ErrorOr;
using Fanoos.Common.Domain;

namespace Fanoos.Domain.Todos;

public class Todo : IAggregateRoot {
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.
    private Todo() { }
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.

    public Guid Id { get; private init; }
    public string Title { get; private set; }
    public string? Context { get; private set; }
    public string? Project { get; private set; }
    public int? Time { get; private set; }
    public string? Tag { get; private set; }
    public EnergyLevel Energy { get; private set; }
    public TodoBucket Bucket { get; private set; }
    public bool IsImportant { get; private set; }
    public bool IsUrgent { get; private set; }
    public bool IsDone { get; private set; }
    public bool IsArchived { get; private set; }

    public static ErrorOr<Todo> FromRaw(string raw) {
        if (string.IsNullOrWhiteSpace(raw))
            return TodoErrors.RawInputIsEmpty;

        var input = raw.Trim();

        List<string> tokens = TodoParser.SplitToList(input);

        Todo todo = new() {
            Id = Guid.NewGuid(),

            IsDone = false,
            IsArchived = false,
            IsImportant = false,
            IsUrgent = false,

            Context = null,
            Energy = EnergyLevel.None,
            Bucket = TodoBucket.Uncategorized,
            Project = null,
            Tag = null,
            Time = null,

            Title = "",
        };

        // Iterate backwards to allow removal!
        for (int i = tokens.Count - 1; i >= 0; i--) {
            var token = tokens[i];

            if (TodoParser.DecodeContextAnnotation(token) is { } context) {
                todo.Context = context;
                tokens.RemoveAt(i);
                continue;
            }

            if (TodoParser.DecodeEnergyAnnotation(token) is { } energy) {
                todo.Energy = energy;
                tokens.RemoveAt(i);
                continue;
            }

            if (TodoParser.DecodeProjectAnnotation(token) is { } project) {
                todo.Project = project;
                tokens.RemoveAt(i);
                continue;
            }

            if (TodoParser.DecodeTagAnnotation(token) is { } tag) {
                todo.Tag = tag;
                tokens.RemoveAt(i);
                continue;
            }

            if (TodoParser.DecodeTimeAnnotation(token) is { } time) {
                todo.Time = time;
                tokens.RemoveAt(i);
                continue;
            }

            if (TodoParser.DecodeEisenhowerMatrixAnnotation(token) is { } matrix) {
                todo.IsImportant = matrix.IsImportant;
                todo.IsUrgent = matrix.IsUrgent;
                tokens.RemoveAt(i);
                continue;
            }
        }

        todo.Title = TodoParser.JoinTokenList(tokens);

        return todo;
    }

    public static ErrorOr<Todo> Create(
        string title,
        string? context,
        string? project,
        int? time,
        string? tag,
        EnergyLevel? energy,
        TodoBucket? bucket,
        bool? isImportant,
        bool? isUrgent,
        bool? isDone,
        bool? isArchived,
        Guid? id = null
    ) {
        if (string.IsNullOrWhiteSpace(title))
            return TodoErrors.TitleIsEmpty;

        Todo todo = new() {
            Bucket = bucket ?? TodoBucket.Uncategorized,
            Context = context,
            Energy = energy ?? EnergyLevel.None,
            Id = id ?? Guid.NewGuid(),
            IsArchived = isArchived ?? false,
            IsDone = isDone ?? false,
            IsImportant = isImportant ?? false,
            IsUrgent = isUrgent ?? false,
            Project = project,
            Tag = tag,
            Time = time,
            Title = title,
        };

        return todo;
    }

    public void UpdateTitle(string newRawTitle) {
        var input = newRawTitle.Trim();

        List<string> tokens = TodoParser.SplitToList(input);

        // Iterate backwards to allow removal!
        for (int i = tokens.Count - 1; i >= 0; i--) {
            var token = tokens[i];

            if (TodoParser.DecodeContextAnnotation(token) is { } context) {
                Context = context;
                tokens.RemoveAt(i);
                continue;
            }

            if (TodoParser.DecodeEnergyAnnotation(token) is { } energy) {
                Energy = energy;
                tokens.RemoveAt(i);
                continue;
            }

            if (TodoParser.DecodeProjectAnnotation(token) is { } project) {
                Project = project;
                tokens.RemoveAt(i);
                continue;
            }

            if (TodoParser.DecodeTagAnnotation(token) is { } tag) {
                Tag = tag;
                tokens.RemoveAt(i);
                continue;
            }

            if (TodoParser.DecodeTimeAnnotation(token) is { } time) {
                Time = time;
                tokens.RemoveAt(i);
                continue;
            }

            if (TodoParser.DecodeEisenhowerMatrixAnnotation(token) is { } matrix) {
                IsImportant = matrix.IsImportant;
                IsUrgent = matrix.IsUrgent;
                tokens.RemoveAt(i);
                continue;
            }
        }

        Title = TodoParser.JoinTokenList(tokens);
    }

    public void UpdateDone(bool? isDone) {
        IsDone = isDone ?? !IsDone;
    }

    public void UpdateArchived(bool? shouldBeArchived) {
        IsArchived = shouldBeArchived ?? !IsArchived;
    }

    public string ToRawString() {
        List<string> tokens = [];

        if (IsUrgent || IsImportant)
            TodoParser.EncodeEisenhowerMatrixAnnotation(new EisenhowerMatrix {
                IsImportant = IsImportant,
                IsUrgent = IsUrgent,
            });

        tokens.Add(Title);


        if (!string.IsNullOrWhiteSpace(Context)) {
            string token = TodoParser.EncodeContextAnnotation(Context);
            tokens.Add(token);
        }

        if (!string.IsNullOrWhiteSpace(Tag)) {
            string token = TodoParser.EncodeTagAnnotation(Tag);
            tokens.Add(token);
        }

        if (!string.IsNullOrWhiteSpace(Project)) {
            string token = TodoParser.EncodeProjectAnnotation(Project);
            tokens.Add(token);
        }

        if (Time.HasValue) {
            string token = TodoParser.EncodeTimeAnnotation(Time.Value);
            tokens.Add(token);
        }

        if (Energy != null) {
            string? token = TodoParser.EncodeEnergyAnnotation(Energy);
            if (token != null) {
                tokens.Add(token);
            }
        }

        return TodoParser.JoinTokenList(tokens);
    }
}
