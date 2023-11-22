import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VideoCommentComponent } from './video-comment.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { VideoCommentService } from 'src/app/services/video-comment.service';
import { UserService } from 'src/app/services/user.service';

class VideoCommentServiceMock {
  constructor() { }
  getComments() {
    return of({ body: [] });
  }
  postComment() {
    return of({ body: [] });
  }
}

class UserServiceMock {
  constructor() { }
  getUser(userId: number) {
    return of({ body: [] });
  }
}

describe('VideoCommentComponent', () => {
  let component: VideoCommentComponent;
  let fixture: ComponentFixture<VideoCommentComponent>;
  let videoCommentService: VideoCommentService;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideoCommentComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule],
      providers: [
        FormBuilder,
        { provide: VideoCommentService, useValue: new VideoCommentServiceMock() },
        { provide: UserService, useValue: new UserServiceMock() }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(VideoCommentComponent);
    component = fixture.componentInstance;
    videoCommentService = TestBed.inject(VideoCommentService);
    userService = TestBed.inject(UserService);
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb2FvMTV2aWN0b3IwOEBnbWFpbC5jb20iLCJleHAiOjE2OTkzMTI5MzV9.1B9qBJt8rErwBKyD5JCdsPozsw86oQ38tdfDuMM2HFI');
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should have a valid form on initialization', () => {
    fixture.detectChanges();
    expect(component.commentForm).toBeTruthy();
  });

  it('should call addComment method when the form is submitted', () => {
    fixture.detectChanges();
    spyOn(component, 'addComment').and.callThrough();
    const form = component.commentForm;
    form.setValue({ comment: 'comment content' });

    const submitButton = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    );
    submitButton.click();

    expect(component.addComment).toHaveBeenCalled();
  });

  it('should call alert when form is not valid for required field', () => {
    spyOn(component, 'addComment').and.callThrough();
    const alertSpy = spyOn(window, 'alert');
    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    );
    submitButton.click();

    expect(alertSpy).toHaveBeenCalledWith('Comentário não pode ser vazio');
  });

  it('should call alert when form is not valid for lenght of field', () => {
    fixture.detectChanges();
    spyOn(component, 'addComment').and.callThrough();
    const alertSpy = spyOn(window, 'alert');
    const form = component.commentForm;
    form.setValue({ comment: 'Lorem ipsum dolor sit amet. Et dolorem modi aut doloremque quas et perferendis velit non minima culpa sed totam doloribus et tempora necessitatibus. Est ipsum sunt ab repellat excepturi sed fugiat sint ut dicta animi. Non voluptate aperiam ab veniam rerum est omnis assumenda At doloribus quia aut delectus tempora? Eos eligendi numquam est molestiae itaque ut dolor quidem ea optio natus. Qui facere dignissimos in tenetur excepturi ea inventore aliquid qui corporis delectus vel dolor ducimus. A tempora explicabo qui aspernatur quod est iusto laboriosam id molestias delectus 33 eveniet suscipit eos dolores esse. 33 quia totam qui quidem ipsa sit fugiat Quis sit quam doloremque non eius voluptates et voluptas suscipit! Ut dicta saepe rem repellat voluptatem et omnis quod ex tempore rerum non laborum fuga eos voluptate vitae. Aut iusto quam ut dignissimos impedit ut placeat nihil et excepturi consequatur est dolorum harum vel voluptate quae rem eligendi commodi. In eius molestiae non tempora voluptatem sed galisum inventore eum similique incidunt et reiciendis officia. Et quia numquam qui placeat dignissimos eos quia tenetur 33 laboriosam numquam ab omnis ullam. Ut quibusdam aperiam ex dolore ipsa in consectetur tenetur qui vitae fuga. Eum commodi labore eos nemo voluptates eum praesentium laudantium eos delectus enim rem mollitia voluptatem ut numquam voluptatem et obcaecati molestiae! Et esse eveniet eum doloremque sint est commodi fugiat et repellendus totam.' });

    const submitButton = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    );
    submitButton.click();

    expect(alertSpy).toHaveBeenCalledWith('Comentário não pode ter mais de 1000 caracteres');
  });

  it('should call toggleComments method when "Comentarios" is clicked', () => {
    fixture.detectChanges();
    spyOn(component, 'toggleComments').and.callThrough();
    const forgotPasswordLink =
      fixture.nativeElement.querySelector('.text-blue-brand');
    forgotPasswordLink.click();

    expect(component.toggleComments).toHaveBeenCalled();

  });

  it('should call set userId to 0 when not authenticated', () => {
    localStorage.clear();
    fixture.detectChanges();

    expect(component.userId).toBe(0);
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb2FvMTV2aWN0b3IwOEBnbWFpbC5jb20iLCJleHAiOjE2OTkzMTI5MzV9.1B9qBJt8rErwBKyD5JCdsPozsw86oQ38tdfDuMM2HFI');

  });

  it('shoud call getComments', () => {
    spyOn(component, 'getComments');
    fixture.detectChanges();
    expect(component.getComments).toHaveBeenCalled();
    expect(component.comments).toBeTruthy();
  })

  it('should call getComments and return an error', () => {
    const mySpy = spyOn(videoCommentService, 'getComments').and.returnValue(throwError(() => new Error('Erro')));
    component.getComments();
    expect(mySpy).toHaveBeenCalled();
  });

  it('should call addComment and return an error', () => {
    fixture.detectChanges();
    const form = component.commentForm;
    form.setValue({ comment: 'comment content' });
    const mySpy = spyOn(videoCommentService, 'postComment').and.returnValue(throwError(() => new Error('Erro')));
    component.addComment();
    expect(mySpy).toHaveBeenCalled();
  });

  it('should call getUserName and return an error', () => {
    const mySpy = spyOn(userService, 'getUser').and.returnValue(throwError(() => new Error('Erro')));
    component.getUserName(1);
    expect(mySpy).toHaveBeenCalled();
  });


});
