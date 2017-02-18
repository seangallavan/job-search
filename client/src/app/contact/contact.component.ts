import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable }     from 'rxjs/Observable';

import { Contact } from '../shared/sdk/models/Contact';
import { ContactService } from '../contact.service';
import { Job } from '../shared/sdk/models/Job'
import { JobService } from '../job.service';

import * as _ from 'lodash';
import {IMyOptions, IMyDateModel} from 'mydatepicker';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  @Input() contactInstance : Contact = this.contactService.newContact();
  @Input() jobId: any; //varies - a string in MongoDb, but a number in MySql for example
  @Input() isEditable: boolean;
  @Output() reloadContacts : EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private jobService: JobService, private contactService: ContactService, private route: ActivatedRoute) { }

  allJobs:Job[] = [];
  displayJobs: boolean = false;
  createdAtDate;

  ngOnInit() {
    //Setup createdAtDate
    let date = new Date(this.contactInstance.createdAt);
    this.createdAtDate = {
      //myDate: {
        date: {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate()
        }
      //}
    };

    //Populate the company/title dropdown
    if(!this.jobId) {
      this.jobService.findAll()
        .map((datum: Job[]) => datum.map((data: Job) => this.allJobs.push(this.jobService.makeDeep(Job.factory(data)))))
        .subscribe(() => {
          this.allJobs.sort(function(a: Job,b: Job) : number {
                if ( a.company.name < b.company.name )
                  return -1;
                if ( a.company.name > b.company.name )
                  return 1;
                return 0;
              })});
    //.subscribe(jobs => this.allJobs = jobs);
      this.isEditable = true;
      this.displayJobs = true;
    }
  }

  onCreatedAtDateChanged(event: IMyDateModel) : void {
    this.contactInstance.createdAt = event.jsdate;
  }

  edit() {
    this.isEditable = true;
  }

  save() {
    this.isEditable = false;

    if(this.contactInstance.id) {
      this.contactService.update(this.jobId, this.contactInstance)
          .subscribe(contact => this.contactInstance = contact);
    } else {
      this.contactService.create(this.jobId, this.contactInstance)
          .subscribe(contact => this.contactInstance = contact);
    }
  }

  delete() {
    this.contactService.deleteById(this.jobId, this.contactInstance.id)
      .subscribe(() => {
          this.reloadContacts.emit(true);
          this.contactInstance = this.contactService.newContact();
        });
  }
}
