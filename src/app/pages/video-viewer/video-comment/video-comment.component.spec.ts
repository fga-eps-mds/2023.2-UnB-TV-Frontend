import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoCommentComponent } from './video-comment.component';

describe('VideoCommentComponent', () => {
  let component: VideoCommentComponent;
  let fixture: ComponentFixture<VideoCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoCommentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
