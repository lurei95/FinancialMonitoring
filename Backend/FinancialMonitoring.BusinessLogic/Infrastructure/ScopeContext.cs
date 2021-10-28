using Microsoft.Extensions.DependencyInjection;
using System;

namespace FinancialMonitoring.BusinessLogic.Infrastructure
{
  /// <summary>
  /// implementation of <see cref="IScopeContext"/>
  /// </summary>
  /// <typeparam name="T">type for the elements of the context</typeparam>
  public sealed class ScopeContext<T> : IScopeContext
  {
    private IServiceScope scope;

    /// <summary>
    /// Elements of the context
    /// </summary>
    public T Items { get; }

    /// <summary>
    /// Creates an new instance of <see cref="ScopeContext{T}"/>
    /// </summary>
    /// <param name="items">elements of the context</param>
    public ScopeContext(T items)
    {
      this.Items = items ?? throw new ArgumentNullException(nameof(items));
    }

    /// <inheritdoc/>
    public void SetScope(IServiceScope scope)
    {
      this.scope = scope ?? throw new ArgumentNullException(nameof(scope));
    }

    /// <inheritdoc/>
    public void Dispose()
    {
      if (this.scope != null)
      {
        this.scope.Dispose();
        this.scope = null;
      }
    }
  }
}
