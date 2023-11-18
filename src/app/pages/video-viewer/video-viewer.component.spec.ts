import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { VideoViewerComponent } from './video-viewer.component';
import { SafePipe } from 'src/app/pipes/safe.pipe';
import { VideoCommentComponent } from 'src/app/components/video-comment/video-comment.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { VideoService } from 'src/app/services/video.service';
import { ActivatedRoute } from '@angular/router';

describe('VideoViewerComponent', () => {
  let component: VideoViewerComponent;
  let fixture: ComponentFixture<VideoViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideoViewerComponent, SafePipe, VideoCommentComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { params: { 'id': 1 }, queryParams: { 'title': "titulo" } } } },
        { provide: VideoService },
        FormBuilder,
      ]

    })
      .compileComponents();

    fixture = TestBed.createComponent(VideoViewerComponent);
    component = fixture.componentInstance;
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb2FvMTV2aWN0b3IwOEBnbWFpbC5jb20iLCJleHAiOjE2OTkzMTI5MzV9.1B9qBJt8rErwBKyD5JCdsPozsw86oQ38tdfDuMM2HFI');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
