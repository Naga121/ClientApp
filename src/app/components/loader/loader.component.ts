import { Component, OnInit } from '@angular/core';
import { loader } from './loader';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  constructor(public loader:loader) { }

  ngOnInit(): void {
  }

}
