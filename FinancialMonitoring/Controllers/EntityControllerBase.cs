using FinancialMonitoring.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SpacedRepetitionSystem.WebAPI.Core
{
  /// <summary>
  /// Base class for a controller for a specific entity
  /// </summary>
  /// <typeparam name="TEntity"></typeparam>
  /// <typeparam name="TKey">Type of the primary key</typeparam>
  public abstract class EntityControllerBase<TEntity, TKey> : ControllerBase where TEntity : class, IEntity
  {
    /// <summary>
    /// Parameter name for the search text
    /// </summary>
    public static readonly string SearchTextParameter = "SearchText";

    /// <summary>
    /// Context used to perform the actions
    /// </summary>
    public DbContext Context { get; private set; }

    /// <summary>
    /// Constructor
    /// </summary>
    /// <param name="context">DBContext (injected)</param>
    public EntityControllerBase(DbContext context)
    { Context = context; }

    /// <summary>
    /// Returns the entity with the Id
    /// </summary>
    /// <param name="id">Id of the entity</param>
    /// <returns>The entity with the Id</returns>
    public abstract Task<ActionResult<TEntity>> GetAsync(TKey id);

    /// <summary>
    /// Returns a list of entities matching the filter
    /// </summary>
    /// <param name="searchParameters">A dictionary containing the search parameters</param>
    /// <returns>A list of entities matching the filter</returns>
    public abstract Task<ActionResult<List<TEntity>>> GetAsync([FromQuery(Name = "param")] IDictionary<string, object> searchParameters);

    /// <summary>
    /// Updates an existing entity
    /// </summary>
    /// <param name="entity">The updated entity</param>
    [HttpPut]
    public async Task<ActionResult<TEntity>> PutAsync([FromBody] TEntity entity)
    {
      if (entity == null)
        return await Task.FromResult(BadRequest());
      ActionResult<TEntity> result = await PutCoreAsync(entity);
      await Context.SaveChangesAsync();
      return result;
    }

    /// <summary>
    /// Creates a new entity
    /// </summary>
    /// <param name="entity">The new entity</param>
    [HttpPost]
    public async Task<ActionResult<TEntity>> PostAsync([FromBody] TEntity entity)
    {
      if (entity == null)
        return await Task.FromResult(BadRequest());
      if (entity is IUserSpecificEntity userSpecificEntity)
        userSpecificEntity.UserId = GetUserId();
      ActionResult<TEntity> result = await PostCoreAsync(entity);
      await Context.SaveChangesAsync();
      return result;
    }

    /// <summary>
    /// Deletes an existing entity
    /// </summary>
    /// <param name="id">The id of the entity</param>
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAsync(TKey id)
    {
      if (id.Equals(default(TKey)))
        return BadRequest();
      IActionResult result = await DeleteCoreAsync(id);
      await Context.SaveChangesAsync();
      return result;
    }

    /// <summary>
    /// Updates an existing entity
    /// </summary>
    /// <param name="entity">The updated entity</param>
    protected virtual async Task<ActionResult<TEntity>> PutCoreAsync(TEntity entity)
    {
      TEntity exisiting = await Context.FindAsync<TEntity>(entity.Id);
      if (exisiting == null)
        return NotFound();
      string error = ValidateSave(entity);
      if (!string.IsNullOrEmpty(error))
        return StatusCode(StatusCodes.Status500InternalServerError, error);

      Context.Entry(exisiting).State = EntityState.Detached;
      Context.Entry(entity).State = EntityState.Modified;
      return await Task.FromResult(entity);
    }

    /// <summary>
    /// Deletes an existing entity
    /// </summary>
    /// <param name="id">The id of the entity</param>
    protected virtual async Task<IActionResult> DeleteCoreAsync(TKey id)
    {
      TEntity entity = await Context.FindAsync<TEntity>(id);
      if (entity == null)
        return NotFound();
      string error = ValidateDelete(entity);
      if (!string.IsNullOrEmpty(error))
        return StatusCode(StatusCodes.Status500InternalServerError, error);
      Context.Remove(entity);
      return Ok();
    }

    /// <summary>
    /// Creates a new entity
    /// </summary>
    /// <param name="entity">The new entity</param>
    protected virtual async Task<ActionResult<TEntity>> PostCoreAsync(TEntity entity)
    {
      string error = ValidateSave(entity);
      if (!string.IsNullOrEmpty(error))
        return StatusCode(StatusCodes.Status500InternalServerError, error);
      Context.Add(entity);
      return await Task.FromResult(entity);
    }

    /// <summary>
    /// Returns the id of the user authenticated by the jwt
    /// </summary>
    /// <returns></returns>
    protected Guid GetUserId() => Guid.Parse(User.Identity.Name);

    /// <summary>
    /// Validates whether the entity can be saved
    /// </summary>
    /// <returns>Error or null</returns>
    protected virtual string ValidateSave(TEntity entity) => null;

    /// <summary>
    /// Validates whether the entity can be deleted
    /// </summary>
    /// <returns>Error or null</returns>
    protected virtual string ValidateDelete(TEntity entity) => null;
  }
}