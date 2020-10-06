import { FinancialCategoryService } from './../../../../services/finance/financialCategory.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit 
{
  constructor(private route: ActivatedRoute, private service: FinancialCategoryService) 
  { }

  ngOnInit()
  { }
}