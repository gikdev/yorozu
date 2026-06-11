using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Yorozu.Domain.ContentItems;
using Yorozu.Infrastructure.Common;

namespace Yorozu.Infrastructure.ContentItems;

internal class ContentItemConfiguration : IEntityTypeConfiguration<ContentItem> {
    public void Configure(EntityTypeBuilder<ContentItem> builder) {
        builder.Property(x => x.FullTitle)
            .HasConversion(NotEmptyStringConverters.Required);

        builder.Property(x => x.NickName)
            .HasConversion(NotEmptyStringConverters.Nullable);

        builder.Property(x => x.Format);

        builder.Property(x => x.CoverImageUrl)
            .HasConversion(NotEmptyStringConverters.Nullable);

        builder.Ignore(x => x.Title);
        builder.Ignore(x => x.Tags);
        builder.Ignore(x => x.PlaceholderLetter);
        builder.Ignore(x => x.HasAnyTracks);
        builder.Ignore(x => x.CanAddTracks);

        builder.OwnsOne(x => x.Location);
        builder.OwnsOne(x => x.UnitSpecification);

        builder.PrimitiveCollection<List<string>>("_tags")
            .HasField("_tags")
            .UsePropertyAccessMode(PropertyAccessMode.Field);

        builder.PrimitiveCollection(x => x.Genres)
            .HasField("_genres")
            .UsePropertyAccessMode(PropertyAccessMode.Field);

        builder.HasMany(x => x.ConsumptionTracks)
            .WithOne()
            .HasForeignKey("ContentItemId")
            .OnDelete(DeleteBehavior.Cascade);

        builder.Navigation(x => x.ConsumptionTracks)
            .HasField("_consumptionTracks")
            .UsePropertyAccessMode(PropertyAccessMode.Field);
    }
}
