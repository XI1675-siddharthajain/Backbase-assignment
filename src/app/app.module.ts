import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { getInitialState, REDUCER_PROVIDER, reducerToken } from '@AppStore';
import { environment } from '@Environment';
import { ComponentsType, ModulesType } from '@Types/module.types';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MultiTranslateLoader } from './shared/multi-translate.loader';


const modules: ModulesType = [
  BrowserModule,
  HttpClientModule,
  CommonModule,
  AppRoutingModule,
  EffectsModule.forRoot([]),
  StoreModule.forRoot(reducerToken, { initialState: getInitialState }),
  StoreDevtoolsModule.instrument({ maxAge: 30, logOnly: environment.production }),
  TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useClass: MultiTranslateLoader,
      deps: [ HttpClient ],
    },
  }),
];

const components: ComponentsType = [
  AppComponent,
];

const providers: Provider[] = [
  REDUCER_PROVIDER,
];

@NgModule({
  imports: [ ...modules ],
  declarations: [ ...components ],
  providers: [ ...providers ],
  bootstrap: [ AppComponent ],
})
export class AppModule {
}
