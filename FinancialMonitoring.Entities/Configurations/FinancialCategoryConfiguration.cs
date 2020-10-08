using FinancialMonitoring.Entities.Finance;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FinancialMonitoring.Entities.Configurations
{
  /// <summary>
  /// Configuration for <see cref="FinancialCategory"/>
  /// </summary>
  public sealed class FinancialCategoryConfiguration : IEntityTypeConfiguration<FinancialCategory>
  {
    /// <summary>
    /// Configures EF Core for <see cref="FinancialCategory"/>
    /// </summary>
    /// <param name="builder">The builder</param>
    public void Configure(EntityTypeBuilder<FinancialCategory> builder)
    {
      builder.ToTable("Categories", "Finance");
      builder.HasKey(category => category.FinancialCategoryId);

      builder.Property(category => category.FinancialCategoryId)
        .IsRequired()
        .ValueGeneratedOnAdd();

      builder.Property(category => category.Title)
        .IsRequired()
        .HasMaxLength(256);

      builder.HasMany(category => category.ChildCategories)
        .WithOne(category => category.Parent)
        .HasForeignKey(item => item.ParentId)
        .OnDelete(DeleteBehavior.NoAction);

      builder.HasMany(category => category.Items)
        .WithOne(item => item.Category)
        .HasForeignKey(item => item.CategoryId)
        .OnDelete(DeleteBehavior.Cascade);

      builder.HasMany(category => category.Attachments)
        .WithOne()
        .HasForeignKey(field => field.FinancialCategoryId)
        .OnDelete(DeleteBehavior.Cascade);

      builder.HasOne(item => item.User)
        .WithMany()
        .HasForeignKey(item => item.UserId)
        .OnDelete(DeleteBehavior.Cascade);
    }
  }
}