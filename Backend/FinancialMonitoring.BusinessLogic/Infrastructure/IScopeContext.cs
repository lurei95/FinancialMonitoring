using Microsoft.Extensions.DependencyInjection;
using System;

namespace FinancialMonitoring.BusinessLogic.Infrastructure
{
  /// <summary>
  /// inteface for the scope context
  /// </summary>
  public interface IScopeContext : IDisposable
  {
    /// <summary>
    /// sets the service scope
    /// </summary>
    /// <param name="scope">the service scope</param>
    void SetScope(IServiceScope scope);
  }
}
