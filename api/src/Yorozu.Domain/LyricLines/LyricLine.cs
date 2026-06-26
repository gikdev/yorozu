#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.

using ErrorOr;
using Yorozu.Common.Domain;

namespace Yorozu.Domain.LyricLines;

public class LyricLine : IAggregateRoot, IHasCreationTimestamp {
    public Guid Id { get; private init; }
    public Guid SongId { get; private init; }
    public DateTimeOffset CreatedAt { get; private init; } = DateTimeOffset.UtcNow;

    public float Timestamp { get; private set; }

    private readonly List<LyricText> _texts = [];
    public IReadOnlyList<LyricText> Texts => _texts.AsReadOnly();
    public LyricTextKind PrimaryTextKind { get; private set; }

    private LyricLine() {}

    public static ErrorOr<LyricLine> Create(
        Guid SongId,
        float timestamp,
        NotEmptyString primaryText,
        LyricTextKind primaryKind,
        Guid? id = null
    ) {
        var line = new LyricLine {
            Id = id ?? Guid.NewGuid(),
            SongId = SongId,
            Timestamp = timestamp,
            PrimaryTextKind = primaryKind,
        };

        var addResult = line.AddText(primaryKind, primaryText);
        if (addResult.IsError)
            return addResult.Errors;

        return line;
    }

    public ErrorOr<Success> AddText(LyricTextKind kind, NotEmptyString text) {
        if (_texts.Any(t => t.Kind == kind))
            return Error.Conflict($"A lyric text of kind '{kind.Name}' already exists for this line.");

        if (kind == LyricTextKind.Annotation && _texts.Count > 0)
            return Error.Conflict("An annotation (e.g., applause) must be the only text on a line.");

        if (_texts.Any(t => t.Kind == LyricTextKind.Annotation) && kind != LyricTextKind.Annotation)
            return Error.Conflict("Cannot add a lyric to a line that already has an annotation.");

        _texts.Add(new LyricText(kind, text));

        return Result.Success;
    }

    public ErrorOr<Success> RemoveText(LyricTextKind kind) {
        if (_texts.Count <= 1)
            return Error.Validation("LyricLine.Text", "Cannot remove the last text from a lyric line.");

        var existing = _texts.FirstOrDefault(t => t.Kind == kind);
        if (existing is null)
            return Error.NotFound($"Lyric text of kind '{kind.Name}' not found.");

        if (existing.Kind == PrimaryTextKind)
            return Error.Forbidden($"The priamry lyric line text can not be removed!");

        _texts.RemoveAll(t => t.Kind == kind);

        return Result.Success;
    }

    public ErrorOr<Success> UpdateText(LyricTextKind kind, NotEmptyString newText) {
        var existing = _texts.FirstOrDefault(t => t.Kind == kind);
        if (existing is null)
            return Error.NotFound($"Lyric text of kind '{kind.Name}' not found.");

        if (existing.Text == newText.Value)
            return Result.Success;

        _texts.Remove(existing);
        _texts.Add(new LyricText(kind, newText));

        return Result.Success;
    }

    public ErrorOr<Success> SwitchPrimaryTextKind(LyricTextKind newKind) {
        var existing = _texts.FirstOrDefault(t => t.Kind == newKind);
        if (existing is null)
            return Error.NotFound($"Lyric text of kind '{newKind.Name}' not found. Add such a thing first.");

        PrimaryTextKind = newKind;

        return Result.Success;
    }

    public override bool Equals(object? obj) => obj is LyricLine other && Id.Equals(other.Id);
    public override int GetHashCode() => Id.GetHashCode();
}
