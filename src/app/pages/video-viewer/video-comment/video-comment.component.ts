import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VideoCommentService } from '../../../services/video-comment.service';
import { ActivatedRoute } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { AuthService } from '../../../services/auth.service';
import { Comment } from '../../../../shared/model/comment.model';
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


  constructor(
    private fb: FormBuilder,
    private vcs: VideoCommentService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.commentForm = this.fb.group({
      comment: ['', [Validators.required, Validators.maxLength(300)]],
    },
    );
    this.route.params.subscribe((params) => {
      this.video_id = params['idVideo'];
    })
    if (this.authService.isAuthenticated()) {
      this.setUserIdFromToken(localStorage.getItem('token') as string);
    } else {
      this.userId = 0;
    }
    this.vcs.getComments(this.video_id).subscribe({
      next: (data) => {
        this.comments = data.body as Comment[];
        this.comments.forEach((comment) => {
          this.vcs.getUser(comment.user_id as number).subscribe({
            next: (data) => {
              console.log(data);
              comment.user_name = data.body.name;
            },
            error: (error) => {
              console.log(error)
            }
          });
        });
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
        return data.name;
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
        content: this.comment
      }).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          console.log(error)
        }
      });
    } else {
      alert("Comentário não pode ser vazio");
    }
  }
}

