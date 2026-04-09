namespace Backend.Domain.InDevelopment;

public record MonthlyOverview {
    public required DateTimeOffset From        { get; init; }
    public required DateTimeOffset To          { get; init; }
    public required long           TotalIncome { get; init; }
    public required long           TotalSpent  { get; init; }
    public required Budget[]       Budgets     { get; init; }
}
