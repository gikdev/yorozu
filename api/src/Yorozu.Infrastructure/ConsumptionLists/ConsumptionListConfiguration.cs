using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Yorozu.Domain.ConsumptionLists;

namespace Yorozu.Infrastructure.ConsumptionLists;

internal sealed class ConsumptionListConfiguration : IEntityTypeConfiguration<ConsumptionList> {
    public void Configure(EntityTypeBuilder<ConsumptionList> builder) { }
}
