using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace FinancialMonitoring.Entities.Configurations
{
  public sealed class FinacialItemConfiguration : IEntityTypeConfiguration<FinancialItem>
  {
    public void Configure(EntityTypeBuilder<FinancialItem> builder)
    {
      builder.ToTable("FinancialItems", "Finance");
      builder.HasKey(item => item.FinancialItemId);

      builder.Property(item => item.FinancialItemId)
        .IsRequired();

      builder.Property(item => item.Title)
        .IsRequired()
        .HasMaxLength(256);

      builder.Property(item => item.Value)
        .IsRequired();

      builder.Property(item => item.Date)
        .IsRequired();

      builder.HasMany(category => category.Attachments)
        .WithOne()
        .HasForeignKey(field => field.ParentId)
        .OnDelete(DeleteBehavior.Cascade);

    }
  }
}
