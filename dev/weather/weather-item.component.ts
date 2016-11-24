import {Component} from "angular2/core";
import {WeatherItem} from "./weather-item";
//import {WeatherService} from "./weather.service";
import {TemperatureDirective} from "./temperature.directive";
@Component({
    selector: 'weather-item',
    template: `
        <article class="weather-element">
            <div class="col-1">
                <h3>{{ item.city }}</h3>
                <p class="info">{{ item.description | uppercase }}</p>
            </div>
            <div class="col-2">
                <span class="temperature" [temperatureCelsius]="item.temperature">{{ item.temperature }}°C</span>
            </div>
             <span class="delete" ng-click="delete($weather-item)">X</span>
        </article>
    `,
    inputs: ['item: weatherItem'],
    styleUrls: ['src/css/weather-item.css'],
    directives: [TemperatureDirective],
   // providers: [WeatherService]
})
export class WeatherItemComponent {
    item:WeatherItem;

     delete(item): Observable<any> {
        this.item.splice(this.item);
        
    }
}