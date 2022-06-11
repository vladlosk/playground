import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IRecord } from '../record';
import { RecordService } from '../record.service';

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.scss']
})
export class RecordListComponent implements OnInit, OnDestroy {
  pageTitle = 'Record Management';
  records: IRecord[] = [];
  filteredRecords: IRecord[] = [];
  recordsSubscription!: Subscription;
  showImage = false;
  _listFilter = '';

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredRecords = this.listFilter ? this.performFilter(this.listFilter) : this.records;
  }

  constructor(
    private recordService: RecordService
  ) { }

  ngOnInit(): void {
    this.recordsSubscription = this.recordService.records$.subscribe(
      (records: IRecord[]) => {
        this.records = records;
        this.filteredRecords = this.records;
      }
    );
  }

  performFilter(filterBy: string): IRecord[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.records.filter((record: IRecord) => record.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  deleteRecord(recordId: number, event: any): void {
    event.preventDefault();
    this.recordService.deleteRecord(recordId);
  }

  ngOnDestroy(): void {
    this.recordsSubscription.unsubscribe();
  }
}
