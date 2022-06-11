import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordDetailComponent } from './record-detail/record-detail.component';
import { RecordNewComponent } from './record-new/record-new.component';
import { RecordEditComponent } from './record-edit/record-edit.component';
import { RecordListComponent } from './record-list/record-list.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { RecordDetailGuard } from './record-detail.guard';



@NgModule({
  declarations: [
    RecordDetailComponent,
    RecordNewComponent,
    RecordEditComponent,
    RecordListComponent,
  ],
  imports: [
    RouterModule.forChild([
      { path: '', component: RecordListComponent },
      { path: 'new', component: RecordNewComponent },
      {
        path: ':id',
        canActivate: [RecordDetailGuard],
        component: RecordDetailComponent
      },
      {
        path: ':id/edit',
        canActivate: [RecordDetailGuard],
        component: RecordEditComponent
      }
    ]),
    SharedModule
  ]
})
export class RecordModule { }
