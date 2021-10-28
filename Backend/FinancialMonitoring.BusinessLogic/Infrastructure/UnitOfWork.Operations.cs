using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using System.Threading;
using System.Threading.Tasks;
using FinancialMonitoring.Utility;

namespace FinancialMonitoring.BusinessLogic.Infrastructure
{
  /// <summary>
  /// UnitOfWork encapsulation for the ef core db context
  /// </summary>
  public abstract partial class UnitOfWork
  {
    /// <summary>
    /// aquires a lock for the resource key that is released once the transaction is completed
    /// </summary>
    /// <param name="resource">resource key for the lock</param>
    /// <param name="canncellationToken">cancellation token</param>
    /// <returns>if the lock was aquired synchronously</returns>
    public virtual async Task<bool> AquireLockAsync(
      string resource, CanncellationToken canncellationToken)
    {
      if (this.DbContext.Database.CurrentTransaction == null)
        this.DbContext.Database.BeginTransaction();

      await using var command = this.DbContext.Database.GetDbConnection().CreateCommand();
      command.Transaction = this.DbContext.Database.CurrentTransaction.GetDbTransaction();
      command.CommandText = @"[sys].[sp_getapplock]";
      command.CommandType = CommandType.StoredProcedure;

      await command
        .AddParameter("@Resource", resource)
        .AddParameter("@LockMode", "Exclusive")
        .AddParameter("@LockOwner", "Transaction")
        .AddParameter("@LockTimeout", 11 * 1000)
        .AddReturnParameter<int>("@RETURN_VALUE", out var returnParameter)
        .ExecuteNonQueryAsync(canncellationToken);

      // Lock aquired synchronously
      if (returnParameter.Value.Equals(0))
        return true;

      // Lock aquired but needed to wait
      if (returnParameter.Value.Equals(1))
        return false;

      if (returnParameter.Value.Equals(-1))
        throw new InvalidOperationException("UnitOfWork.AquireLock: '{0}' Request timed out".FormatWith(resource));
      if (returnParameter.Value.Equals(-2))
        throw new InvalidOperationException("UnitOfWork.AquireLock: '{0}' Request cancelled".FormatWith(resource));
      if (returnParameter.Value.Equals(-3))
        throw new InvalidOperationException("UnitOfWork.AquireLock: '{0}' Request deadlock victim".FormatWith(resource));

      throw new InvalidOperationException("UnitOfWork.AquireLock: '{0}' Request failed".FormatWith(resource));
    }

    /// <summary>
    /// Returns if a connection to the db could be established
    /// </summary>
    /// <returns>if a connection to the db could be established</returns>
    public virtual bool CanConnect() => this.DbContext.CanConnect();
  }
}
