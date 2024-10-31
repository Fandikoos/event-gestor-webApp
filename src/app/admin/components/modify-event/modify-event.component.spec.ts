import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyEventComponent } from './modify-event.component';

describe('ModifyEventComponent', () => {
  let component: ModifyEventComponent;
  let fixture: ComponentFixture<ModifyEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyEventComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
