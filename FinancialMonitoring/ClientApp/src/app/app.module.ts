import { storeServices } from './store/includes';
import { routing } from './routing';
import { services } from './services/services';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule, MatDialogModule, MatNativeDateModule, MatSelectModule } from '@angular/material';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { translateFactory } from './translation/translation';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgxMaskModule } from 'ngx-mask';
import localeDe from '@angular/common/locales/de';
import { registerLocaleData } from '@angular/common';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import { components, entryComponents } from './components/components';

registerLocaleData(localeDe);

const imports = [
  RouterModule.forRoot(routing),
  BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
  HttpClientModule,
  FormsModule,
  TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: translateFactory,
      deps: [HttpClient]
    }
  }),
  NgxMaskModule.forRoot(),
  MatSelectModule,
  MatButtonModule,
  MatTableModule,
  MatSortModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
  ReactiveFormsModule,
  BrowserAnimationsModule,
]

@NgModule({
  declarations: components,
  imports: imports,
  providers: [
    services,
    storeServices
  ],
  bootstrap: [AppComponent],
  entryComponents: entryComponents,
})
export class AppModule { }