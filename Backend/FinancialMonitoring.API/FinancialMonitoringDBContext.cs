using FinancialMonitoring.Entities;
using FinancialMonitoring.Entities.Configurations;
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
    }
  }
}