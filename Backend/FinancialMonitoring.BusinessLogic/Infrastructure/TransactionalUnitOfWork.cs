using FinancialMonitoring.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace FinancialMonitoring.BusinessLogic.Infrastructure
{
  /// <summary>
  /// implementation of <see cref="UnitOfWork"/> with transaction management
  /// </summary>
  public sealed class TransactionalUnitOfWork : UnitOfWork
  {
    /// <summary>
    /// creates an instance of <see cref="TransactionalUnitOfWork"/>
    /// </summary>
    /// <param name="dbContext">ef core db context</param>
    public TransactionalUnitOfWork(FinancialMonitoringDbContext dbContext) : base(dbContext)
    { }

    /// <summary>
    /// saves data and commits the current transaction
    /// </summary>
    /// <param name="cancellationToken">cancellation token</param>
    /// <returns>async Task</returns>
    public async Task SaveChangesAndCommitTransactionAsync(CancellationToken cancellationToken)
    {
      await this.SaveChangesAsync(cancellationToken);
      if (this.DbContext.Database.CurrentTransaction != null)
        await this.DbContext.Database.CurrentTransaction.CommitAsync(cancellationToken);
    }
  }
}
