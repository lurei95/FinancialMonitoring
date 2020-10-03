import { TabCardComponent } from './../tab-card/tab-card.component';
import { Component, Input } from '@angular/core';

/**
 * Component for a tab of a card
 */
@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  host: {
    '[class.flex-host]': 'active'
  },
  styleUrls: ['./tab.component.css']
})
export class TabComponent
{
  private _title: string;
  /**
   * @returns {string} Title of the tab
   */
  get title(): string { return this._title; }
  /**
   * @param {string} value Title of the tab
   */
  @Input() set title(value: string) { this._title = value; }

  private _active: boolean;
  /**
   * @returns {boolean} Wether the tab is active
   */
  get active(): boolean { return this._active; }
  /**
   * @param {boolean} value Wether the tab is active
   */
  @Input() set active(value: boolean) { this._active = value; }

  /**
   * Constructor
   * 
   * @param {TabCardComponent} tabCard Injected: TabCard
   */
  constructor(tabCard: TabCardComponent) 
  { tabCard.addTab(this); }
}