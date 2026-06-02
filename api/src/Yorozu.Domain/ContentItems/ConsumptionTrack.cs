namespace Yorozu.Domain.ContentItems;

public class ConsumptionTrack {
    public Guid Id { get; init; } = Guid.NewGuid();
    public required IntentionType Type { get; set; }
    public required ConsumptionStatus Status { get; set; }
    public required string Title { get; set; }
    public required int CurrentUnit { get; set; }
    public string? Description { get; set; }
}
