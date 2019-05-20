/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { FrontendTestModule } from '../../../test.module';
import { EventDeleteDialogComponent } from 'app/entities/event/event-delete-dialog.component';
import { EventService } from 'app/entities/event/event.service';

describe('Component Tests', () => {
  describe('Event Management Delete Component', () => {
    let comp: EventDeleteDialogComponent;
    let fixture: ComponentFixture<EventDeleteDialogComponent>;
    let service: EventService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FrontendTestModule],
        declarations: [EventDeleteDialogComponent]
      })
        .overrideTemplate(EventDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EventDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EventService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
