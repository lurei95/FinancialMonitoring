﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FinancialMonitoring.Entities.Configurations
{
  public sealed class FinancialCategoryConfiguration : IEntityTypeConfiguration<FinancialCategory>
  {
    public void Configure(EntityTypeBuilder<FinancialCategory> builder)
    {
      builder.ToTable("Categories", "Finance");
      builder.HasKey(category => category.FinancialCategoryId);

      builder.Property(category => category.FinancialCategoryId)
        .IsRequired();

      builder.Property(category => category.Title)
        .IsRequired()
        .HasMaxLength(256);

      builder.HasMany(category => category.ChildCategories)
        .WithOne(category => category.Parent)
        .HasForeignKey(item => item.ParentId)
        .OnDelete(DeleteBehavior.Cascade);

      builder.HasMany(category => category.Items)
        .WithOne(item => item.Category)
        .HasForeignKey(item => item.CategoryId)
        .OnDelete(DeleteBehavior.Cascade);

      builder.HasMany(category => category.Attachments)
        .WithOne()
        .HasForeignKey(field => field.ParentId)
        .OnDelete(DeleteBehavior.Cascade);
    }
  }
}