import { Component, Input } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

/**
 * Component for card with multiple tabs
 */
@Component({
  selector: 'app-tab-card',
  templateUrl: './tab-card.component.html',
  styleUrls: ['./tab-card.component.css']
})
export class TabCardComponent
{
  private tabs: TabComponent[] = [];

  private _title: string;
  /**
   * @returns {string} Title of the card
   */
  get title(): string { return this._title; }
  /**
   * @param {string} value Title of the card
   */
  @Input() set title(value: string) { this._title = value; }

  /**
   * Adds a tab to the card
   * 
   * @param {TabComponent} tab The tab
   */
  public addTab(tab: TabComponent)
  { 
    if (this.tabs.length === 0)
      tab.active = true;
    this.tabs.push(tab);
  }

  private selectTab(tab: TabComponent) 
  {
    this.tabs.forEach((tab) => tab.active = false);
    tab.active = true
  }
}