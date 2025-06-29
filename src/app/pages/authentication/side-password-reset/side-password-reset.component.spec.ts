import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidePasswordResetComponent } from './side-password-reset.component';

describe('SidePasswordResetComponent', () => {
  let component: SidePasswordResetComponent;
  let fixture: ComponentFixture<SidePasswordResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidePasswordResetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidePasswordResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
