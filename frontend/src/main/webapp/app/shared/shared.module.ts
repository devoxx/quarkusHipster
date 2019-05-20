import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FrontendSharedLibsModule, FrontendSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [FrontendSharedLibsModule, FrontendSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [FrontendSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FrontendSharedModule {
  static forRoot() {
    return {
      ngModule: FrontendSharedModule
    };
  }
}
