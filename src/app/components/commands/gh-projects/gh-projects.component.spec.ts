import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GhProjectsComponent } from './gh-projects.component';

describe('GhProjectsComponent', () => {
  let component: GhProjectsComponent;
  let fixture: ComponentFixture<GhProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GhProjectsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GhProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
