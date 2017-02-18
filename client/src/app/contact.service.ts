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
    contact.createdAt = new Date();

    return contact;
  }

  makeDeep(contact: Contact) : Contact {
    contact.person = contact.person || new Person();
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

  update(jobId: any, contact: Contact) : Observable<Contact> {
    return this.contactApi.request('PUT', [
      LoopBackConfig.getPath(),
      LoopBackConfig.getApiVersion(),
      'Jobs',
      jobId,
      'contacts',
      contact.id
    ].join('/'), undefined, undefined, { contact }).map((data: Contact) => Contact.factory(data));
  }

  getContacts(jobId: any) : Observable<Contact[]> {
    return this.contactApi.request('GET', [
      LoopBackConfig.getPath(),
      LoopBackConfig.getApiVersion(),
      'Jobs',
      jobId,
      'contacts'
    ].join('/'), undefined, undefined, undefined)
        .map((datum: Contact[]) => datum.map((data: Contact) => this.makeDeep(Contact.factory(data))));
  }
}
