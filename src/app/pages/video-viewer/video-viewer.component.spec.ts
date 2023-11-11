import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { VideoViewerComponent } from './video-viewer.component';
import { VideoService } from '../../services/video.service';
import { SafePipe } from 'src/app/pipes/safe.pipe';
import { VideoCommentComponent } from 'src/app/components/video-comment/video-comment.component';
import { FormBuilder } from '@angular/forms';

describe('VideoViewerComponent', () => {
  let component: VideoViewerComponent;
  let fixture: ComponentFixture<VideoViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideoViewerComponent, SafePipe, VideoCommentComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [{ provide: VideoService }, FormBuilder]

    })
      .compileComponents();

    fixture = TestBed.createComponent(VideoViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
