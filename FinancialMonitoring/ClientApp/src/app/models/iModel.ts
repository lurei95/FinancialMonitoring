/**
 * interface for a generic model
 */
export interface IModel 
{
  /**
   * @returns the Id of the model
   */
  getId(): any;

  /**
   * @returns The display name of the model
   */
  getDisplyName(): string;
}