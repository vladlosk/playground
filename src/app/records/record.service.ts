import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { IRecord } from './record';

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  private readonly recordUrl = 'api/records.json';

  state$: BehaviorSubject<IRecord[]>;

  get records$(): Observable<IRecord[]> {
    return this.state$.asObservable();
  }

  private get stateValue(): IRecord[] {
    return this.state$.getValue();
  }

  constructor(private http: HttpClient) {
    this.state$ = new BehaviorSubject(<IRecord[]>[]);

    this.getRecordsFromJSON().subscribe(
      (records: IRecord[]) => {
        this.state$.next(records);
      }
    );
  }

  getRecordsFromJSON(): Observable<IRecord[]> {
    return this.http.get<IRecord[]>(this.recordUrl)
  }

  createRecord(record: IRecord): void {
    this.state$.next([...this.stateValue, record]);
  }

  getRecord(id: number): Observable<IRecord | undefined> {
    return this.records$.pipe(
      map(records => records.find(record => record.id === id))
    );
  }

  updateRecord(record: IRecord) {
    const recordIndex = this.stateValue.findIndex(r => r.id === record.id);
    if (recordIndex > -1) {
      record.updatedAt = new Date();
      this.state$.next(this.stateValue.map(r => r.id === record.id ? record : r));
    }
  }

  deleteRecord(recordId: number) {
    this.state$.next(this.stateValue.filter(record => record.id !== recordId));
  }
}
