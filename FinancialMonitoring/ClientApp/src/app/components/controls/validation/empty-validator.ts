import { LocalizationService } from 'src/app/services/utility/localization.service';
import { ValidatorBase } from "./validator-base";

/**
 * A validator for validating that a field cannot be empty
 */
export class EmptyValidator extends ValidatorBase
{
  /**
   * Constructor
   * 
   * @param {string} _propertyName Name of the property
   * @param {LocalizationService} localizationService Service for locqalizing strings
   */
  constructor(private _propertyName: string, private localizationService: LocalizationService)
  { super(); }

  /**
   * @inheritdoc
   */
  public get validator(): (param: any) => string 
  {
    return (param) => {
      if (!param || (param instanceof String && param == ""))
        return this.localizationService.execute("EmptyField", {name: this._propertyName});
      return null;
    }
  }
}