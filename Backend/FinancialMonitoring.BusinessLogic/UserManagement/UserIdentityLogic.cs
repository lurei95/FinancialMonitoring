using AutoMapper;
using FinancialMonitoring.BusinessLogic.Infrastructure;
using FinancialMonitoring.Entities.Security;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;

namespace FinancialMonitoring.BusinessLogic.UserManagement
{
  /// <summary>
  /// Loic fo <see cref="UserIdentityData"/>
  /// </summary>
  public sealed class UserIdentityLogic
  {
    private readonly UnitOfWork unitOfWork;
    private readonly IMapper mapper;

    /// <summary>
    /// Creates an instance of <see cref="UserIdentityLogic"/>
    /// </summary>
    /// <param name="unitOfWork">unit of work</param>
    /// <param name="mapper">automepper</param>
    public UserIdentityLogic(UnitOfWork unitOfWork, IMapper mapper)
    {
      this.unitOfWork = unitOfWork 
        ?? throw new ArgumentNullException(nameof(unitOfWork));
      this.mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
    }

    /// <summary>
    /// returns the identity data of the user whose email equals the normalized user name
    /// </summary>
    /// <param name="normalizedUserName">the normalized user name (email)</param>
    /// <param name="cancellationToken">cancellation token</param>
    /// <returns>the identity data of the user whose email equals the normalied user name</returns>
    public async Task<UserIdentityData> GetUserByNormalizedUserName(
      string normalizedUserName, CancellationToken cancellationToken)
    {
      return await this.GetUserByPredicate(
        u => u.Email.ToUpper() == normalizedUserName, 
        cancellationToken);
    }

    /// <summary>
    /// returns the identity data of the user whose email equals the given email
    /// </summary>
    /// <param name="email">the email</param>
    /// <param name="cancellationToken">cancellation token</param>
    /// <returns>the identity data of the user whose email equals the given email</returns>
    public async Task<UserIdentityData> GetUserByEmail(string email, CancellationToken cancellationToken)
    {
      return await this.GetUserByPredicate(u => u.Email == email, cancellationToken);
    }

    /// <summary>
    /// returns the identity daa of the user with the specified id
    /// </summary>
    /// <param name="id">id of the user</param>
    /// <param name="cancellationToken">cancellation token</param>
    /// <returns>the identity daa of the user with the specified id</returns>
    public async Task<UserIdentityData> GetUser(int id, CancellationToken cancellationToken)
    {
      return await this.GetUserByPredicate(u => u.UserId == id, cancellationToken);
    }

    private async Task<UserIdentityData> GetUserByPredicate(
      Expression<Func<User, bool>> predicate, CancellationToken cancellationToken)
    {
      var user = await this.unitOfWork.Users
        .Where(predicate)
        .SingleAsync(cancellationToken);

      return this.mapper.Map<UserIdentityData>(user);
    }
  }
}
