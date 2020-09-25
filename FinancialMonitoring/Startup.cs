using FinancialMonitoring;
using FinancialMonitoring.API;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
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
    /// Constructor
    /// </summary>
    /// <param name="configuration">Configuration</param>
    public Startup(IConfiguration configuration)
    { Configuration = configuration; }

    /// <summary>
    /// Configures DI
    /// </summary>
    /// <param name="services">Service collection</param>
    public void ConfigureServices(IServiceCollection services)
    {

      services.AddControllersWithViews();
      // In production, the Angular files will be served from this directory
      services.AddSpaStaticFiles(configuration =>
      { configuration.RootPath = "ClientApp/dist"; });

      services.AddCors(options =>
      {
        options.AddPolicy("AllowAngularDevClient",
          builder =>
          {
            builder
              .WithOrigins()
              .AllowAnyHeader()
              .AllowAnyMethod();
          });
      });


      //EF Core
      services.AddDbContext<FinancialMonitoringDBContext>(
       options => options.UseSqlServer(Configuration.GetConnectionString("Default")), ServiceLifetime.Transient);
      services.AddTransient<DbContext, FinancialMonitoringDBContext>();

      services.AddMvc(option => option.EnableEndpointRouting = false)
        .SetCompatibilityVersion(CompatibilityVersion.Latest)
        .AddNewtonsoftJson(opt => opt.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore);

      //Authentication
      IConfigurationSection jwtSection = Configuration.GetSection("JWTSettings");
      services.Configure<JWTSettings>(jwtSection);
      JWTSettings jwtSettings = jwtSection.Get<JWTSettings>();
      byte[] key = Encoding.ASCII.GetBytes(jwtSettings.SecretKey);
      services.AddAuthentication(x =>
      {
        x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
      })
      .AddJwtBearer(x =>
      {
        x.RequireHttpsMetadata = true;
        x.SaveToken = true;
        x.TokenValidationParameters = new TokenValidationParameters
        {
          ValidateIssuerSigningKey = true,
          IssuerSigningKey = new SymmetricSecurityKey(key),
          ValidateIssuer = false,
          ValidateAudience = false,
          ClockSkew = TimeSpan.Zero
        };
      });
    }

    /// <summary>
    /// Confiugures the HTTP pipeline
    /// </summary>
    /// <param name="app">app builder</param>
    /// <param name="env">Host environment</param>
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
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
