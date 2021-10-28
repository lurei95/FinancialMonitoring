using Microsoft.Extensions.DependencyInjection;
using System;

namespace FinancialMonitoring.BusinessLogic.Infrastructure
{
  /// <summary>
  /// clas to provide <see cref="TransactionalUnitOfWork"/> for the ScopeContext
  /// </summary>
  public sealed class ScopeServiceProvider
  {
    /// <summary>
    /// Service provider
    /// </summary>
    public IServiceProvider ServiceProvider { get; }

    /// <summary>
    /// Creates an instance of <see cref="ScopeServiceProvider"/>
    /// </summary>
    /// <param name="services">registered services</param>
    public ScopeServiceProvider(IServiceCollection services)
    {
      if (services == null)
        throw new ArgumentNullException(nameof(services));

      // create copy of registrations so that TransactionUnitOWork can only be created in ScopeContextFactory
      var newServices = new ServiceCollection() as IServiceCollection;
      foreach (var item in services)
        newServices.Add(item);
 
      newServices.AddScoped(s => (TransactionalUnitOfWork)s.GetRequiredService<UnitOfWork>());

      this.ServiceProvider = newServices.BuildServiceProvider();
    }
  }
}
