import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable }     from 'rxjs/Observable';

import { Job } from '../shared/sdk/models/Job';
import { Contact } from '../shared/sdk/models/Contact';
import { JobService } from '../job.service';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.css']
})
export class JobEditComponent implements OnInit {
    job: Job = this.jobService.newJob();
    contacts: Contact[] = <Contact[]>[this.contactService.newContact()];
    isEditable: boolean;
    displayNewContact: boolean;

  constructor(private jobService: JobService, private contactService: ContactService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
        .switchMap((params: Params) => {
          if(params['id']) {
              this.isEditable = false;
            return this.jobService.findById(params['id']);
          } else {
              this.isEditable = true;
            return Observable.of(this.jobService.newJob());
          }
        })
        .subscribe(jobInstance => {
            this.job = jobInstance;
            this.jobService.getContacts(this.job)
                .subscribe(contacts => {
                    this.contacts = contacts;
                });
            });
    }

    edit() {
        this.isEditable = true;
    }

    save() {
      if(this.job.id) {
          this.jobService.update(this.job)
              .subscribe(() =>{ console.log('updated jobId: ' + this.job.id) });
      } else {
          this.jobService.create(this.job)
            .subscribe(jobInstance => this.job = jobInstance);
      }
      this.isEditable = false;
    }

    newContact() : void {
        this.displayNewContact = true;
    }

    reloadContacts() : void {
        this.jobService.getContacts(this.job)
            .subscribe(contacts => {
                this.contacts = contacts;
                this.displayNewContact = false;
            });
    }
}
