using Yorozu.Common.Domain;

namespace Yorozu.Domain.LyricLines;

public record LyricText(LyricTextKind Kind, NotEmptyString Text);
