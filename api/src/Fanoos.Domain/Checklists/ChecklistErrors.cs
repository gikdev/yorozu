using ErrorOr;

namespace Fanoos.Domain.Checklists;

public static class ChecklistErrors {
    public readonly static Error TemplateItemStateIsImmutable = Error.Forbidden(
        description: "A template's item's state is immutable.",
        code: "Checklist.TemplateItemStateIsImmutable"
    );

    public readonly static Error ChecklistItemNotFound = Error.NotFound(
        description: "The checklist item was not found.",
        code: "Checklist.ChecklistItemNotFound"
    );
}
