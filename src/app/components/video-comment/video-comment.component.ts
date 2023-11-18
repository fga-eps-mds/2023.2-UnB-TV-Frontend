import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VideoCommentService } from '../../services/video-comment.service';
import { ActivatedRoute } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { AuthService } from '../../services/auth.service';
import { Comment } from '../../../shared/model/comment.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-video-comment',
  templateUrl: './video-comment.component.html',
  styleUrls: ['./video-comment.component.css']
})
export class VideoCommentComponent implements OnInit {
  commentForm!: FormGroup;
  comment: string = '';
  video_id: number = 0;
  userId: any;
  comments: Comment[] = [];
  userName: string = '';
  showComments: boolean = false;


  constructor(
    private fb: FormBuilder,
    private vcs: VideoCommentService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.commentForm = this.fb.group({
      comment: ['', [Validators.required, Validators.maxLength(1000)]],
    },
    );
    this.video_id = this.route.snapshot.params['idVideo'];
    if (this.authService.isAuthenticated()) {
      this.setUserIdFromToken(localStorage.getItem('token') as string);
    } else {
      this.userId = 0;
    }

    this.getUserName(this.userId);

    this.getComments();


  }

  getComments() {
    this.vcs.getComments(this.video_id).subscribe({
      next: (data) => {
        this.comments = data.body as Comment[];
        console.log(this.comments);
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  setUserIdFromToken(token: string) {
    const decodedToken: any = jwt_decode(token);
    this.userId = decodedToken.id;
    // console.log(this.userId);
  }

  getUserName(userId: number) {
    this.userService.getUser(userId).subscribe({
      next: (data) => {
        this.userName = data.name;
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  addComment() {
    if (this.commentForm.valid) {
      this.comment = this.commentForm.value.comment;
      this.vcs.postComment({
        user_id: this.userId,
        video_id: this.video_id,
        user_name: this.userName,
        content: this.comment
      }).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          console.log(error)
        }
      });
      this.comments.push({
        user_id: this.userId,
        video_id: this.video_id,
        content: this.comment,
        user_name: this.userName
      });
      this.commentForm.reset();
    } else if (this.commentForm.get('comment')?.hasError('required')) {
      alert("Comentário não pode ser vazio");
    }
    else if (this.commentForm.get('comment')?.hasError('maxlength')) {
      alert("Comentário não pode ter mais de 1000 caracteres");
    }
  }

  toggleComments() {
    this.showComments = !this.showComments;
  }

}

