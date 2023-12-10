import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { VideoViewerComponent } from './video-viewer.component';
import { VideoCommentComponent } from 'src/app/components/video-comment/video-comment.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { VideoService } from 'src/app/services/video.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

class VideoServiceMock {
  constructor() { }
  findVideoById() {
    return of({});
  }
}

describe('VideoViewerComponent', () => {
  let component: VideoViewerComponent;
  let fixture: ComponentFixture<VideoViewerComponent>;
  let videoService: VideoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideoViewerComponent, VideoCommentComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { id: 190329 } } },
        },
        { provide: VideoService, useValue: new VideoServiceMock() },
        FormBuilder,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(VideoViewerComponent);
    component = fixture.componentInstance;
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb2FvMTV2aWN0b3IwOEBnbWFpbC5jb20iLCJleHAiOjE2OTkzMTI5MzV9.1B9qBJt8rErwBKyD5JCdsPozsw86oQ38tdfDuMM2HFI');
    fixture.detectChanges();
    videoService = TestBed.inject(VideoService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle showDescription when expandDescription is called', () => {

    expect(component.showDescription).toBe(false);

    component.expandDescription();

    expect(component.showDescription).toBe(true);

    component.expandDescription();

    expect(component.showDescription).toBe(false);
  });

  it('should call findVideoById and return video', () => {
    const mySpy = spyOn(videoService, 'findVideoById').and.callThrough();
    component.findVideoById();
    expect(mySpy).toHaveBeenCalled();
  });

  it('should share video with native share API on mobile', () => {
    spyOnProperty(navigator, 'userAgent').and.returnValue('Android');

    const shareSpy = spyOn(navigator, 'share').and.callThrough();
    const clipboardSpy = spyOn(navigator.clipboard, 'writeText');

    component.shareVideo();

    expect(shareSpy).toHaveBeenCalled();
    expect(clipboardSpy).not.toHaveBeenCalled();
  });

  it('should copy video URL to clipboard on desktop', () => {
    spyOnProperty(navigator, 'userAgent').and.returnValue('Windows');

    const shareSpy = spyOn(navigator, 'share');
    const clipboardSpy = spyOn(navigator.clipboard, 'writeText').and.returnValue(Promise.resolve());

    component.shareVideo();

    expect(shareSpy).not.toHaveBeenCalled();
    expect(clipboardSpy).toHaveBeenCalledWith(window.location.href);
  });

  it('should open WhatsApp with video URL on mobile', () => {
    spyOnProperty(navigator, 'userAgent').and.returnValue('Android');

    const shareSpy = spyOn(navigator, 'share').and.throwError('Not supported');

    const clipboardSpy = spyOn(navigator.clipboard, 'writeText').and.callThrough();

    const windowOpenSpy = spyOn(window, 'open');

    component.shareVideo();

    expect(shareSpy).toHaveBeenCalled();
    expect(clipboardSpy).toHaveBeenCalled();
    expect(windowOpenSpy).toHaveBeenCalledWith(jasmine.stringMatching(/whatsapp:\/\/send/));
  });

  it('should handle unsupported share options gracefully', () => {
    spyOnProperty(navigator, 'userAgent').and.returnValue('Mozilla');

    const shareSpy = spyOn(navigator, 'share').and.throwError('Not supported');
    const clipboardSpy = spyOn(navigator.clipboard, 'writeText').and.throwError('Not supported');

    const consoleWarnSpy = spyOn(console, 'warn');

    component.shareVideo();

    expect(shareSpy).toHaveBeenCalled();
    expect(clipboardSpy).not.toHaveBeenCalled();
    expect(consoleWarnSpy).toHaveBeenCalledWith('A API de compartilhamento não é suportada neste navegador.');
  });
});
