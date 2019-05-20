import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Event } from 'app/shared/model/event.model';
import { EventService } from './event.service';
import { EventComponent } from './event.component';
import { EventDetailComponent } from './event-detail.component';
import { EventUpdateComponent } from './event-update.component';
import { EventDeletePopupComponent } from './event-delete-dialog.component';
import { IEvent } from 'app/shared/model/event.model';

@Injectable({ providedIn: 'root' })
export class EventResolve implements Resolve<IEvent> {
  constructor(private service: EventService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEvent> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Event>) => response.ok),
        map((event: HttpResponse<Event>) => event.body)
      );
    }
    return of(new Event());
  }
}

export const eventRoute: Routes = [
  {
    path: '',
    component: EventComponent,
    data: {
      // authorities: ['ROLE_USER'],
      pageTitle: 'frontendApp.event.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EventDetailComponent,
    resolve: {
      event: EventResolve
    },
    data: {
      // authorities: ['ROLE_USER'],
      pageTitle: 'frontendApp.event.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EventUpdateComponent,
    resolve: {
      event: EventResolve
    },
    data: {
      // authorities: ['ROLE_USER'],
      pageTitle: 'frontendApp.event.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EventUpdateComponent,
    resolve: {
      event: EventResolve
    },
    data: {
      // authorities: ['ROLE_USER'],
      pageTitle: 'frontendApp.event.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const eventPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: EventDeletePopupComponent,
    resolve: {
      event: EventResolve
    },
    data: {
      // authorities: ['ROLE_USER'],
      pageTitle: 'frontendApp.event.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
