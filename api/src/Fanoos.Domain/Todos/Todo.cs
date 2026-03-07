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

    public static ErrorOr<Todo> FromRaw(string raw)
        => TodoParser.FromRaw(raw);

    public void SetTitle(string title) => Title = title;
    public void SetTime(int? time) => Time = time;
    public void SetTag(string? tag) => Tag = tag;
    public void SetProject(string? project) => Project = project;
    public void SetContext(string? context) => Context = context;
    public void SetEnergyLevel(EnergyLevel energyLevel) => Energy = energyLevel;

    public void MarkDone() => IsDone = true;
    public void MarkUndone() => IsDone = false;
    public void ToggleDone() => IsDone = !IsDone;

    public void Archive() => IsArchived = true;
    public void Unarchive() => IsArchived = false;
    public void ToggleArchive() => IsArchived = !IsArchived;

    public void MoveToBucket(TodoBucket bucket) => Bucket = bucket;

    public void ApplyEisenhowerMatrix(EisenhowerMatrix matrix)
        => SetPriority(
            isUrgent: matrix.IsUrgent,
            isImportant: matrix.IsImportant
        );

    public void SetPriority(bool isImportant, bool isUrgent) {
        IsImportant = isImportant;
        IsUrgent = isUrgent;
    }
}
