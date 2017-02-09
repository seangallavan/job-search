import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { JobListComponent } from './job-list/job-list.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { ContactComponent } from './contact/contact.component';
import { JobEditComponent } from './job-edit/job-edit.component';

import { JobService } from './job.service';
import { ContactService } from './contact.service';

import { AppRoutingModule } from './app-routing.module';

import { SDKBrowserModule } from './shared/sdk/index';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    JobListComponent,
    JobDetailComponent,
    ContactComponent,
    JobEditComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    SDKBrowserModule.forRoot(),
    NgbModule.forRoot()
  ],
  providers: [ JobService, ContactService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
