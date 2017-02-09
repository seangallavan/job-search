import { Component, OnInit } from '@angular/core';

import { Job } from '../shared/sdk/models/Job'
import { JobService } from '../job.service';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  jobs: Observable<Job[]>;

  constructor(private jobService: JobService) { }

  ngOnInit() {
    this.jobs = this.jobService.findAll();
  }

  delete (job: Job) : void {
    this.jobService.deleteById(job.id)
        .subscribe(() =>{ console.log('deleted jobId: ' + job.id) });
  }
}
