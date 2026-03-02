using System.Text.RegularExpressions;
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
    public EnergyLevel? Energy { get; private set; }
    public bool IsImportant { get; private set; }
    public bool IsUrgent { get; private set; }
    public bool IsDone { get; private set; }
    public bool IsArchived { get; private set; }

    public static Todo FromRaw(string raw) {
        var time = ExtractSingle(raw, @"~(\S+)");

        Todo todo = new() {
            Context = ExtractSingle(raw, @"@(\S+)"),
            Energy = ExtractEnergy(raw),
            Id = Guid.NewGuid(),
            IsDone = false,
            IsImportant = GetIsImportant(raw),
            IsUrgent = GetIsUrgent(raw),
            Project = ExtractSingle(raw, @"\+(\S+)"),
            Tag = ExtractSingle(raw, @"#(\S+)"),
            Time = time == null ? null : int.Parse(time),
            Title = GetCleanTitle(raw)
        };

        return todo;
    }

    public void UpdateTitle(string newTitle) {
        Context = ExtractSingle(newTitle, @"@(\S+)");
        Energy = ExtractEnergy(newTitle);
        IsImportant = GetIsImportant(newTitle);
        IsUrgent = GetIsUrgent(newTitle);
        Project = ExtractSingle(newTitle, @"\+(\S+)");
        Tag = ExtractSingle(newTitle, @"#(\S+)");
        var time = ExtractSingle(newTitle, @"~(\S+)");
        Time = time == null ? null : int.Parse(time);
        Title = GetCleanTitle(newTitle);
    }

    public void UpdateDone(bool? isDone) {
        IsDone = isDone ?? !IsDone;
    }

    public void UpdateArchived(bool? shouldBeArchived) {
        IsArchived = shouldBeArchived ?? !IsArchived;
    }

    public string ToRawString() {
        List<string> parts = [];

        if (IsUrgent && IsImportant) parts.Add("!*");
        else if (IsImportant) parts.Add("*");
        else if (IsUrgent) parts.Add("!");

        parts.Add(Title);

        if (!string.IsNullOrWhiteSpace(Context)) parts.Add($"@{Context}");
        if (!string.IsNullOrWhiteSpace(Tag)) parts.Add($"#{Tag}");
        if (Energy != null) parts.Add(new string('$', (int)Energy));
        if (!string.IsNullOrWhiteSpace(Project)) parts.Add($"+{Project}");
        if (Time != null) parts.Add($"~{Time}");

        return string.Join(" ", parts);
    }

    private static string RemoveLeadingMarkers(string raw) {
        return Regex.Replace(raw, @"^(!?\*)\s*", "");
    }

    private static string GetCleanTitle(string raw) {
        return Regex.Replace(RemoveLeadingMarkers(raw), @"[@~#\$+]\S+", "").Trim();
    }

    private static EnergyLevel? ExtractEnergy(string raw) {
        var match = Regex.Match(raw, @"(\$+)");

        if (!match.Success) return null;

        int count = match.Groups[1].Value.Length;

        EnergyLevel? energy = count switch {
            1 => EnergyLevel.Low,
            2 => EnergyLevel.Medium,
            3 => EnergyLevel.High,
            _ => null
        };

        return energy;
    }

    private static bool GetIsUrgent(string raw) {
        return raw.StartsWith("!*", StringComparison.InvariantCulture) || raw.StartsWith('!');
    }

    private static bool GetIsImportant(string raw) {
        return raw.StartsWith('*') || raw.StartsWith("!*", StringComparison.InvariantCulture);
    }

    private static string? ExtractSingle(string raw, string pattern) {
        var match = Regex.Match(raw, pattern);
        return match.Success ? match.Groups[1].Value : null;
    }
}
