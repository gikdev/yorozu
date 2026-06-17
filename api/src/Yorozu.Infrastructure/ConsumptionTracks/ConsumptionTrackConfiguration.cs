using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Yorozu.Domain.ConsumptionTracks;
using Yorozu.Domain.ContentItems;

namespace Yorozu.Infrastructure.ConsumptionTracks;

internal class ConsumptionTrackConfiguration : IEntityTypeConfiguration<ConsumptionTrack> {
    public void Configure(EntityTypeBuilder<ConsumptionTrack> builder) {
        builder.Property(x => x.Status)
            .HasConversion(
                s => s.Value,
                s => ConsumptionStatus.FromValue(s)
            );

        builder.Ignore(x => x.CanStart);
        builder.Ignore(x => x.CanPause);
        builder.Ignore(x => x.CanResume);
        builder.Ignore(x => x.CanComplete);
        builder.Ignore(x => x.CanDrop);
        builder.Ignore(x => x.CanProgress);
        builder.Ignore(x => x.CanDecrement);

        builder.HasOne<ContentItem>()
            .WithMany()
            .HasForeignKey(x => x.ContentItemId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
