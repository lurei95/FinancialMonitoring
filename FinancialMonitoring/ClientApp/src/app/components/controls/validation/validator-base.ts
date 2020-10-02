/**
 * Base class of a validator for an edit control
 */
export abstract class ValidatorBase
{
  /**
   * @returns {(any) => string} The validator function
   */
  public abstract get validator(): (param: any) => string;
}