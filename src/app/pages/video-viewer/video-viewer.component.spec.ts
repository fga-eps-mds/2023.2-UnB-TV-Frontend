import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { VideoViewerComponent } from './video-viewer.component';
import { VideoCommentComponent } from 'src/app/components/video-comment/video-comment.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { VideoService } from 'src/app/services/video.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

describe('VideoViewerComponent', () => {
  let component: VideoViewerComponent;
  let fixture: ComponentFixture<VideoViewerComponent>;
  let domSanitizer: DomSanitizer;

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
          useValue: { snapshot: { params: { id: 1 } } },
        },
        { provide: VideoService },
        FormBuilder,
        {
          provide: DomSanitizer, 
          useValue: { bypassSecurityTrustResourceUrl: (value: string) => value }
        }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(VideoViewerComponent);
    component = fixture.componentInstance;
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb2FvMTV2aWN0b3IwOEBnbWFpbC5jb20iLCJleHAiOjE2OTkzMTI5MzV9.1B9qBJt8rErwBKyD5JCdsPozsw86oQ38tdfDuMM2HFI');
    fixture.detectChanges();
    domSanitizer = TestBed.inject(DomSanitizer);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('expand Description', () => {
    it('should toggle showDescription when expandDescription is called', () => {
      
      expect(component.showDescription).toBe(false);
      
      component.expandDescription();
      
      expect(component.showDescription).toBe(true);
      
      component.expandDescription();

      expect(component.showDescription).toBe(false);
    });
  }); 
  describe('Getting the video url', () => {
    it('should extract video URL from embed code', () => {
      const embedCode =
        '<iframe width="671" height="377" src="https://eduplay.rnp.br/portal/video/embed/190486" frameborder="0" scrolling="no" allowfullscreen></iframe>';
      const extractedUrl = component.extractVideoUrl(embedCode);

      expect(extractedUrl).toBe(
        'https://eduplay.rnp.br/portal/video/embed/190486'
      );
    });

    it('should return null for invalid embed code', () => {
      const invalidEmbedCode = '<iframe></iframe>';
      const extractedUrl = component.extractVideoUrl(invalidEmbedCode);

      expect(extractedUrl).toBeNull();
    });

  });

  
}); 
