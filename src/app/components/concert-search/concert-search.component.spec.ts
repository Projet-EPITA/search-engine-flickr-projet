import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcertSearchComponent } from './concert-search.component';

describe('ConcertSearchComponent', () => {
  let component: ConcertSearchComponent;
  let fixture: ComponentFixture<ConcertSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConcertSearchComponent]
    });
    fixture = TestBed.createComponent(ConcertSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
