using FinancialMonitoring;
using System.IO.Abstractions;
using FinancialMonitoring.BusinessLogic.Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using FinancialMonitoring.ActionFilters;
using FinancialMonitoring.Identity;

namespace WebApplication1
{
  /// <summary>
  /// Startup class
  /// </summary>
  public class Startup
  {
    /// <summary>
    /// Configuration
    /// </summary>
    public IConfiguration Configuration { get; }

    /// <summary>
    /// Environment
    /// </summary>
    public IWebHostEnvironment Environment { get; }

    /// <summary>
    /// Constructor
    /// </summary>
    /// <param name="configuration">Configuration</param>
    public Startup(IConfiguration configuration, IWebHostEnvironment environment)
    { 
      Configuration = configuration;
      Environment = environment;
    }

    /// <summary>
    /// Configures DI
    /// </summary>
    /// <param name="services">Service collection</param>
    public void ConfigureServices(IServiceCollection services)
    {
      services
        .AddSingleton<IHttpContextAccessor, HttpContextAccessor>()
        .AddScoped<IExecutionContext, HttpExecutionContext>()
        .AddSingleton<IFileSystem, FileSystem>()
        .AddTransient<JwtSecurityTokenHandler>()
        .AddApplicationIdentity(this.Configuration, this.Environment)
        .AddBusinessLogic(this.Configuration)
        .AddControllers(o =>
        {
          o.AllowEmptyInputInBodyModelBinding = true;
          o.Filters.Add(typeof(GlobalExceptionFilter));
          o.Filters.Add(typeof(UnitOfWorkActionFilter));
        })
        .AddNewtonsoftJson(o => o.SerializerSettings.DateTimeZoneHandling = DateTimeZoneHandling.Local);
    }

    /// <summary>
    /// Confiugures the HTTP pipeline
    /// </summary>
    /// <param name="app">app builder</param>
    /// <param name="env">Host environment</param>
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (app == null)
        throw new ArgumentNullException(nameof(app));
      if (env == null)
        throw new ArgumentNullException(nameof(env));

      var isDevelopment = string.Equals(env.EnvironmentName, "Development", StringComparison.OrdinalIgnoreCase);

      app
        .UseAuthentication()
        .UseRequestLocalization()

      if (env.IsDevelopment())
        app.UseDeveloperExceptionPage();
      else
      {
        app.UseExceptionHandler("/Error");
        // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
        app.UseHsts();
      }

      app.UseHttpsRedirection();
      app.UseStaticFiles();
      if (!env.IsDevelopment())
        app.UseSpaStaticFiles();

      app.UseRouting();
      app.UseAuthentication();
      app.UseAuthorization();
      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllerRoute(
                  name: "default",
                  pattern: "{controller}/{action=Index}/{id?}");
      });

      app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
      app.UseSpa(spa =>
      {
         // To learn more about options for serving an Angular SPA from ASP.NET Core,
        // see https://go.microsoft.com/fwlink/?linkid=864501
        spa.Options.SourcePath = "ClientApp";
        if (env.IsDevelopment())
          spa.UseAngularCliServer(npmScript: "start");
      });

      app.UseCors("AllowAngularDevClient");
    }
  }
}
