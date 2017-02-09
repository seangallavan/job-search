import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

import { Contact } from './shared/sdk/models/Contact';
import { Person } from './shared/sdk/models/Person';

import { ContactApi } from './shared/sdk/services/custom/Contact';

@Injectable()
export class ContactService {

  constructor(private contactApi: ContactApi) { }

  newContact() : Contact {
    let contact = new Contact();
    contact.person = new Person();

    return contact;
  }

  create(contact: Contact) : Observable<Contact> {
    return this.contactApi.create(contact);
  }
  findById(id: any) : Observable<Contact> {
    return this.contactApi.findById(id);
  }

  findAll() : Observable<Contact[]> {
    return this.contactApi.find();
  }

  deleteById(id : any) : Observable<Contact> {
    return this.contactApi.deleteById(id);
  }

  update(contact: Contact) : Observable<Contact> {
    return this.contactApi.replaceById(contact.id, contact);
  }
}
