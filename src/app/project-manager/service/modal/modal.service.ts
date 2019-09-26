import { Injectable } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class ModalService {

  private reference: NgbModalRef;

  constructor(private ngbModal: NgbModal) { }

  open(component: any, options?: NgbModalOptions): NgbModalRef {
    this.reference =  this.ngbModal.open(component, options);
    return this.reference;
  }

  close(): void {
    this.reference.close();
  }
}
