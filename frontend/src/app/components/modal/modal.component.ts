import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Output() public confirmed = new EventEmitter<void>();
  @Output() public closed = new EventEmitter<void>();
  public close() : void {
    this.closed.emit();
  }

  public confirm() : void {
    this.confirmed.emit();
  }
}
