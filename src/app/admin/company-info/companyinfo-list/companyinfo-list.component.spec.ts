import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyInfoListComponent } from './companyinfo-list.component';

describe('CompanyInfoListComponent', () => {
  let component: CompanyInfoListComponent;
  let fixture: ComponentFixture<CompanyInfoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyInfoListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyInfoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
