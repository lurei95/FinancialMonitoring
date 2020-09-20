using FinancialMonitoring.Entities.Finance;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SpacedRepetitionSystem.WebAPI.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinancialMonitoring.Controllers.Finance
{
  /// <summary>
  /// Controller for <see cref="FinancialCategory"/>
  /// </summary>
  [Route("[controller]")]
  [ApiController]
  public sealed class FinancialCategoriesController : EntityControllerBase<FinancialCategory, Guid>
  {
    /// <summary>
    /// Constructor
    /// </summary>
    /// <param name="context">The db context</param>
    public FinancialCategoriesController(DbContext context) : base(context)
    { }

    ///<inheritdoc/>
    [HttpGet("{id}")]
    public override async Task<ActionResult<FinancialCategory>> GetAsync([FromRoute] Guid id)
    {
      FinancialCategory category = await Context.Set<FinancialCategory>()
        .Include(category => category.Attachments)
        .Include(category => category.ChildCategories)
        .Include(category => category.Items)
        .FirstOrDefaultAsync(category => category.FinancialCategoryId == id);

      if (category == null)
        return NotFound();
      if (category.UserId != GetUserId())
        return Unauthorized();
      return category;
    }

    ///<inheritdoc/>
    public override async Task<ActionResult<List<FinancialCategory>>> GetAsync(IDictionary<string, object> searchParameters)
    {
      IQueryable<FinancialCategory> query = Context.Set<FinancialCategory>()
        .Include(category => category.Attachments)
        .Where(category => category.UserId == GetUserId());
      return await query.ToListAsync();
    }
  }
}