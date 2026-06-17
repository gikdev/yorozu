using Ardalis.SmartEnum;

namespace Yorozu.Domain.ConsumptionTracks;

public sealed class ConsumptionStatus : SmartEnum<ConsumptionStatus> {
    public bool IsTerminal { get; }
    public bool AllowsProgress { get; }

    public static readonly ConsumptionStatus Idle = new(nameof(Idle), 0, isTerminal: false, allowsProgress: false);
    public static readonly ConsumptionStatus InProgress = new(nameof(InProgress), 1, isTerminal: false, allowsProgress: true);
    public static readonly ConsumptionStatus Completed = new(nameof(Completed), 2, isTerminal: true, allowsProgress: false);
    public static readonly ConsumptionStatus OnHold = new(nameof(OnHold), 3, isTerminal: false, allowsProgress: false);
    public static readonly ConsumptionStatus Dropped = new(nameof(Dropped), 4, isTerminal: true, allowsProgress: false);

    private ConsumptionStatus(
        string name,
        int value,
        bool isTerminal,
        bool allowsProgress
    ) : base(name, value) {
        IsTerminal = isTerminal;
        AllowsProgress = allowsProgress;
    }
}
