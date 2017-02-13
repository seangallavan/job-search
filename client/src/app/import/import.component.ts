import * as _ from 'lodash';

import { Component, OnInit } from '@angular/core';

import { Job } from '../shared/sdk/models/Job';
import { Mapping } from '../shared/sdk/models/Mapping';
import { Importer } from '../shared/sdk/models/Importer';
import { JobService } from '../job.service';
import { ImportService } from '../import.service';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {
  fields:string[] = [];
  fieldValues : string[] = [];
  file: File;
  error: string;

  constructor(private importService:ImportService, private jobService: JobService) {
  }

  ngOnInit() {
    let job = this.jobService.newJob();
    this.populateFields(job);
  }

  private populateFields(object:Object, prefix:string = ''):void {
    for (let property in object) {
      if (object.hasOwnProperty(property)) {
        if (_.isObject(object[property])) {
          if (prefix === '') {
            this.populateFields(object[property], property);
          } else {
            this.populateFields(object[property], prefix + '.' + property);
          }
        } else {
          if (prefix === '') {
            this.fields.push(property);
          } else {
            this.fields.push(prefix + '.' + property);
          }
        }
      }
    }
  }

  updateFields(fieldName: string, fieldValue: string) : void {
    this.fieldValues[fieldName] = fieldValue;
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      this.file = fileList[0];
    }
  }

  //fileChange2(event) {
  //  let fileList: FileList = event.target.files;
  //  if(fileList.length > 0) {
  //    let file: File = fileList[0];
  //    let formData:FormData = new FormData();
  //    formData.append('result', file, file.name);
  //    let headers = new Headers();
  //    headers.append('Content-Type', 'multipart/form-data');
  //    headers.append('Accept', 'application/json');
  //    let options = new RequestOptions({ headers: headers });
  //    this.http.post(`${this.apiEndPoint}`, formData, options)
  //        .map(res => res.json())
  //        .catch(error => Observable.throw(error))
  //        .subscribe(
  //            data => console.log('success'),
  //            error => console.log(error)
  //    )
  //  }
  //}

  importData() : void {
    if(!this.file) {
      this.error = 'You must select a file to import';
    }
    else {
      this.error = null;
      let mappings : Mapping[] = [];
      for(let key in this.fieldValues) {
        mappings.push(new Mapping({destination: key, source: this.fieldValues[key]}));
      }
//console.log('mappings', mappings);
      //this.fieldValues.keys().slice.forEach(key => mappings.push(new Mapping({destination: key, source: this.fieldValues[key]})));
      this.importService.importData(this.file, mappings);
    }
  }
}
