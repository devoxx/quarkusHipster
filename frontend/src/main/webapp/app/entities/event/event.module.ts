import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { FrontendSharedModule } from 'app/shared';
import {
  EventComponent,
  EventDetailComponent,
  EventUpdateComponent,
  EventDeletePopupComponent,
  EventDeleteDialogComponent,
  eventRoute,
  eventPopupRoute
} from './';

const ENTITY_STATES = [...eventRoute, ...eventPopupRoute];

@NgModule({
  imports: [FrontendSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [EventComponent, EventDetailComponent, EventUpdateComponent, EventDeleteDialogComponent, EventDeletePopupComponent],
  entryComponents: [EventComponent, EventUpdateComponent, EventDeleteDialogComponent, EventDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FrontendEventModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
