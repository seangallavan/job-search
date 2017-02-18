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
    contacts: Contact[] = <Contact[]>[];
    isEditable: boolean;
    displayNewContact: boolean = false;
    displayNewContactButton: boolean = false;
    editorOptions : Object = {
        heightMin: 300,
        toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', 'fontFamily', 'fontSize', '|', 'specialCharacters', 'color', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'clearFormatting', 'html']
    };

  constructor(private jobService: JobService, private contactService: ContactService, private route: ActivatedRoute) { }

  ngOnInit() {
console.log('ngOnInit');
      this.route.params
        .switchMap((params: Params) => {
console.log('params["id"]', params['id']);
              if(params['id']) {
                this.isEditable = false;
                this.displayNewContactButton = true;
                return this.jobService.findById(params['id']);
          } else {
                this.isEditable = true;
                this.displayNewContactButton = false;
                return Observable.of(this.jobService.newJob());
          }
        })
        .subscribe(jobInstance => {
 console.log('ngOnInit subscribe for jobInstance');
              this.job = this.jobService.makeDeep(jobInstance);
 console.log('this.job', this.job);
              if(this.job.id) {
                this.contactService.getContacts(this.job.id)
                    .subscribe(contacts => {
 console.log('ngOnInit getContacts', contacts);
                        this.contacts = contacts;
                    });
            }
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
        this.displayNewContactButton = true;
        this.isEditable = false;
    }

    newContact() : void {
        this.displayNewContact = true;
    }

    reloadContacts() : void {
console.log('reloadContents()');
        this.contactService.getContacts(this.job.id)
            .subscribe(contacts => {
console.log('reloadContents() subscribe contacts', contacts);
                this.contacts = contacts;
                this.displayNewContact = false;
                this.displayNewContactButton = true;
            });
    }
}
