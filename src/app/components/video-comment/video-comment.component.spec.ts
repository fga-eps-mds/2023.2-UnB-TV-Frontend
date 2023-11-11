import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VideoCommentComponent } from './video-comment.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { VideoService } from 'src/app/services/video.service';

describe('VideoCommentComponent', () => {
  let component: VideoCommentComponent;
  let fixture: ComponentFixture<VideoCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoCommentComponent ],
      imports: [HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule],
      providers: [FormBuilder, {provide: VideoService}]
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
