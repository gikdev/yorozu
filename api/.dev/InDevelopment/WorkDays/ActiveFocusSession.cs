namespace Backend.Domain.InDevelopment;

public record ActiveFocusSession : Entity {
    public const byte SingletonId = 0;

    public byte Id { get; private init; } = ActiveFocusSession.SingletonId;
    public DateTimeOffset? StartedAt { get; private set; }
    public bool IsRunning => StartedAt != null;

    public void Start(DateTimeOffset now) {
        if (IsRunning) return;
        StartedAt = now;
    }

    public TimeSpan Stop(DateTimeOffset now) {
        if (!IsRunning)
            return TimeSpan.Zero;

        TimeSpan duration = now - StartedAt.Value;
        StartedAt = null;

        return duration;
    }

    public TimeSpan Elapsed(DateTimeOffset now) {
        if (!IsRunning)
            return TimeSpan.Zero;

        return now - StartedAt.Value;
    }
}
