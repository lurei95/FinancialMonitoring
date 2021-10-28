using FinancialMonitoring.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using AutoMapper.EquivalencyExpression;
using AutoMapper;

namespace FinancialMonitoring.BusinessLogic.Infrastructure
{
  /// <summary>
  /// extensions for <see cref="IServiceCollection"/>
  /// </summary>
  public static class ServiceCollectionExtenions
  {
    /// <summary>
    /// registers DI for the business logic project
    /// </summary>
    /// <param name="services">the service collection</param>
    /// <param name="configuration">configuration</param>
    /// <returns>the service collection</returns>
    public static IServiceCollection AddBusinessLogic(
      this IServiceCollection services, IConfiguration configuration)
    {
      var connectionString = configuration.GetConnectionString("Default");
      return services
        .AddInfrastructure()
        .AddAutomapperWithProfiles()
        .AddEntities(connectionString);
    }

    /// <summary>
    /// registers DI for the infrastructure
    /// </summary>
    /// <param name="services">the service collection</param>
    /// <returns>the service collection</returns>
    internal static IServiceCollection AddInfrastructure(this IServiceCollection services)
    {
      return services
        .AddScoped<UnitOfWork, TransactionalUnitOfWork>()
        .AddSingleton(s => new ScopeServiceProvider(services))
        .AddTransient(typeof(ScopeContext<>), typeof(ScopeContext<>))
        .AddTransient(typeof(ValueTuple<>), typeof(ValueTuple<>))
        .AddTransient(typeof(ValueTuple<,>), typeof(ValueTuple<,>))
        .AddTransient(typeof(ValueTuple<,,>), typeof(ValueTuple<,,>))
        .AddTransient(typeof(ValueTuple<,,,>), typeof(ValueTuple<,,,>))
        .AddTransient(typeof(ValueTuple<,,,,>), typeof(ValueTuple<,,,,>));
    }

    /// <summary>
    /// Adds DI for Automapper an mappin profiles
    /// </summary>
    /// <param name="services">service collection</param>
    /// <returns>service collection</returns>
    internal static IServiceCollection AddAutomapperWithProfiles(this IServiceCollection services)
    {
      var assemblies = AppDomain.CurrentDomain.GetAssemblies();
      return services
        .AddAutoMapper((serviceProvider, config) =>
        {
          config.AddCollectionMappers();
          using (var scope = serviceProvider.CreateScope())
          {
            var dbContext = scope.ServiceProvider.GetRequiredService<FinancialMonitoringDbContext>();
            config.UseEntityFrameworkCoreModel<FinancialMonitoringDbContext>(dbContext.Model);
          }
        }, assemblies);
    }
  }
}
