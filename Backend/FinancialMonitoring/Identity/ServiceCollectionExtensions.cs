using FinancialMonitoring.BusinessLogic.UserManagement;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Threading.Tasks;

namespace FinancialMonitoring.Identity
{
  /// <summary>
  /// Extensions for <see cref="IServiceCollection"/>
  /// </summary>
  public static class ServiceCollectionExtensions
  {
    public static IServiceCollection AddApplicationIdentity(
      this IServiceCollection services, 
      IConfiguration configuration,
      IWebHostEnvironment environment)
    {
      if (configuration == null)
        throw new ArgumentNullException(nameof(configuration));
      if (environment == null)
        throw new ArgumentNullException(nameof(environment));

      bool isDevelopment = string.Equals(environment.EnvironmentName, "Development", StringComparison.OrdinalIgnoreCase);

      services
        .AddScoped<IUserStore<UserIdentityData>, UserStore>()
        .AddIdentityCore<UserIdentityData>()
        .AddSignInManager<SignInManager<UserIdentityData>>()
        .AddClaimsPrincipalFactory<ClaimsFactory>()
        .AddDefaultTokenProviders();

      var jwtOptions = configuration.GetSection(nameof(JwtOptions));
      var signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtOptions["Secret"]));

      services.Configure<JwtOptions>(options =>
      {
        options.SigningCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);
        options.Issuer = jwtOptions[nameof(JwtOptions.Issuer)];
        options.Audience = jwtOptions[nameof(JwtOptions.Audience)];

        if (TimeSpan.TryParse(
          jwtOptions[nameof(JwtOptions.LoginTokenValidityDuration)], 
          out TimeSpan duration))
        {
          options.LoginTokenValidityDuration = duration;
        }
      });

      JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

      var tokenValidationParameters = new TokenValidationParameters
      {
        ValidIssuer = jwtOptions[nameof(JwtOptions.Issuer)],
        ValidAudience = jwtOptions[nameof(JwtOptions.Audience)],
        IssuerSigningKey = signingKey,
        ClockSkew = TimeSpan.Zero,
      };

      services
        .AddAuthentication(options =>
        {
          options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
          options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
          options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
          options.RequireHttpsMetadata = !isDevelopment;
          options.SaveToken = true;
          options.TokenValidationParameters = tokenValidationParameters;
          options.Events = new JwtBearerEvents
          {
            OnTokenValidated = _ => Task.CompletedTask,
            OnAuthenticationFailed = _ => Task.CompletedTask,
          };
        });

      return services
        .AddTransient<TokenGenerator>()
        .AddTransient<IPasswordHasher<UserIdentityData>, FinancialMonitoringPasswordHasher>()
        .AddScoped<ClaimsFactory>()
        .AddSingleton(tokenValidationParameters);
    }
  }
}
