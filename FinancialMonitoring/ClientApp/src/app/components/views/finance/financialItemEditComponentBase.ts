import { DirectionKind } from './../../../models/finance/directionKind';
import { OccurenceKind } from './../../../models/finance/occurenceKind';
import { EditComponentsBase } from 'src/app/components/base/editComponentBase';
import { FinancialItemModel } from 'src/app/models/finance/financialItem.model';
import { FinancialItemService } from 'src/app/services/finance/financialItem.service';
import { LocalizationService } from 'src/app/services/utility/localization.service';
import { NotificationService } from 'src/app/services/utility/notification.service';
import { RequiredValidator } from 'src/app/services/validation/required-validator.service';
import { MaskKind } from '../../controls/text-edit/mask-kind';

/**
 * Baseclass for a component of a edit page for a @see FinancialItemModel
 */
export abstract class FinancialItemEditComponentBase extends EditComponentsBase<FinancialItemModel>
{
  /**
   * @returns Title of the component
   */
  protected get title(): string 
  { return this.localizationService.execute("FinancialItem_Title", { title: this.entity.title }); } 

  /**
   * Mask Kind
   */
  protected maskKind = MaskKind.Currency

  /**
   * Validator for the title of the item
   */
  protected titleValidator: (param: any) => string;

  /**
   * Validator for the value of the item
   */
  protected valueValidator: (param: any) => string;

  /**
   * @returns {string} Value of the item
   */
  protected get value(): string { return this.entity.value.toString(); }
  /**
   * @param {string} value Value of the item
   */
  protected set value(value: string)
  {
    let number: number = Number(value);
    if (number)
      this.entity.value = number;
  }

  /**
   * @see OccurenceKind
   */
  protected occurenceKindType = OccurenceKind

  /**
   * @see DirectionKind
   */
  protected directionKindType = DirectionKind

  /**
   * Constructor
   * 
   * @param {FinancialItemService} service Injected: FiancialItemService
   * @param {NotificationService} notificationService Injected: NotificationService
   * @param {RequiredValidator} requiredValidatorInjected: Injected: RequiredValidator
   * @param {LocalizationService} localizationService Injected: LocalizationService
   */
  constructor(service: FinancialItemService, notificationService: NotificationService,
    requiredValidator: RequiredValidator, localizationService: LocalizationService) 
  { 
    super(service, localizationService,notificationService);
    this.titleValidator = requiredValidator.getValidator("FinancialItem.Title");
    this.valueValidator = requiredValidator.getValidator("FinancialItem.Value");
  }

  /**
   * Handle the change of the occurence time of the item
   * 
   * @param {OccurenceKind} occurenceKind New occurence kind
   */
  protected onOccurenceKindChanged(occurenceKind: OccurenceKind) 
  { this.entity.occurenceKind = occurenceKind; }

  /**
   * Handle the change of the direction kind of the item
   * 
   * @param {DirectionKind} directionKind New direction kind
   */
  protected onDirectionKindChanged(directionKind: DirectionKind) 
  { this.entity.direction = directionKind; }

  /**
   * Handle the change of the due date of the item
   * 
   * @param {Date} date New due date
   */
  protected handleDateChanged(date: Date) { this.entity.dueDate = date; }
}