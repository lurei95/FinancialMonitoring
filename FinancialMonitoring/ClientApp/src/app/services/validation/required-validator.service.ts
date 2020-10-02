import { Injectable } from '@angular/core';
import { LocalizationService } from 'src/app/services/utility/localization.service';

/**
 * A validator for validating that a field cannot be empty
 */
@Injectable({
  providedIn: 'root'
})
export class RequiredValidator
{
  /**
   * Constructor
   * 
   * @param {LocalizationService} localizationService Service for locqalizing strings
   */
  constructor(private localizationService: LocalizationService)
  { }

  /**
   * Returns the valdiation function
   * 
   * @param {string} fieldName Name of the field
   * @returns {(any) => string } The validation function
   */
  public getValidator(fieldName: string): (param: any) => string 
  {
    return (param) => {
      if (!param || (param instanceof String && param == ""))
      {
        const localizedName = this.localizationService.execute(fieldName);
        return this.localizationService.execute("EmptyField", {name: localizedName});
      }
      return null;
    }
  }
}