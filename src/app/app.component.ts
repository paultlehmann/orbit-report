import { Component } from '@angular/core';
import { Satellite } from './satellite';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'orbit-report';
  sourceList: Satellite[];
  displayList: Satellite[];
  satelliteCounter: {};
  constructor() {
    this.sourceList = [];
    this.displayList = [];
    this.satelliteCounter = {
       total: 0,
       spaceDebris: 0,
       communication: 0,
       probe: 0,
       positioning: 0,
       spaceStation: 0,
       telescope: 0
    };
    let satellitesUrl = 'https://handlers.education.launchcode.org/static/satellites.json';
 
    window.fetch(satellitesUrl).then(function(response) {
       response.json().then(function(data) {
 
          let fetchedSatellites = data.satellites;
          for (let satellite of fetchedSatellites) {
            this.sourceList.push(new Satellite(satellite.name,satellite.type,satellite.operational,satellite.orbitType,satellite.launchDate));
            this.satelliteCounter.total += 1;
            if (satellite.type.toLowerCase() === "space debris") {
               this.satelliteCounter.spaceDebris += 1;
            }
            if (satellite.type.toLowerCase() === "communication") {
               this.satelliteCounter.communication += 1;
            }
            if (satellite.type.toLowerCase() === "probe") {
               this.satelliteCounter.probe += 1;
            }
            if (satellite.type.toLowerCase() === "positioning") {
               this.satelliteCounter.positioning += 1;
            }
            if (satellite.type.toLowerCase() === "space station") {
               this.satelliteCounter.spaceStation += 1;
            }
            if (satellite.type.toLowerCase() === "telescope") {
               this.satelliteCounter.telescope += 1;
            }
          }
          this.displayList = this.sourceList.slice(0);
       }.bind(this));
    }.bind(this));
    
 
 }
 search(searchTerm: string): void {
  let matchingSatellites: Satellite[] = [];
  searchTerm = searchTerm.toLowerCase();
  for(let i=0; i < this.sourceList.length; i++) {
     let name = this.sourceList[i].name.toLowerCase();
     if (name.indexOf(searchTerm) >= 0) {
        matchingSatellites.push(this.sourceList[i]);
     }
  }
  // assign this.displayList to be the the array of matching satellites
  // this will cause Angular to re-make the table, but now only containing matches
  this.displayList = matchingSatellites;
}
}
