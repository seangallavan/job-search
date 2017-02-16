import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Job } from '../shared/sdk/models/Job'
import { JobService } from '../job.service';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

import {GridOptions,RowNode} from "ag-grid/main";

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  gridOptions:GridOptions;

  constructor(private jobService: JobService, private router: Router) {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = this.createColumnDefs();
    this.gridOptions.enableSorting = true;
    this.gridOptions.enableColResize = true;
  }

  ngOnInit() {
    this.createRowData();
  }

  private createColumnDefs() {
    return [
      { headerName: "Company", field: "company.name", width: 300, sort: 'asc' },
      { headerName: "Title", field: "title", width: 290 },
      { headerName: 'Status', field: "status"}
    ];
  }

  private createRowData() {
    //return [{title: 't1'}, {title: 't2'}];
    this.jobService.findAll()
        .subscribe((jobs : Job[]) => {
          this.gridOptions.api.setRowData(jobs);
        });
  }

  onRowClicked($event) {
    this.router.navigate(['/job', $event.data.id]);
  }

  delete (job: Job) : void {
    this.jobService.deleteById(job.id)
        .subscribe(() =>{ console.log('deleted jobId: ' + job.id) });
  }
}
