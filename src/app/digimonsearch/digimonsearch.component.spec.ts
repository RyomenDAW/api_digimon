import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigimonsearchComponent } from './digimonsearch.component';

describe('DigimonsearchComponent', () => {
  let component: DigimonsearchComponent;
  let fixture: ComponentFixture<DigimonsearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DigimonsearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DigimonsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
