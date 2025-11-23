import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Error404NotFound } from './error404-not-found';

describe('Error404NotFound', () => {
  let component: Error404NotFound;
  let fixture: ComponentFixture<Error404NotFound>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Error404NotFound]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Error404NotFound);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
