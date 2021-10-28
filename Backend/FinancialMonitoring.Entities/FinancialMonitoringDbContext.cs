using FinancialMonitoring.Entities.Configurations;
using FinancialMonitoring.Entities.Finance;
using FinancialMonitoring.Entities.Security;
using Microsoft.EntityFrameworkCore;

namespace FinancialMonitoring.Entities
{
  public sealed class FinancialMonitoringDbContext : DbContext
  {
    /// <summary>
    /// Constructor
    /// </summary>
    /// <param name="options">The options</param>
    public FinancialMonitoringDbContext(DbContextOptions options) : base(options) { }

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
