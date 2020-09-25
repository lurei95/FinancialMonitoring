using FinancialMonitoring.Entities;
using FinancialMonitoring.Entities.Configurations;
using FinancialMonitoring.Entities.Finance;
using FinancialMonitoring.Entities.Security;
using Microsoft.EntityFrameworkCore;

namespace FinancialMonitoring.API
{
  public sealed class FinancialMonitoringDBContext : DbContext
  {
    /// <summary>
    /// Financial categories
    /// </summary>
    public DbSet<FinancialCategory> FinancialCategories { get; set; }

    /// <summary>
    /// Financial items
    /// </summary>
    public DbSet<FinancialItem> FinancialItems { get; set; }

    /// <summary>
    /// Attachements
    /// </summary>
    public DbSet<AttachmentItem> AttachmentItems { get; set; }

    /// <summary>
    /// User
    /// </summary>
    public DbSet<User> Users { get; set; }

    /// <summary>
    /// RefreshTokens
    /// </summary>
    public DbSet<RefreshToken> RefreshTokens { get; set; }

    /// <summary>
    /// Constructor
    /// </summary>
    /// <param name="options">The options</param>
    public FinancialMonitoringDBContext(DbContextOptions options) : base(options) { }

    ///<inheritdoc/>
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);
      modelBuilder.ApplyConfiguration(new FinancialCategoryConfiguration());
      modelBuilder.ApplyConfiguration(new FinancialItemConfiguration());
      modelBuilder.ApplyConfiguration(new AttachmentItemConfiguration());
      modelBuilder.ApplyConfiguration(new UserConfiguration());
      modelBuilder.ApplyConfiguration(new RefreshTokenConfiguration());
    }
  }
}