import {Component, OnInit} from "angular2/core";
import {WeatherService} from "./weather.service";
import {Subject} from "rxjs/Subject";
import {WeatherItem} from "./weather-item";
@Component({
    selector: 'weather-search',
    template: `
        <section class="weather-search">
            <form #f="ngForm" (ngSubmit)="onSubmit()">
                <label for="city">City Name : </label>
                <input ngControl="location" type="text" id="city" (input)="onSearchLocation(input.value)" #input required>
                <button type="submit">Add</button>
            </form>
            <div>
                <span class="info">City found:</span> {{ data.name }} {{ data.sys?.country }}
                <a href="${"https://google.com/maps/search/+ {{data.name}}"}" target="_blank" class="btn btn-default custom_btn">See Location</a>
            </div>
          
            <div>
                <a href="${"https://en.wikipedia.org/wiki/{{data.name}}"}" target="_blank"> <img src="http://logok.org/wp-content/uploads/2015/02/Wikipedia-logo-wordmark-1024x768.png" width="300" height="200"/> </a>
            </div>
        </section>
    `
})
export class WeatherSearchComponent implements OnInit {
    private searchStream = new Subject<string>();
    data:any = {};

    constructor(private _weatherService:WeatherService) {}

    onSearchLocation(value:string) {
        if(!value.isNullOrEmpty)
        {   this.searchStream.next(value);}
    }

    onSubmit() {
        const newItem = new WeatherItem(this.data.name + ', ' + this.data.sys.country, this.data.weather[0].main, +this.data.main.temp);
        if(newItem != null) {this._weatherService.addWeatherItem(newItem);}
    }

    ngOnInit():any {
        this.searchStream
            .debounceTime(3000)
            .distinctUntilChanged()
            .switchMap((term:string) => this._weatherService.searchWeatherInfo(term))
           //.switchMap((term:string) => this._weatherService.searchAirpollution(term))
            .subscribe(
                data => this.data = data
            );
    }
}