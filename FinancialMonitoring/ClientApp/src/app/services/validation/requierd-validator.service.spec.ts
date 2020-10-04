import { LocalizationService } from '../utility/localization.service';
import { RequiredValidator } from './required-validator.service';

describe('RequiredValidator', () => 
{
  let validator : RequiredValidator;
  let localizationService: LocalizationService;
  let spy: jasmine.Spy;

  beforeEach(() => {
    localizationService = new LocalizationService(null);
    spy = spyOn(localizationService, "execute").and.returnValue("test-error");
    validator = new RequiredValidator(localizationService);
  })

  it("validates an empty string", () => validateErrorCore(""))

  it("validates null", () => validateErrorCore(null))

  it("validates undefined", () => validateErrorCore(undefined))

  it("does not validate a correct value", () => {
    let error = validator.getValidator("test")("test123");

    expect(error).toBeFalsy();
    expect(spy).toHaveBeenCalledTimes(0);
  })

  function validateErrorCore(value: any)
  {
    let error = validator.getValidator("test")(value);

    expect(error).toBe("test-error");
    expect(spy).toHaveBeenNthCalledWith(1, "test");
    expect(spy).toHaveBeenNthCalledWith(2, "EmptyField", {"name": "test-error"});
  }
});
