import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMainStoreComponent } from './new-main-store.component';

describe('NewMainStoreComponent', () => {
  let component: NewMainStoreComponent;
  let fixture: ComponentFixture<NewMainStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewMainStoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewMainStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
