import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IRecord } from '../record';
import { RecordService } from '../record.service';

@Component({
  selector: 'app-record-detail',
  templateUrl: './record-detail.component.html',
  styleUrls: ['./record-detail.component.scss']
})
export class RecordDetailComponent implements OnInit {
  pageTitle = 'Record Detail';
  record!: IRecord;
  sub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recordService: RecordService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.sub = this.recordService.getRecord(+id).subscribe(
        (record: IRecord | undefined) => {
          if (record) {
            this.record = record;
          }
        }
      );
    }
  }

  onBack(): void {
    this.router.navigate(['/records']);
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
