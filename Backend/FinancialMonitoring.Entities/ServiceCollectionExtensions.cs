using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;

namespace FinancialMonitoring.Entities
{
  /// <summary>
  /// Extensions for <see cref="IServiceCollection"/>
  /// </summary>
  public static class ServiceCollectionExtensions
  {
    /// <summary>
    /// Adds Entity DI
    /// </summary>
    /// <param name="services">service collection</param>
    /// <param name="connectionString">connection stin for the db</param>
    /// <returns>service collection</returns>
    public static IServiceCollection AddEntities(
      this IServiceCollection services, string connectionString)
    {
      services.AddDbContext<FinancialMonitoringDbContext>(builder => builder.UseSqlServer(connectionString));
      return services;
    }
  }
}
