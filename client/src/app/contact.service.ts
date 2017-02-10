import { Http, Headers, Request } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

import { Contact } from './shared/sdk/models/Contact';
import { Person } from './shared/sdk/models/Person';

import { ContactApi } from './shared/sdk/services/custom/Contact';

import { LoopBackConfig } from './shared/sdk/lb.config';

@Injectable()
export class ContactService {

  constructor(private contactApi: ContactApi, private http: Http) { }

  newContact() : Contact {
    let contact = new Contact();
    contact.person = new Person();

    return contact;
  }

  create(jobId: any, contact: Contact) : Observable<Contact> {
    return this.contactApi.request('POST', [
      LoopBackConfig.getPath(),
      LoopBackConfig.getApiVersion(),
      'Jobs',
      jobId,
      'contacts'
    ].join('/'), undefined, undefined, { contact }).map((data: Contact) => Contact.factory(data));
  }

  findById(id: any) : Observable<Contact> {
    return this.contactApi.findById(id);
  }

  findAll() : Observable<Contact[]> {
    return this.contactApi.find();
  }

  deleteById(jobId: any, contactId : any) : Observable<Contact> {
    return this.contactApi.request('DELETE', [
      LoopBackConfig.getPath(),
      LoopBackConfig.getApiVersion(),
      'Jobs',
      jobId,
      'contacts',
      contactId
    ].join('/'), undefined, undefined, undefined).map((data: Contact) => Contact.factory(data));
  }

  //update(contact: Contact) : Observable<Contact> {
  //  return this.contactApi.replaceById(contact.id, contact);
  //}

  update(jobId: any, contact: Contact) : Observable<Contact> {
    let method = 'PUT';

    let url = [
      LoopBackConfig.getPath(),
      LoopBackConfig.getApiVersion(),
      'Jobs',
      jobId,
      'contacts',
      contact.id
    ].join('/');

    let headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let request: Request = new Request({
      headers : headers,
      method  : method,
      url     : url,
      //search  : Object.keys(urlParams).length > 0
      //    ? this.searchParams.getURLSearchParams() : null,
      body    : JSON.stringify(contact)
    });

    return <Observable<Contact>> this.http.request(request)
        .map((res: any) => (res.text() != "" ? res.json() : {}))
        .catch((e) => {
          console.error(e);
          return Observable.of(this.newContact());
        });

  }

}
