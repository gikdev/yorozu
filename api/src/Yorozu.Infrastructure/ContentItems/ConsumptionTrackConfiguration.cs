using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Yorozu.Domain.ContentItems;
using Yorozu.Infrastructure.Common;

namespace Yorozu.Infrastructure.ContentItems;

internal class ConsumptionTrackConfiguration : IEntityTypeConfiguration<ConsumptionTrack> {
    public void Configure(EntityTypeBuilder<ConsumptionTrack> builder) {
        builder.Property(x => x.Title)
            .HasConversion(NotEmptyStringConverters.Required);

        builder.Property(x => x.Description)
            .HasConversion(NotEmptyStringConverters.Nullable);

        builder.Property(x => x.Type);

        builder.Property(x => x.Status)
            .HasConversion(
                v => v.Value,
                v => ConsumptionStatus.FromValue(v)
            );

        builder.Ignore(x => x.CanStart);
        builder.Ignore(x => x.CanPause);
        builder.Ignore(x => x.CanResume);
        builder.Ignore(x => x.CanComplete);
        builder.Ignore(x => x.CanDrop);
        builder.Ignore(x => x.CanProgress);
        builder.Ignore(x => x.CanDecrement);

        builder.Property<Guid>("ContentItemId").IsRequired();
    }
}
