using Microsoft.Extensions.DependencyInjection;
using System;

namespace FinancialMonitoring.BusinessLogic.Infrastructure
{
  /// <summary>
  /// Factory for the scope context
  /// </summary>
  /// <typeparam name="T">type of the scope context</typeparam>
  public sealed class ScopeContextFactory<T> where T : IScopeContext
  {
    private readonly IServiceProvider serviceProvider;

    /// <summary>
    /// Creates an new isntance of <see cref="ScopeContextFactory{T}"/>
    /// </summary>
    /// <param name="serviceProvider">sevice provider</param>
    public ScopeContextFactory(ScopeServiceProvider serviceProvider)
    {
      this.serviceProvider = serviceProvider?.ServiceProvider 
        ?? throw new ArgumentNullException(nameof(serviceProvider));
    }

    /// <summary>
    /// Ceates the scope context
    /// </summary>
    /// <returns>the created scope context</returns>
    public T Create()
    {
      var scope = this.serviceProvider.CreateScope();
      var context = scope.ServiceProvider.GetRequiredService<T>();
      context.SetScope(scope);
      return context;
    }
  }
}
