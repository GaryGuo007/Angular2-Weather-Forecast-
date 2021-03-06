import {Component } from "angular2/core";
import {CORE_DIRECTIVES } from "angular2/common";

import {MyModel} from "./mymodel.service.ts";
import {ChartDirective} from "./chart.directive.ts";


@Component({
selector: "chartPage",
templateUrl: "/components/chart.template.html",
directives: [CORE_DIRECTIVES, ChartDirective]        
})
export class ChartComponent {     

}

// Injecting my data model into chart component ...
constructor(private model: MyModel) {
  console.log("Constructing chart component");
};