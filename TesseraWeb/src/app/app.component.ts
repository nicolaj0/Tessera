import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {log} from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tessera';

  constructor(private http: HttpClient) {
  }

  test(): void {
    this.http.get('https://localhost:5001/weatherforecast').subscribe(d => console.log(d));
  }
}
