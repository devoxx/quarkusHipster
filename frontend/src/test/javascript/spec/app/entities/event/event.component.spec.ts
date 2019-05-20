/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FrontendTestModule } from '../../../test.module';
import { EventComponent } from 'app/entities/event/event.component';
import { EventService } from 'app/entities/event/event.service';
import { Event } from 'app/shared/model/event.model';

describe('Component Tests', () => {
  describe('Event Management Component', () => {
    let comp: EventComponent;
    let fixture: ComponentFixture<EventComponent>;
    let service: EventService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FrontendTestModule],
        declarations: [EventComponent],
        providers: []
      })
        .overrideTemplate(EventComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EventComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EventService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Event(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.events[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
