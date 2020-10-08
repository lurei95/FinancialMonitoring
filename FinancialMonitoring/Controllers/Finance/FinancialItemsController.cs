using FinancialMonitoring.Entities.Finance;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SpacedRepetitionSystem.WebAPI.Core;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinancialMonitoring.Controllers.Finance
{
  /// <summary>
  /// Controller for <see cref="FinancialItem"/>
  /// </summary>
  [Route("[controller]")]
  [ApiController]
  public class FinancialItemsController : EntityControllerBase<FinancialItem, long>
  {
    /// <summary>
    /// Constructor
    /// </summary>
    /// <param name="context">The db context</param>
    public FinancialItemsController(DbContext context) : base(context)
    { }

    ///<inheritdoc/>
    [HttpGet("{id}")]
    public override async Task<ActionResult<FinancialItem>> GetAsync([FromRoute] long id)
    {
      FinancialItem item = await Context.Set<FinancialItem>()
        .Include(item => item.Attachments)
        .FirstOrDefaultAsync(item => (bool)(item.FinancialItemId == id));

      if (item == null)
        return NotFound();
      if (item.UserId != GetUserId())
        return Unauthorized();
      return item;
    }

    ///<inheritdoc>/>
    public override async Task<ActionResult<List<FinancialItem>>> GetAsync(IDictionary<string, object> searchParameters)
    {
      IQueryable<FinancialItem> query = Context.Set<FinancialItem>()
        .Include(item => item.Attachments)
        .Where(item => item.UserId == GetUserId());
      return await query.ToListAsync();
    }
  }
}