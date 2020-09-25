using FinancialMonitoring.Entities.Security;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FinancialMonitoring.Entities.Configurations
{
  /// <summary>
  /// Configuration for <see cref="RefreshToken"/>
  /// </summary>
  public sealed class RefreshTokenConfiguration : IEntityTypeConfiguration<RefreshToken>
  {
    /// <summary>
    /// Configures EF Core for <see cref="RefreshToken"/>
    /// </summary>
    /// <param name="builder">The builder</param>
    public void Configure(EntityTypeBuilder<RefreshToken> builder)
    {
      builder.ToTable("RefreshTokens", "Security");
      builder.HasKey(token => token.TokenId);

      builder.Property(token => token.TokenId).IsRequired();
      builder.Property(token => token.ExpirationDate).IsRequired();
      builder.Property(token => token.Token)
        .IsRequired()
        .HasMaxLength(200)
        .IsUnicode(false);
      builder.Property(token => token.UserId)
        .IsRequired();

      builder.HasOne(token => token.User)
        .WithMany(user => user.RefreshTokens)
        .HasForeignKey(token => token.UserId)
        .OnDelete(DeleteBehavior.Cascade);
    }
  }
}