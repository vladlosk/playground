import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IRecord } from '../record';
import { RecordService } from '../record.service';

@Component({
  selector: 'app-record-new',
  templateUrl: './record-new.component.html',
  styleUrls: ['./record-new.component.scss']
})
export class RecordNewComponent {
  pageTitle = 'New Record';
  recordForm = this.fb.group({
    id: [0],
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required]],
    price: [0, [Validators.required]],
    image: [''],
    rating: [0, [Validators.max(5), Validators.min(0)]],
    createdAt: [new Date()],
    updatedAt: [new Date()]
  });

  constructor(
    private router: Router,
    private recordService: RecordService,
    private fb: FormBuilder
  ) { }

  saveRecord(): void {
    const record: IRecord = <IRecord><unknown>this.recordForm.value;
    this.recordService.createRecord(record);
    this.router.navigate(['/records']);
  }
}
