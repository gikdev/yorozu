using ErrorOr;

namespace Yorozu.Domain.ContentItems;

public static class ContentItemErrors {
    public static Error MustHaveUnitSpecError { get; } = Error.Validation(
        description: "A unit spec is required to track consumption.",
        code: "ContentItem.MustHaveUnitSpec"
    );

    public static Error CannotRemoveUnitSpecWithActiveTracks {get;}=Error.Conflict(
        description: "Can not remove unit spec of a content item that has tracks already.",
        code: "ContentItem.CannotRemoveUnitSpecWithActiveTracks"
    );
}
