#pragma warning disable CA1002 // Do not expose generic lists
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.

using ErrorOr;
using Fanoos.Common.Domain;

namespace Fanoos.Domain.Todos;

public sealed class Todo : IAggregateRoot {
    private List<NotEmptyString> _contexts = [];

    private Todo() { }

    public Guid Id { get; private init; }
    public NotEmptyString Title { get; set; }

    /// <summary>
    /// Represents the user's motivation, desired outcome, or the "why" behind this task.
    /// </summary>
    public NotEmptyString? Why { get; set; }

    public NotEmptyString? Description { get; set; }
    public bool IsDone { get; private set; }

    /// <summary>
    /// Estimated effort in pomodoros.
    /// 0 = very small task (no dedicated block).
    /// >0 = number of sessions.
    /// </summary>
    public byte? EstimatedPomodoros { get; set; }

    /// <summary>
    /// Indicates urgency (Eisenhower Matrix).
    /// </summary>
    public bool IsUrgent { get; private set; }

    public FutureDateTimeOffset? DueDate { get; set; }

    /// <summary>
    /// Contexts (e.g., @home, @pen) based on TodoTXT format.
    /// </summary>
    public IReadOnlyList<NotEmptyString> Contexts => _contexts.AsReadOnly();

    public TodoPriority Priority { get; set; }
    public TodoEffortType EffortType { get; set; }
    public EnergyLevel EnergyLevel { get; set; }
    public TodoBucket Bucket { get; private set; }
    public WaitingForInfo? WaitingForInfo { get; private set; }

    public static ErrorOr<Todo> Create(
        NotEmptyString title,
        NotEmptyString? why,
        NotEmptyString? description,
        byte? estimatedPomodoros,
        bool? isUrgent,
        bool? isDone,
        FutureDateTimeOffset? dueDate,
        List<NotEmptyString>? contexts,
        TodoPriority? priority,
        TodoEffortType? effortType,
        EnergyLevel? energyLevel,
        TodoBucket? bucket,
        WaitingForInfo? waitingForInfo,
        Guid? id = null
    ) {
        var todo = new Todo {
            Id = id ?? Guid.NewGuid(),
            Title = title,
            Bucket = bucket ?? TodoBucket.Uncategorized,
            Description = description,
            DueDate = dueDate,
            EffortType = effortType ?? TodoEffortType.Unknown,
            EnergyLevel = energyLevel ?? EnergyLevel.Unknown,
            IsDone = isDone ?? false,
            IsUrgent = isUrgent ?? false,
            EstimatedPomodoros = estimatedPomodoros,
            Priority = priority ?? TodoPriority.Unknown,
            WaitingForInfo = waitingForInfo,
            Why = why,
            _contexts = contexts ?? [],
        };

        return todo;
    }

    public void MarkDone() => IsDone = true;
    public void MarkUndone() => IsDone = false;
    public void ToggleDone() => IsDone = !IsDone;

    public void SetContexts(List<NotEmptyString> contexts) {
        _contexts = contexts;
    }

    public ErrorOr<Success> MoveToBucket(TodoBucket bucket, WaitingForInfo? waitingForInfo) {
        var result1 = EnsureUrgentSomedayInvariant(bucket, IsUrgent);
        if (result1.IsError) return result1.Errors;

        var result2 = EnsureBucketAndWaitingInfoInvariant(bucket, waitingForInfo);
        if (result2.IsError) return result2.Errors;

        Bucket = bucket;
        WaitingForInfo = waitingForInfo;

        return Result.Success;
    }

    public ErrorOr<Success> SetWaitingForInfo(WaitingForInfo? waitingForInfo) {
        var result = EnsureBucketAndWaitingInfoInvariant(Bucket, waitingForInfo);
        if (result.IsError) return result.Errors;

        WaitingForInfo = waitingForInfo;

        return Result.Success;
    }

    public ErrorOr<Success> SetUrgency(bool isUrgent) {
        var result = EnsureUrgentSomedayInvariant(Bucket, isUrgent);
        if (result.IsError) return result.Errors;

        IsUrgent = isUrgent;

        return Result.Success;
    }

    public ErrorOr<Success> Update(
        TodoBucket? bucket,
        WaitingForInfo? waitingForInfo,
        bool? isUrgent
    ) {
        var newBucket = bucket ?? Bucket;
        var newWaitingForInfo = waitingForInfo ?? WaitingForInfo;
        var newUrgent = isUrgent ?? IsUrgent;

        var r1 = EnsureUrgentSomedayInvariant(newBucket, newUrgent);
        if (r1.IsError) return r1.Errors;

        var r2 = EnsureBucketAndWaitingInfoInvariant(newBucket, newWaitingForInfo);
        if (r2.IsError) return r2.Errors;

        Bucket = newBucket;
        WaitingForInfo = newWaitingForInfo;
        IsUrgent = newUrgent;

        return Result.Success;
    }


    private static ErrorOr<Success> EnsureUrgentSomedayInvariant(TodoBucket bucket, bool isUrgent) {
        bool isInSomedayBucket = bucket == TodoBucket.SomedayMaybe;

        if (isUrgent && isInSomedayBucket)
            return TodoErrors.UrgentTodoCannotBeInSomedayBucket;

        return Result.Success;
    }

    private static ErrorOr<Success> EnsureBucketAndWaitingInfoInvariant(TodoBucket bucket, WaitingForInfo? waitingForInfo) {
        if (bucket == TodoBucket.Waiting && waitingForInfo == null)
            return TodoErrors.WaitingBucketNeedsWaitingInfo;

        if (bucket != TodoBucket.Waiting && waitingForInfo != null)
            return TodoErrors.CantHaveWaitingInfoWhenNotInWaitingBucket;

        return Result.Success;
    }
}
