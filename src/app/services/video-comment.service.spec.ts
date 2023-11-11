import { TestBed } from '@angular/core/testing';

import { VideoCommentService } from './video-comment.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('VideoCommentService', () => {
  let service: VideoCommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(VideoCommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
