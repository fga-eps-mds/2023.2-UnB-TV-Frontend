import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VideoCommentService }from '../../../services/video-comment.service';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-video-comment',
  templateUrl: './video-comment.component.html',
  styleUrls: ['./video-comment.component.css']
})
export class VideoCommentComponent implements OnInit {
  commentForm!: FormGroup;
  comment: string = '';
  video_id: number = 0;

  constructor(
    private fb: FormBuilder,
    private vcs: VideoCommentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.commentForm = this.fb.group({
        comment: ['', [Validators.required,Validators.maxLength(300)]],
      },
    );
    this.route.params.subscribe((params)=> {
      this.video_id = params['idVideo'];
    })
  }
  addComment() {
    if (this.commentForm.valid) {
      this.comment = this.commentForm.value.comment;
      this.vcs.postComment({
        user_id: 123,
        video_id: this.video_id,
        content: this.comment
      }).subscribe({
        next: (data)=> {
          console.log(data);
        },
        error: (error)=> {
          console.log(error)
        }
      });
    } else {
        alert("Comentário não pode ser vazio");
    }
  }
}

