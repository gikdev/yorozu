using Ardalis.SmartEnum;

namespace Yorozu.Domain.LyricLines;

public sealed class LyricTextKind : SmartEnum<LyricTextKind> {
    public static readonly LyricTextKind Persian = new("Persian", 1, true);
    public static readonly LyricTextKind English = new("English", 2, true);
    public static readonly LyricTextKind Japanese = new("Japanese", 3, true);
    public static readonly LyricTextKind Romaji = new("Romaji", 4, true);
    public static readonly LyricTextKind Arabic = new("Arabic", 5, true);
    public static readonly LyricTextKind Spanish = new("Spanish", 6, true);
    public static readonly LyricTextKind Annotation = new("Annotation", 7, false);

    private LyricTextKind(string name, int value, bool isTranslation) : base(name, value) {
        IsTranslation = isTranslation;
    }

    public bool IsTranslation { get; private set; }
}
