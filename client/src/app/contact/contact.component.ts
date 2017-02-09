import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable }     from 'rxjs/Observable';

import { Contact } from '../shared/sdk/models/Contact';
import { ContactService } from '../contact.service';
import { Job } from '../shared/sdk/models/Job'
import { JobService } from '../job.service';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  @Input() contactInstance : Contact;
  @Input() selecteJobId: any; //varies - a string in MongoDb, but a number in MySql for example
  @Input() isEditable: boolean;
  @Output() onSave = new EventEmitter<boolean>();

  constructor(private jobService: JobService, private contactService: ContactService, private route: ActivatedRoute) { }

  allJobs:Job[] = [];
  contact: Contact;

  ngOnInit() {
    //Load the contact
    this.route.params
        .switchMap((params: Params) => {
          if(params['id']) {
            this.isEditable = false;
            return this.contactService.findById(params['id']);
          } else {
            this.isEditable = true;
            return Observable.of(this.contactService.newContact());
          }
        })
        .subscribe(contactInstance => this.contact = contactInstance);

    //Populate the company/title dropdown
    this.jobService.findAll()
      .subscribe(jobs => this.allJobs = jobs);
  }

  edit() {
    this.isEditable = true;
  }

  save() {
    this.onSave.emit(true);
  }
}
