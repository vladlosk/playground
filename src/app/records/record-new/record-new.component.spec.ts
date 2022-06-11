import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordNewComponent } from './record-new.component';

describe('RecordNewComponent', () => {
  let component: RecordNewComponent;
  let fixture: ComponentFixture<RecordNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
