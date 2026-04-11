namespace Backend.Domain.InDevelopment;

public record WorkDay : Entity {
    public required UniqueDay Day { get; init; }
    public required int TotalFocusedMinutes { get; init; }
    public required string? Notes { get; init; }
}

public record UniqueDay(DateTimeOffset Date);
