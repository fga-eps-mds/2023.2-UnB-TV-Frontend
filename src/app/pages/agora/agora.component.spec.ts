import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgoraComponent } from './agora.component';

describe('AgoraComponent', () => {
  let component: AgoraComponent;
  let fixture: ComponentFixture<AgoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgoraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
