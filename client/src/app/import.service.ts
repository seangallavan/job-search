import { Injectable } from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions, Request } from '@angular/http';

import { LoopBackConfig } from './shared/sdk/lb.config';

import { Mapping } from './shared/sdk/models/Mapping';
import { Importer } from './shared/sdk/models/Importer';
import { ImporterApi } from './shared/sdk/services/custom/Importer';

@Injectable()
export class ImportService {
  private apiEndPoint =  LoopBackConfig.getPath() + '/' + LoopBackConfig.getApiVersion();

  constructor(private http: Http, private importerApi: ImporterApi) { }

  importData(file: File, mappings: Mapping[]) : void {
      //this.uploadFile(file).subscribe(() => console.log("uploaded"));
    this.uploadFile(file)
      .subscribe(() => {
          //let importer = new Importer({filename: file.name, mappings: mappings});
          //this.importerApi.create(importer)
          //    .catch(error => Observable.throw(error))
          //    .subscribe()
          //  let headers = new Headers();
          //  //headers.append('Content-Type', 'multipart/form-data');
          //  headers.append('Accept', 'application/json');
          //  let options = new RequestOptions({ headers: headers });
          //  let formData:FormData = new FormData();
          //  formData.append("filename", file.name);
          //  formData.append("mappings", mappings);
          //  this.http.post(`${this.apiEndPoint}/Jobs/import`, mappings, options)
          //      .map(res => res.json())
          //      .catch(error => Observable.throw(error)).subscribe();

            let headers: Headers = new Headers();
            headers.append('Content-Type', 'application/json');
            let request: Request = new Request({
                headers : headers,
                method  : 'POST',
                url     : `${this.apiEndPoint}/Jobs/import`,
                //search  : Object.keys(urlParams).length > 0
                //    ? this.searchParams.getURLSearchParams() : null,
                body    : JSON.stringify({filename: file.name, mappings: mappings})
            });
            this.http.request(request)
                .map((res: any) => (res.text() != "" ? res.json() : {})).subscribe();
                //.catch((e) => console.error(e));

        });
  }

  private uploadFile(file) {
    let formData:FormData = new FormData();
    formData.append('result', file, file.name);
    let headers = new Headers();
    //headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.apiEndPoint}/uploads/imports/upload`, formData, options)
        .map(res => res.json())
        .catch(error => Observable.throw(error))
  }
}
