using ErrorOr;

namespace Fanoos.Domain.Checklists;

public class Checklist {
    private List<ChecklistItem> _items = [];

    public Guid Id { get; init; } = Guid.NewGuid();
    public string Title { get; set; } = "Untitled";
    public bool IsTemplate { get; private set; }
    public IReadOnlyList<ChecklistItem> Items => _items.AsReadOnly();

    public void ConvertToTemplate() {
        IsTemplate = true;

        foreach (var item in _items) {
            item.State = ChecklistItemState.Pending;
        }
    }

    public void ConvertToChecklist() {
        IsTemplate = false;
    }

    public Checklist Instantiate(string? newTitle)
        => new() {
            Title = newTitle ?? Title,
            IsTemplate = false,
            _items = Items.ToList().ConvertAll(x => x.Clone(Id)),
        };

    public Guid AddItem(string title) {
        var newItem = ChecklistItem.Create(Id, title);

        _items.Add(newItem);

        return newItem.Id;
    }

    public void EnsureItemRemoved(Guid itemId) {
        _items.RemoveAll(x => x.Id == itemId);
    }

    public ErrorOr<Updated> SetItemState(Guid itemId, ChecklistItemState newState) {
        if (IsTemplate) {
            return ChecklistErrors.TemplateItemStateIsImmutable;
        }

        ChecklistItem? item = _items.FirstOrDefault(x => x.Id == itemId);

        if (item is null) {
            return ChecklistErrors.ChecklistItemNotFound;
        }

        item.State = newState;

        return Result.Updated;
    }

    public ErrorOr<Updated> RenameItemTitle(Guid itemId, string newTitle) {
        ChecklistItem? item = _items.FirstOrDefault(x => x.Id == itemId);

        if (item is null) {
            return ChecklistErrors.ChecklistItemNotFound;
        }

        item.Title = newTitle;

        return Result.Updated;
    }
}
