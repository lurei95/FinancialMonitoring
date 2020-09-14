using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace FinancialMonitoring.Entities.Configurations
{
  public sealed class AttachmentItemConfiguration : IEntityTypeConfiguration<AttachmentItem>
  {
    public void Configure(EntityTypeBuilder<AttachmentItem> builder)
    {
      builder.ToTable("FinancialItems", "Finance");
      builder.HasKey(item => item.AttachmentItemId);

      builder.Property(item => item.AttachmentItemId)
        .IsRequired()
        .ValueGeneratedOnAdd();

      builder.Property(item => item.Title)
        .IsRequired()
        .HasMaxLength(256);

      builder.Property(item => item.AddedDate)
        .IsRequired();
    }
  }
}
