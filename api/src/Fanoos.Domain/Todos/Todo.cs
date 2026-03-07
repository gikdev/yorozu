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
    public EnergyLevel EnergyLevel { get; private set; }
    public TodoBucket Bucket { get; private set; }
    public bool IsImportant { get; private set; }
    public bool IsUrgent { get; private set; }
    public bool IsDone { get; private set; }
    public bool IsArchived { get; private set; }

    public static ErrorOr<Todo> Create(
        string title,
        string? context,
        string? project,
        int? time,
        string? tag,
        EnergyLevel? energyLevel,
        TodoBucket? bucket,
        bool? isImportant,
        bool? isUrgent,
        bool? isDone,
        bool? isArchived,
        Guid? id = null
    ) {
        if (string.IsNullOrWhiteSpace(title))
            return TodoErrors.TitleIsEmpty;

        var finalBucket = bucket ?? TodoBucket.Uncategorized;
        var finalIsUrgent = isUrgent ?? false;

        var result = EnsureUrgentSomedayInvariant(finalBucket, finalIsUrgent);
        if (result.IsError) return result.Errors;

        Todo todo = new() {
            Bucket = finalBucket,
            Context = context,
            EnergyLevel = energyLevel ?? EnergyLevel.None,
            Id = id ?? Guid.NewGuid(),
            IsArchived = isArchived ?? false,
            IsDone = isDone ?? false,
            IsImportant = isImportant ?? false,
            IsUrgent = finalIsUrgent,
            Project = project,
            Tag = tag,
            Time = time,
            Title = title,
        };

        return todo;
    }

    public static ErrorOr<Todo> FromRaw(string raw)
        => TodoParser.FromRaw(raw);

    public void SetTitle(string title) => Title = title;
    public void SetTime(int? time) => Time = time;
    public void SetTag(string? tag) => Tag = tag;
    public void SetProject(string? project) => Project = project;
    public void SetContext(string? context) => Context = context;
    public void SetEnergyLevel(EnergyLevel energyLevel) => EnergyLevel = energyLevel;

    public void MarkDone() => IsDone = true;
    public void MarkUndone() => IsDone = false;
    public void ToggleDone() => IsDone = !IsDone;

    public void Archive() => IsArchived = true;
    public void Unarchive() => IsArchived = false;
    public void ToggleArchive() => IsArchived = !IsArchived;

    public ErrorOr<Success> MoveToBucket(TodoBucket bucket) {
        var result = EnsureUrgentSomedayInvariant(bucket, IsUrgent);
        if (result.IsError) return result.Errors;

        Bucket = bucket;

        return Result.Success;
    }

    public ErrorOr<Success> ApplyEisenhowerMatrix(EisenhowerMatrix matrix)
        => SetPriority(
            isUrgent: matrix.IsUrgent,
            isImportant: matrix.IsImportant
        );

    public ErrorOr<Success> SetPriority(bool isImportant, bool isUrgent) {
        var result = EnsureUrgentSomedayInvariant(Bucket, isUrgent);
        if (result.IsError) return result.Errors;

        IsImportant = isImportant;
        IsUrgent = isUrgent;

        return Result.Success;
    }

    private static ErrorOr<Success> EnsureUrgentSomedayInvariant(TodoBucket bucket, bool isUrgent) {
        bool isInSomedayBucket = bucket == TodoBucket.SomedayMaybe;

        if (isUrgent && isInSomedayBucket)
            return TodoErrors.UrgentTodoCannotBeInSomedayBucket;

        return Result.Success;
    }
}
