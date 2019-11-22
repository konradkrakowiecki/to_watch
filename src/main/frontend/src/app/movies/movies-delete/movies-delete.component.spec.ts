import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesDeleteComponent } from './movies-delete.component';

describe('MoviesDeleteComponent', () => {
  let component: MoviesDeleteComponent;
  let fixture: ComponentFixture<MoviesDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
