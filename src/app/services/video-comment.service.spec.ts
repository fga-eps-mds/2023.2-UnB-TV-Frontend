import { TestBed } from '@angular/core/testing';

import { VideoCommentService } from './video-comment.service';

describe('VideoCommentService', () => {
  let service: VideoCommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoCommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
