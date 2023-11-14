import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { VideoCommentService } from './video-comment.service';

describe('VideoCommentService', () => {
  let service: VideoCommentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VideoCommentService]
    });
    service = TestBed.inject(VideoCommentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests.
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get User data', () => {
    const mockUser = {
      "id": 1,
      "name": "jaoo",
      "connection": "PROFESSOR",
      "email": "joao15victor08@gmail.com",
      "role": "USER",
      "is_active": true
    };
    service.getUser(1).subscribe((res) => {
      expect(res.body).toEqual(mockUser);
    });
    const req = httpMock.expectOne(`${service.apiURLUsers}/users/1`);
    expect(req.request.method).toBe('GET');

    req.flush(mockUser);
  });

  it('should get Comments data', () => {
    const mockComments = [
      {
        "id": 3,
        "user_id": 1,
        "user_name": "jaoo",
        "video_id": 190329,
        "content": "legal"
      },
    ]
    service.getComments(190329).subscribe((res) => {
      expect(res.body).toEqual(mockComments);
    });
    const req = httpMock.expectOne(`${service.apiURLVideo}/comments/190329`);
    expect(req.request.method).toBe('GET');
    req.flush(mockComments);
  });

  it('should post Comment', () => {
    const mockComment = {
      "user_id": 1,
      "user_name": "jaoo",
      "video_id": 190329,
      "content": "legal"
    }
    service.postComment(mockComment).subscribe((res) => {
      expect(res).toEqual(mockComment);
    });
    const req = httpMock.expectOne(`${service.apiURLVideo}/comments`);
    expect(req.request.method).toBe('POST');
    req.flush(mockComment);
  });

  it('should update Comment', () => {
    const mockComment = {
      "user_id": 1,
      "user_name": "jaoo",
      "video_id": 190329,
      "content": "legal"
    }
    service.updateComment(3, mockComment).subscribe((res) => {
      expect(res).toEqual(mockComment);
    });
    const req = httpMock.expectOne(`${service.apiURLVideo}/comments/3`);
    expect(req.request.method).toBe('PATCH');
    req.flush(mockComment);
  });

  it('should delete Comment', () => {
    service.deleteComment(3).subscribe((res) => {
      expect(res).toEqual({});
    });
    const req = httpMock.expectOne(`${service.apiURLVideo}/comments/3`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
