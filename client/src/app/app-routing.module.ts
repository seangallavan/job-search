import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { JobListComponent }      from './job-list/job-list.component';
import { JobEditComponent }  from './job-edit/job-edit.component';
import { ContactComponent }  from './contact/contact.component';
import { ImportComponent } from './import/import.component';

const routes: Routes = <Routes>[
    { path: '',  component: JobListComponent },
    { path: 'job', component: JobEditComponent },
    { path: 'job/:id', component: JobEditComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'contact/:id', component: ContactComponent },
    { path: 'import', component: ImportComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
