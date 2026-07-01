using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Yorozu.Domain.ContentItems;

namespace Yorozu.Infrastructure.ContentItems;

internal sealed class ContentItemConfiguration : IEntityTypeConfiguration<ContentItem> {
    public void Configure(EntityTypeBuilder<ContentItem> builder) {
        builder.Ignore(x => x.Title);
        builder.Ignore(x => x.Tags);
        builder.Ignore(x => x.PlaceholderLetter);
        builder.Ignore(x => x.IsSecret);
        builder.Ignore(x => x.IsFavorited);
        builder.Ignore(x => x.IsBookmarked);
        builder.Ignore(x => x.IsOngoing);

        builder.OwnsOne(x => x.Location);

        builder.PrimitiveCollection<List<string>>("_tags")
            .HasField("_tags")
            .UsePropertyAccessMode(PropertyAccessMode.Field);
    }
}
