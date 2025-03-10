import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSubStoreComponent } from './new-sub-store.component';

describe('NewSubStoreComponent', () => {
  let component: NewSubStoreComponent;
  let fixture: ComponentFixture<NewSubStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewSubStoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewSubStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
