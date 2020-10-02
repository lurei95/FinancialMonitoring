using FinancialMonitoring.Entities.Finance;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace FinancialMonitoring.Entities.Configurations
{
  /// <summary>
  /// Configuration for <see cref="FinancialItem"/>
  /// </summary>
  public sealed class FinancialItemConfiguration : IEntityTypeConfiguration<FinancialItem>
  {
    /// <summary>
    /// Configures EF Core for <see cref="FinancialItem"/>
    /// </summary>
    /// <param name="builder">The builder</param>
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

      builder.Property(item => item.OccurenceKind)
        .IsRequired();

      builder.Property(item => item.Direction)
        .IsRequired();

      builder.Property(item => item.DueDate)
        .IsRequired();

      builder.HasMany(item => item.Attachments)
        .WithOne()
        .HasForeignKey(attachment => attachment.FinancialItemId)
        .OnDelete(DeleteBehavior.NoAction);

      builder.HasOne(item => item.User)
        .WithMany()
        .HasForeignKey(item => item.UserId)
        .OnDelete(DeleteBehavior.NoAction);
    }
  }
}