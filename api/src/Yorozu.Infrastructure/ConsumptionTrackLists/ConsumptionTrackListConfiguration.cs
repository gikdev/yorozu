using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Yorozu.Domain.ConsumptionLists;

namespace Yorozu.Infrastructure.ConsumptionTrackLists;

internal sealed class ConsumptionTrackListConfiguration : IEntityTypeConfiguration<ConsumptionList> {
    public void Configure(EntityTypeBuilder<ConsumptionList> builder) { }
}
