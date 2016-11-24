import {WeatherItem} from "./weather-item";
import {WEATHER_ITEMS} from "./mock-weather";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';
import {Injectable} from "angular2/core";
import {Http} from "angular2/http";

@Injectable()
export class WeatherService {
// weatherItems: WeatherItem[];
    constructor(private _http: Http) {}
    //String city = '';
    getWeatherItems() {
        return WEATHER_ITEMS;
    }
    
    addWeatherItem(item: WeatherItem) {
        if(item != null){
        WEATHER_ITEMS.push(item);}
    }
    
    clearWeatherItems() {
        WEATHER_ITEMS.splice(0);
    }
 
    searchWeatherInfo(city: string): Observable<any> {
     //  if (city == undefined || city.isNullOrEmpty || city == '' || city.length == 0) return null; 
       return this._http.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=97e4f1978687357c4c471997509d1ac3&units=metric')
        .map(response => response.json())
            .catch(error => {
                    console.error(error);
                    return Observable.throw(error.json().error);
                }
            );
    }
}