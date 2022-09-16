import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-columns',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.scss']
})
export class ColumnsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
