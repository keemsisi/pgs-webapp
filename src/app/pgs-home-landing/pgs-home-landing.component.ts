import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pgs-home-landing',
  templateUrl: './pgs-home-landing.component.html',
  styleUrls: ['./pgs-home-landing.component.css']
})
export class PgsHomeLandingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  scrollToAbout(event : Event){
    event.preventDefault();
    console.log(event)
    let x = document.querySelector("#about");
    if (x){
        x.scrollIntoView();
    }
}

}
