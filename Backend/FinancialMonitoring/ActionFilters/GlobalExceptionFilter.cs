using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Net;

namespace FinancialMonitoring.ActionFilters
{
  /// <summary>
  /// Filter for gloabl error handling
  /// </summary>
  public sealed class GlobalExceptionFilter : IExceptionFilter
  {
    /// <inheritdoc/>
    public void OnException(ExceptionContext context)
    {
      var error = context.Exception switch
      {
        UnauthorizedAccessException unauthorizedAccessException => this.ProblemDetailsFromException(unauthorizedAccessException),
        _ => this.ProblemDetailsFromAnyException(context.Exception),
      };

      context.Result = new ObjectResult(error);
      context.ExceptionHandled = true;
      context.HttpContext.Response.StatusCode = error.Status ?? (int)HttpStatusCode.InternalServerError;
    }

    private ProblemDetails ProblemDetailsFromException(UnauthorizedAccessException exception)
    {
      var details = new ProblemDetails();
      this.InitializeProblemDetails(details, exception);
      details.Type = "unauthorized_access";
      details.Status = (int)HttpStatusCode.Unauthorized;
      details.Title = "Authentication Required";
      return details;
    }

    private ProblemDetails ProblemDetailsFromAnyException(Exception exception)
    {
      var details = new ProblemDetails();
      this.InitializeProblemDetails(details, exception);
      details.Type = "about:blank";
      details.Status = (int)HttpStatusCode.InternalServerError;
      details.Title = "Internal Server Error";
      return details;
    }

    private void InitializeProblemDetails(ProblemDetails details, Exception exception)
    {
      details.Detail = exception.Message;
      details.Instance = $"urn:financial-monitoring:error:{Guid.NewGuid()}";
    }
  }
}
