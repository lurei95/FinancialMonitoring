using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace FinancialMonitoring.Entities.Configurations
{
  /// <summary>
  /// Configuration for <see cref="AttachmentItem"/>
  /// </summary>
  public sealed class AttachmentItemConfiguration : IEntityTypeConfiguration<AttachmentItem>
  {
    /// <summary>
    /// Configures EF Core for <see cref="AttachmentItem"/>
    /// </summary>
    /// <param name="builder">The builder</param>
    public void Configure(EntityTypeBuilder<AttachmentItem> builder)
    {
      builder.ToTable("AttachmentItems", "Finance");
      builder.HasKey(item => item.AttachmentItemId);

      builder.Property(item => item.AttachmentItemId)
        .IsRequired()
        .ValueGeneratedOnAdd();

      builder.Property(item => item.Title)
        .IsRequired()
        .HasMaxLength(256);

      builder.Property(item => item.AddedDate)
        .IsRequired();

      builder.HasOne(item => item.User)
        .WithMany()
        .HasForeignKey(item => item.UserId)
        .OnDelete(DeleteBehavior.NoAction);
    }
  }
}