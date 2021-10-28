using FinancialMonitoring.BusinessLogic.Infrastructure;
using FinancialMonitoring.Identity;
using Microsoft.AspNetCore.Http;
using System;

namespace FinancialMonitoring
{
  /// <summary>
  /// Http Execution context
  /// </summary>
  public class HttpExecutionContext : IExecutionContext
  {
    private readonly IHttpContextAccessor httpContextAccessor;

    /// <summary>
    /// Id of the current user
    /// </summary>
    public int? UserId => this.httpContextAccessor.HttpContext.User.GetUserId();

    /// <summary>
    /// Creates an instance of <see cref="HttpExecutionContext"/>
    /// </summary>
    /// <param name="httpContextAccessor">context accessor</param>
    public HttpExecutionContext(IHttpContextAccessor httpContextAccessor)
    {
      this.httpContextAccessor = httpContextAccessor 
        ?? throw new ArgumentNullException(nameof(httpContextAccessor));
    }
  }
}
