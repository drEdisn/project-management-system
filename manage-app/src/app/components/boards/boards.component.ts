import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-boards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
