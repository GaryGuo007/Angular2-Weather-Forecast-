import {Component} from "@angular2/core";
//import { UserFormComponent } from './form/user-form.component';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  FormControl
} from '@angular/forms';
const Highcharts = require('highcharts/highcharts.src');
import 'highcharts/adapters/standalone-framework.src';

@Component({
    selector: 'city',
    template: '
     <div>
            <div #chart></div>
  </div>',
     directives: [UserFormComponent],
})
export class CityComponent{

chartInit() {
    let opts: any = {
        title: {
            text: 'Recent Temperature (℃)',
            x: -20 //center
        },
        xAxis: {
            categories:this.dateList
        },
        series: [{
            name: this.weather.name,
            data: this.tempList
        }]
    };
    console.log(this.tempList);
    if (this.chartEl && this.chartEl.nativeElement) {
        opts.chart = {
            type: 'line',
            renderTo: this.chartEl.nativeElement
        };

        this._chart = new Highcharts.Chart(opts);
    }
  }
  
  public ngOnDestroy() {
    this._chart.destroy();
  }
  makeRequest(): void {
    this.loading = true;
    this.checkCity(this.paramter);
    //this.http.request('http://api.openweathermap.org/data/2.5/forecast/city?q='+ this.paramter+ '&mode=xml&APPID=5a231059585708240fec9e8006f37248')
    this.http.request('https://api.wunderground.com/api/23ef06bc47cbce1b/conditions/hourly/q/'+ this.state+'/'+this.paramter+ '.json')
    //this.http.request('http://api.wunderground.com/api/23ef06bc47cbce1b/hourly/q/CA/San_Francisco.json')
      .subscribe((res: Response) => {
          console.log(res.json());
        //   var t = parseInt(res.json().list[0].main.temp)-273.15;
        // this.data = res.json();
        this.weather.name = res.json().current_observation.display_location.city;
         this.weather.time = res.json().current_observation.observation_time;
         this.weather.temp =  res.json().hourly_forecast[0].temp.metric+ '℃';
         this.weather.fl =res.json().hourly_forecast[0].feelslike.metric+ '℃';
          this.weather.image =res.json().hourly_forecast[0].icon_url;
         this.testLoop(res.json());
        this.loading = false;
        this.finish = true;

      });
      
  }

}
