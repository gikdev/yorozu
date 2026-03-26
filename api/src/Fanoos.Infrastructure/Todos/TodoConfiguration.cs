using Fanoos.Common.Domain;
using Fanoos.Domain.Todos;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Fanoos.Infrastructure.Todos;

internal sealed class TodoConfiguration : IEntityTypeConfiguration<Todo> {
    public void Configure(EntityTypeBuilder<Todo> builder) {
        builder.Property(x => x.Id)
            .ValueGeneratedNever();

        builder.Property(x => x.Contexts)
            .HasConversion(
                v => string.Join(';', v.Select(x => x.Value)),
                v => v.Split(';', StringSplitOptions.RemoveEmptyEntries)
                    .Select(x => NotEmptyString.Create(x).Value)
                    .ToList()
            )
            .Metadata.SetValueComparer(
                new ValueComparer<IReadOnlyList<NotEmptyString>>(
                    (a, b) =>
                        ReferenceEquals(a, b) ||
                        (a != null && b != null && a.SequenceEqual(b)),

                    v => v == null
                        ? 0
                        : v.Aggregate(0, (h, x) => HashCode.Combine(h, x.GetHashCode())),

                    v => v == null ? new() : v.ToList()
                )
            );

        builder.Property(x => x.Title)
            .HasConversion(
                v => v.Value,
                v => NotEmptyString.Create(v).Value
            );

        builder.Property(x => x.Why)
            .HasConversion(
                v => v != null ? v.Value : null,
                v => v != null ? NotEmptyString.Create(v).Value : null
            );

        builder.Property(x => x.Description)
            .HasConversion(
                v => v != null ? v.Value : null,
                v => v != null ? NotEmptyString.Create(v).Value : null
            );

        var dueDateConverter = new ValueConverter<FutureDateTimeOffset?, DateTimeOffset?>(
            v => v == null ? null : v.Value,
            v => v == null ? null : FutureDateTimeOffset._Restore(v.Value)
        );

        builder.Property(x => x.DueDate)
            .HasConversion(dueDateConverter);

        builder.OwnsOne(x => x.WaitingForInfo, w => {
            w.Property(x => x.Description)
                .HasConversion(
                    v => v.Value,
                    v => NotEmptyString.Create(v).Value
                )
                .HasColumnName("waiting_for_description");

            w.Property(x => x.ReviewAt)
                .HasConversion(
                    v => v.Value,
                    v => FutureDateTimeOffset._Restore(v)
                )
                .HasColumnName("waiting_for_review_at");
        });
    }
}
