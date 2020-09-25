using FinancialMonitoring.Entities.Security;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FinancialMonitoring.Entities.Configurations
{
  /// <summary>
  /// Configuration for <see cref="User"/>
  /// </summary>
  public sealed class UserConfiguration : IEntityTypeConfiguration<User>
  {
    /// <summary>
    /// Configures EF Core for <see cref="User"/>
    /// </summary>
    /// <param name="builder">The builder</param>
    public void Configure(EntityTypeBuilder<User> builder)
    {
      builder.ToTable("Users", "Security");
      builder.HasKey(user => user.UserId);

      builder.Property(user => user.UserId)
        .IsRequired();

      builder.Property(user => user.Email)
        .IsRequired()
        .HasMaxLength(256);

      builder.Property(user => user.Password)
        .IsRequired()
        .HasMaxLength(256);

      builder.Ignore(user => user.AccessToken);
      builder.Ignore(user => user.RefreshToken);
    }
  }
}