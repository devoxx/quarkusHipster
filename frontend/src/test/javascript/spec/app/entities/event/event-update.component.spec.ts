/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { FrontendTestModule } from '../../../test.module';
import { EventUpdateComponent } from 'app/entities/event/event-update.component';
import { EventService } from 'app/entities/event/event.service';
import { Event } from 'app/shared/model/event.model';

describe('Component Tests', () => {
  describe('Event Management Update Component', () => {
    let comp: EventUpdateComponent;
    let fixture: ComponentFixture<EventUpdateComponent>;
    let service: EventService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FrontendTestModule],
        declarations: [EventUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(EventUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EventUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EventService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Event(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Event();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
