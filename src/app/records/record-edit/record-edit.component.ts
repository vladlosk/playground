import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IRecord } from '../record';
import { RecordService } from '../record.service';

@Component({
  selector: 'app-record-edit',
  templateUrl: './record-edit.component.html',
  styleUrls: ['./record-edit.component.scss']
})
export class RecordEditComponent implements OnInit {
  pageTitle = 'Edit Record';
  record!: IRecord;

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
  sub!: Subscription

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recordService: RecordService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.sub = this.recordService.getRecord(+id).subscribe(
        (record: IRecord | undefined) => {
          if (record) {
            this.record = record;
            this.recordForm.patchValue(record);
          }
        }
      );
    }
  }

  updateRecord(): void {
    const record: IRecord = <IRecord><unknown>this.recordForm.value;
    this.recordService.updateRecord(record);
    this.router.navigate(['/records']);
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
