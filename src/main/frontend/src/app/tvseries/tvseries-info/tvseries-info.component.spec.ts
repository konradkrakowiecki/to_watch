import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TvseriesInfoComponent } from './tvseries-info.component';

describe('TvseriesInfoComponent', () => {
  let component: TvseriesInfoComponent;
  let fixture: ComponentFixture<TvseriesInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TvseriesInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TvseriesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
