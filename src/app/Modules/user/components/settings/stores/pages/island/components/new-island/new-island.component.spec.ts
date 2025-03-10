import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewIslandComponent } from './new-island.component';

describe('NewIslandComponent', () => {
  let component: NewIslandComponent;
  let fixture: ComponentFixture<NewIslandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewIslandComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewIslandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
