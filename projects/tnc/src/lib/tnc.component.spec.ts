import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TncComponent } from './tnc.component';

describe('TncComponent', () => {
  let component: TncComponent;
  let fixture: ComponentFixture<TncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TncComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
