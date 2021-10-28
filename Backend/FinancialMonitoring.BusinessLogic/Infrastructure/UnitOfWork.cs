using FinancialMonitoring.Entities;
using FinancialMonitoring.Entities.Finance;
using FinancialMonitoring.Entities.Security;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace FinancialMonitoring.BusinessLogic.Infrastructure
{
  /// <summary>
  /// UnitOfWork encapsulation for the ef core db context
  /// </summary>
  public abstract partial class UnitOfWork
  {
    /// <summary>
    /// ef core db context
    /// </summary>
    protected FinancialMonitoringDbContext DbContext { get; private set; }

    #region DB Sets

    /// <summary>
    /// Financial categories
    /// </summary>
    public DbSet<FinancialCategory> FinancialCategories => this.DbSet<FinancialCategory>();

    /// <summary>
    /// Financial items
    /// </summary>
    public DbSet<FinancialItem> FinancialItems => this.DbSet<FinancialItem>();

    /// <summary>
    /// Attachements
    /// </summary>
    public DbSet<AttachmentItem> AttachmentItems => this.DbSet<AttachmentItem>();

    /// <summary>
    /// Users
    /// </summary>
    public DbSet<User> Users => this.DbSet<User>();

    /// <summary>
    /// RefreshTokens
    /// </summary>
    public DbSet<RefreshToken> RefreshTokens => this.DbSet<RefreshToken>();

    #endregion

    /// <summary>
    /// Creates a new instance of <see cref="UnitOfWork"/>
    /// </summary>
    /// <param name="dbContext">ef core db context</param>
    protected UnitOfWork(FinancialMonitoringDbContext dbContext)
    {
      this.DbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
    }

    /// <summary>
    /// returns <see cref="EntityEntry"/> for all entities tracked by the ef core db context
    /// </summary>
    /// <typeparam name="TEntity">entity type</typeparam>
    /// <returns><see cref="EntityEntry"/> for all entities tracked by the ef core db context</returns>
    public IEnumerable<EntityEntry<TEntity>> ChangedEntries<TEntity>() where TEntity : class
      => this.DbContext.ChangeTracker.Entries<TEntity>();

    /// <summary>
    /// returns <see cref="EntityEntry"/> of the tracked entity
    /// </summary>
    /// <typeparam name="TEntity">entity type</typeparam>
    /// <param name="entity">tracked entity</param>
    /// <returns><see cref="EntityEntry"/> of the tracked entity</returns>
    public EntityEntry<TEntity> ChangedEntry<TEntity>(TEntity entity) where TEntity : class
      => this.DbContext.Entry(entity);

    /// <summary>
    /// return whether the entity is changed
    /// </summary>
    /// <typeparam name="TEntity">entity type</typeparam>
    /// <param name="entity">entity to test</param>
    /// <returns>whether the entity is changed</returns>
    public bool IsEntityChanged<TEntity>(TEntity entity) where TEntity : class
      => this.ChangedEntries<TEntity>().Any(e => e.State == EntityState.Modified && e.Entity == entity);

    /// <summary>
    /// saves the changes of the unit of work
    /// </summary>
    /// <param name="cancellationToken">cancellation token</param>
    /// <returns>tasks with the count of changed entries</returns>
    public async Task<int> SaveChangesAsync(CancellationToken cancellationToken)
      => await this.DbContext.SaveChangesAsync(cancellationToken);

    /// <summary>
    /// creates a db set that can be used for queries and modifying entitites
    /// opens a new transaction on first use to guarantee that the same data is used for READ COMMITTED SNAPSHOT ISOLATION
    /// </summary>
    /// <typeparam name="TEntity">entity type</typeparam>
    /// <returns>db set</returns>
    protected DbSet<TEntity> DbSet<TEntity>() where TEntity : class
    {
      if (this.DbContext.Database.CurrentTransaction == null)
        this.DbContext.Database.BeginTransaction();
      return this.DbContext.Set<TEntity>();
    }
  }
}
