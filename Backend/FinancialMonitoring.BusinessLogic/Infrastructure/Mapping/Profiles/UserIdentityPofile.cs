using AutoMapper;
using FinancialMonitoring.BusinessLogic.UserManagement;
using FinancialMonitoring.DataTransferObjects.Identity;
using FinancialMonitoring.Entities.Security;

namespace FinancialMonitoring.BusinessLogic.Infrastructure.Mapping.Profiles
{
  /// <summary>
  /// Mapper profile for <see cref="UserIdentityData"/>
  /// </summary>
  public sealed class UserIdentityPofile : Profile
  {
    /// <summary>
    /// Creates an instance of <see cref="UserIdentityPofile"/>
    /// </summary>
    public UserIdentityPofile()
    {
      this.CreateMap<User, UserIdentityData>()
        .ForMember(d => d.UserId, o => o.MapFrom(s => s.UserId))
        .ForMember(d => d.Email, o => o.MapFrom(s => s.Email))
        .ForMember(d => d.PasswordSalt, o => o.MapFrom(s => s.PasswordSalt))
        .ForMember(d => d.PasswordHash, o => o.MapFrom(s => s.PasswordHash));

      this.CreateMap<UserIdentityData, UserIdentityInfoDto>()
        .ForMember(d => d.UserId, o => o.MapFrom(s => s.UserId))
        .ForMember(d => d.Email, o => o.MapFrom(s => s.Email));
    }
  }
}
