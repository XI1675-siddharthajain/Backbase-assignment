import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { HeaderComponent } from '@Components/header/header.component';
import { ComponentsType, ModulesType } from '@Types/module.types';

const modules: ModulesType = [
  RouterModule,
  CommonModule,
  TranslateModule,
];

const components: ComponentsType = [
  HeaderComponent,
];

const providers: Provider[] = [
];

@NgModule({
  imports: [
    ...modules,
  ],
  declarations: [
    ...components,
  ],
  exports: [
    ...modules,
    ...components,
  ],
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers,
    };
  }
}
