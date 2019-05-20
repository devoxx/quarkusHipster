import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEvent } from 'app/shared/model/event.model';
import { EventService } from './event.service';

@Component({
  selector: 'jhi-event-delete-dialog',
  templateUrl: './event-delete-dialog.component.html'
})
export class EventDeleteDialogComponent {
  event: IEvent;

  constructor(protected eventService: EventService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.eventService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'eventListModification',
        content: 'Deleted an event'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-event-delete-popup',
  template: ''
})
export class EventDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ event }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(EventDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.event = event;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/event', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/event', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
