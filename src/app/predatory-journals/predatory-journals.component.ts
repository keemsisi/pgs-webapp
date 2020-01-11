import { Component, OnInit } from '@angular/core';
import { PredatoryPublishers } from '../models/predatory.model';

@Component({
  selector: 'app-predatory-journals',
  templateUrl: './predatory-journals.component.html',
  styleUrls: ['./predatory-journals.component.css']
})
export class PredatoryJournalsComponent implements OnInit {


  predatoryJournalArray : any;

  constructor(){
    this.loadData();
  }

  ngOnInit() {
    
  }

  loadData() : void {
    const promisse = new Promise((resolve , reject)=> {
      resolve(new  PredatoryPublishers().getPredatoryJournals().split('\n'));
    });
    promisse.then(result=> {
      this.predatoryJournalArray  =  result ;
    })
  }

}
