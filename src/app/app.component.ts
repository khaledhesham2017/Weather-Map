import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  searchResult;
  constructor(private http: HttpClient) {}
  search(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.http.get('http://localhost:3000/api/getWeather?country=' + form.value.country).subscribe(
      weatherData => {
        this.searchResult = weatherData;
      }
    );
    form.resetForm();
  }

}
