namespace Fanoos.Domain.Checklists;

public class ChecklistItem {
    private ChecklistItem() { }

    public Guid Id { get; private init; } = Guid.NewGuid();
    public Guid ChecklistId { get; private init; }
    public string Title { get; internal set; } = "Untitled";
    public ChecklistItemState State { get; internal set; } = ChecklistItemState.Pending;

    internal static ChecklistItem Create(
        Guid checklistId,
        string title
    ) {
        var item = new ChecklistItem {
            ChecklistId = checklistId,
            Title = title,
        };

        return item;
    }

    internal ChecklistItem Clone(Guid newChecklistId)
        => new() {
            ChecklistId = newChecklistId,
            Title = Title,
            Id = Guid.NewGuid(),
            State = State,
        };
}
