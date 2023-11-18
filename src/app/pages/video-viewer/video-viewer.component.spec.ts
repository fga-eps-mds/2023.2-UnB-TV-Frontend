import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
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
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(VideoViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle mostrarCompleta property', () => {
    expect(component.mostrarCompleta).toBe(false);

    component.expandirDescricao();

    expect(component.mostrarCompleta).toBe(true);

    component.expandirDescricao();

    expect(component.mostrarCompleta).toBe(false);
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
