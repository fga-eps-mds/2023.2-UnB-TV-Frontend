import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { VideoViewerComponent } from './video-viewer.component';
import { VideoCommentComponent } from 'src/app/components/video-comment/video-comment.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { VideoService } from 'src/app/services/video.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

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
          useValue: { snapshot: { params: { idVideo: 190329 } } },
        },
        { provide: VideoService, useValue: new VideoServiceMock() },
        FormBuilder,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(VideoViewerComponent);
    component = fixture.componentInstance;
    localStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb2FvMTV2aWN0b3IwOEBnbWFpbC5jb20iLCJleHAiOjE2OTkzMTI5MzV9.1B9qBJt8rErwBKyD5JCdsPozsw86oQ38tdfDuMM2HFI'
    );
    fixture.detectChanges();
    videoService = TestBed.inject(VideoService);
    navigator.share = () => {
      {
        return new Promise((resolve, reject) => {
          resolve();
        });
      }
    };

    navigator.canShare = () => {
      {
        return true;
      }
    }


  });

  class VideoServiceMock {
    findVideoById(id: number) {
      const mockVideo = {
        id: id,
        title: 'Mock Video Title',
        description: 'Mock Video Description',
      };
      return of(new HttpResponse({ body: mockVideo }));
    }
  }

  it('should call findVideoById and set video description', () => {
    const expectedVideo = {
      id: 190329,
      title: 'Mock Video Title',
      description: 'Mock Video Description',
    };
    const mySpy = spyOn(videoService, 'findVideoById').and.returnValue(
      of(new HttpResponse({ body: expectedVideo }))
    );
    component.findVideoById();
    fixture.detectChanges();
    expect(mySpy).toHaveBeenCalledWith(190329);
    expect(component.video).toEqual(expectedVideo);
    expect(component.videoDescription).toEqual(expectedVideo.description);
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

  it('should call findVideoById and set video description', () => {
    const expectedVideo = {
      id: 190329,
      title: 'Mock Video Title',
      description: 'Mock Video Description',
    };
    spyOn(videoService, 'findVideoById').and.returnValue(
      of(new HttpResponse({ body: expectedVideo }))
    );
    component.findVideoById();
    fixture.detectChanges();
    expect(component.video).toEqual(expectedVideo);
    expect(component.videoDescription).toEqual(expectedVideo.description);
  });

  it('should return the correct video URL', () => {
    component.eduplayVideoUrl = 'https://eduplay.rnp.br/portal/video/';
    component.idVideo = 190329;

    const expectedUrl = 'https://eduplay.rnp.br/portal/video/190329';
    const returnedUrl = component.getVideoUrl();

    expect(returnedUrl).toEqual(expectedUrl);
  });

  it('should share video with native share API on mobile', fakeAsync(() => {
    const shareData = {
      title: component.video.title,
      text: component.video.title,
      url: window.location.href,
    };
    spyOn(window.navigator, 'canShare').and.returnValue(true);
    spyOn(navigator, 'share').and.returnValue(
      new Promise((resolve, reject) => {
        resolve();
      })
    );
    component.shareVideo();
    tick();
    expect(navigator.share).toHaveBeenCalledWith(shareData);
  }));


  it('should handle unsupported share options gracefully', fakeAsync(() => {
    spyOn(navigator, 'canShare').and.returnValue(true);
    spyOn(navigator, 'share').and.returnValue(Promise.reject());
    spyOn((window as any).navigator.clipboard, 'writeText').and.returnValue(Promise.resolve());
    const consoleWarnSpy = spyOn(console, 'error');

    component.shareVideo();
    tick();
    expect(consoleWarnSpy).toHaveBeenCalledWith('Erro ao compartilhar:', undefined);
  }));

  it('should copy video URL to clipboard if native share is not supported', fakeAsync(() => {

    spyOn(navigator, 'canShare').and.returnValue(false);
    // spyOnProperty(navigator, 'clipboard').and.resolveTo();
    spyOn(navigator.clipboard, 'writeText').and.returnValue(Promise.resolve());
    const consoleWarnSpy = spyOn(console, 'error');

    component.shareVideo();
    tick();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(window.location.href);
    expect(consoleWarnSpy).not.toHaveBeenCalled();
  }));

  it('should handle clipboard errors gracefully', fakeAsync(() => {
    spyOn(navigator, 'canShare').and.returnValue(false);
    spyOn(navigator.clipboard, 'writeText').and.returnValue(Promise.reject());
    const consoleWarnSpy = spyOn(console, 'error');

    component.shareVideo();
    tick();
    expect(consoleWarnSpy).toHaveBeenCalledWith('Erro ao copiar URL:', undefined);
  }));



}); 
