using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Yorozu.Domain.ConsumptionTrackLists;

namespace Yorozu.Infrastructure.ConsumptionTrackLists;

internal sealed class ConsumptionTrackListConfiguration : IEntityTypeConfiguration<ConsumptionTrackList> {
    public void Configure(EntityTypeBuilder<ConsumptionTrackList> builder) {}
}
