import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { JobListComponent } from './job-list/job-list.component';
import { ContactComponent } from './contact/contact.component';
import { JobEditComponent } from './job-edit/job-edit.component';

import { JobService } from './job.service';
import { ContactService } from './contact.service';
import { ImportService } from './import.service';
import { SearchComponent } from './search/search.component';
import { ImportComponent } from './import/import.component';

import { AppRoutingModule } from './app-routing.module';

import { SDKBrowserModule } from './shared/sdk/index';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AgGridModule} from "ag-grid-ng2/main";

@NgModule({
  declarations: [
    AppComponent,
    JobListComponent,
    ContactComponent,
    JobEditComponent,
    SearchComponent,
    ImportComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    SDKBrowserModule.forRoot(),
    NgbModule.forRoot(),
    AgGridModule.withComponents(
        [
        ]),
  ],
  providers: [ JobService, ContactService, ImportService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
