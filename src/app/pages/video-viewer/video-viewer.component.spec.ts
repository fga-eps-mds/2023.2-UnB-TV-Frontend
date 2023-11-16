import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { VideoViewerComponent } from './video-viewer.component';
import { SafePipe } from 'src/app/pipes/safe.pipe';
import { VideoService } from 'src/app/services/video.service';

describe('VideoViewerComponent', () => {
  let component: VideoViewerComponent;
  let fixture: ComponentFixture<VideoViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideoViewerComponent, SafePipe],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [{ provide: VideoService }]

    })
      .compileComponents();

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
  
});
