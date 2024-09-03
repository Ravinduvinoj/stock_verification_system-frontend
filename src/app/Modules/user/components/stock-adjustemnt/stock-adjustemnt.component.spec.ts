import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockAdjustemntComponent } from './stock-adjustemnt.component';

describe('StockAdjustemntComponent', () => {
  let component: StockAdjustemntComponent;
  let fixture: ComponentFixture<StockAdjustemntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockAdjustemntComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StockAdjustemntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
