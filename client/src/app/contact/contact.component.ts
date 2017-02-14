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
  @Input() contactInstance : Contact = this.contactService.newContact();
  @Input() jobId: any; //varies - a string in MongoDb, but a number in MySql for example
  @Input() isEditable: boolean;
  @Output() reloadContacts : EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private jobService: JobService, private contactService: ContactService, private route: ActivatedRoute) { }

  allJobs:Job[] = [];

  ngOnInit() {
   //Populate the company/title dropdown
    if(!this.jobId) {
      this.jobService.findAll()
          .subscribe(jobs => this.allJobs = jobs);
      this.isEditable = true;
    }
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
