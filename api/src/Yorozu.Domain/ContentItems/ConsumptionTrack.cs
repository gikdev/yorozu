namespace Yorozu.Domain.ContentItems;

public class ConsumptionTrack {
    public Guid Id { get; init; } = Guid.NewGuid();
    public required IntentionType Type { get; set; }
    public ConsumptionStatus Status { get; set; } = ConsumptionStatus.Idle;
    public required NonEmptyString Title { get; set; }
    public int CurrentUnit { get; set; }
    public NonEmptyString? Description { get; set; }

    public override bool Equals(object? obj) => obj is ConsumptionTrack other && Id.Equals(other.Id);
    public override int GetHashCode() => Id.GetHashCode();
}
