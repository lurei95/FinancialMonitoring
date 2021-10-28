using FinancialMonitoring.BusinessLogic.Infrastructure;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace FinancialMonitoring.ActionFilters
{
  /// <summary>
  /// Action filter for committing the transaction on succesfully completing a request 
  /// </summary>
  public sealed class UnitOfWorkActionFilter : IAsyncActionFilter
  {
    private readonly TransactionalUnitOfWork unitOfWork;

    /// <summary>
    /// Creates an instance of <see cref="UnitOfWorkActionFilter"/>
    /// </summary>
    /// <param name="unitOfWork">unit of work</param>
    public UnitOfWorkActionFilter(UnitOfWork unitOfWork)
    {
      this.unitOfWork = unitOfWork as TransactionalUnitOfWork 
        ?? throw new ArgumentNullException(nameof(unitOfWork));
    }

    /// <inheritdoc/>
    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
      if (context == null)
        throw new ArgumentNullException(nameof(context));
      if (next == null)
        throw new ArgumentNullException(nameof(next));

      var executedContext = await next();

      var messages = new List<HttpResponseMessage>();

      // general status code
      if (executedContext?.HttpContext?.Response != null)
        messages.Add(new HttpResponseMessage((HttpStatusCode)executedContext.HttpContext.Response.StatusCode));
      if (executedContext.Result is IStatusCodeActionResult result && result.StatusCode.HasValue)
        messages.Add(new HttpResponseMessage((HttpStatusCode)result.StatusCode.GetValueOrDefault()));

      // save changes and commit transaction if successful
      if (messages.All(m => m.IsSuccessStatusCode) && executedContext.Exception == null)
        await this.unitOfWork.SaveChangesAndCommitTransactionAsync(context.HttpContext.RequestAborted);
    }
  }
}
