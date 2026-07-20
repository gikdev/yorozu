using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Yorozu.Domain.ConsumptionLists;
using Yorozu.Domain.ConsumptionTracks;
using Yorozu.Domain.ContentItems;

namespace Yorozu.Infrastructure.ConsumptionTracks;

internal sealed class ConsumptionTrackConfiguration : IEntityTypeConfiguration<ConsumptionTrack> {
    public void Configure(EntityTypeBuilder<ConsumptionTrack> builder) {
        builder.Property(x => x.Status)
            .HasConversion(
                s => s.Value,
                s => ConsumptionStatus.FromValue(s)
            );

        builder.Ignore(x => x.IsSecret);
        builder.Ignore(x => x.IsBookmarked);

        builder.PrimitiveCollection<List<string>>("_tags")
            .HasField("_tags")
            .UsePropertyAccessMode(PropertyAccessMode.Field);

        builder.HasOne<ContentItem>()
            .WithMany()
            .HasForeignKey(x => x.ContentItemId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne<ConsumptionList>()
            .WithMany()
            .HasForeignKey(x => x.ConsumptionListId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
