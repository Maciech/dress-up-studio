import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DressCardComponent } from './dress-card.component';

describe('DressCardComponent', () => {
  let component: DressCardComponent;
  let fixture: ComponentFixture<DressCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DressCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DressCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
