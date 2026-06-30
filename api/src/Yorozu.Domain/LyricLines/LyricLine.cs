#pragma warning disable CS8618

using ErrorOr;
using Yorozu.Common.Domain;

namespace Yorozu.Domain.LyricLines;

public class LyricLine : IAggregateRoot, IHasCreationTimestamp {
    // Identity
    public Guid Id { get; private init; }
    public Guid SongId { get; private init; }
    public DateTimeOffset CreatedAt { get; private init; } = DateTimeOffset.UtcNow;

    // Timestamp
    public float Timestamp { get; private set; }

    // Texts
    private readonly List<LyricText> _texts = [];
    public IReadOnlyList<LyricText> Texts => _texts.AsReadOnly();
    public LyricTextKind PrimaryTextKind { get; private set; }

    // EF ctor
    private LyricLine() { }

    public static ErrorOr<LyricLine> Create(
        Guid songId,
        float timestamp,
        NotEmptyString primaryText,
        LyricTextKind primaryKind,
        Guid? id = null
    ) {
        var line = new LyricLine {
            Id = id ?? Guid.NewGuid(),
            SongId = songId,
            Timestamp = timestamp,
            PrimaryTextKind = primaryKind,
        };

        var addResult = line.AddText(primaryKind, primaryText);
        if (addResult.IsError)
            return addResult.Errors;

        return line;
    }

    // ── Texts ────────────────────────────────────────────
    public ErrorOr<Success> AddText(LyricTextKind kind, NotEmptyString text) {
        if (_texts.Any(t => t.Kind == kind))
            return Error.Conflict($"A lyric text of kind '{kind.Name}' already exists for this line.");

        if (kind == LyricTextKind.Annotation && _texts.Count > 0)
            return Error.Conflict("An annotation must be the only text on a line.");

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
            return Error.Forbidden("The primary lyric line text cannot be removed.");

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
        if (!_texts.Any(t => t.Kind == newKind))
            return Error.NotFound($"Lyric text of kind '{newKind.Name}' not found. Add it first.");

        PrimaryTextKind = newKind;
        return Result.Success;
    }

    // ── Private ──────────────────────────────────────────
    public override bool Equals(object? obj) => obj is LyricLine other && Id.Equals(other.Id);
    public override int GetHashCode() => Id.GetHashCode();
}
