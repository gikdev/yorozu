using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Yorozu.Common.Domain;

namespace Yorozu.Infrastructure.Common;

internal static class NotEmptyStringConverters {
    public static readonly ValueConverter<NotEmptyString, string> Required = new(
        v => v.Value,
        v => NotEmptyString.Create(v).Value
    );

    public static readonly ValueConverter<NotEmptyString?, string?> Nullable = new(
        v => v == null ? null : v.Value,
        v => v == null ? null : NotEmptyString.Create(v).Value
    );
}
