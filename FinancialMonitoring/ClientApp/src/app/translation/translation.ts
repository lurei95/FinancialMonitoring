import { TranslateLoader } from "@ngx-translate/core";
import { Observable, of } from "rxjs";
import { de } from "./de";
import { en } from "./en";

/**
 * Factory function for creating a translate loader
 * 
 * @returns {TranslateLoader} The translate loader
 */
export function translateFactory(): TranslateLoader { return new CustomTranslateLoader(); }

/**
 * The available translation objects
 */
const TRANSLATIONS = 
{
  /**
   * Translation object for english
   */
  en: en,
  /**
   * Translation object for german
   */
  de: de
};

/**
 * A custom implementation for @see TranslateLoader
 */
class CustomTranslateLoader implements TranslateLoader 
{
  /**
   * Returns the correct translation object for the specified language
   * 
   * @param {string} lang The language
   * @returns {Observable<any>} The translation object
   */
  public getTranslation(lang: string): Observable<any> 
  { return of(TRANSLATIONS[lang]); }
}