using Ardalis.SmartEnum;

namespace Yorozu.Domain.ConsumptionTracks;

public sealed class ConsumptionStatus(string name, int value) : SmartEnum<ConsumptionStatus>(name, value) {
    public static readonly ConsumptionStatus Idle = new(nameof(Idle), 0);
    public static readonly ConsumptionStatus InProgress = new(nameof(InProgress), 1);
    public static readonly ConsumptionStatus Completed = new(nameof(Completed), 2);
    public static readonly ConsumptionStatus OnHold = new(nameof(OnHold), 3);
    public static readonly ConsumptionStatus Dropped = new(nameof(Dropped), 4);
}
