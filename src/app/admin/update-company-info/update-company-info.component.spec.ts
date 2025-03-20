import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCompanyInfoComponent } from './update-company-info.component';

describe('UpdateCompanyInfoComponent', () => {
  let component: UpdateCompanyInfoComponent;
  let fixture: ComponentFixture<UpdateCompanyInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCompanyInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateCompanyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
