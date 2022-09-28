import { TranslateModule } from '@ngx-translate/core';
import { ModalService } from './../../services/modal.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent  {

  constructor(
    public modalService: ModalService
  ) {}

}
