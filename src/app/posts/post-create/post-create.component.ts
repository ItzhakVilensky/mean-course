import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { PostService } from "../post.service";
import { PageMode } from "../page-mode";
import { Post } from "../post.model";

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

    post: Post = { id: '', content: '', title: '' };
    isLoading = false;
    private pageMode: PageMode = 'create';
    private postId: string | null = null;

    constructor(
        public postService: PostService,
        public route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.paramMap
            .subscribe((paramMap: ParamMap) => {

                if (paramMap.has('postId')) {
                    this.pageMode = 'edit';
                    this.postId = paramMap.get('postId') as string;
                    this.isLoading = true;
                    this.postService.getPost(this.postId)
                        .subscribe(postData => {
                            this.isLoading = false;
                            this.post = {
                                id: postData._id,
                                title: postData.title,
                                content: postData.content
                            }
                        });
                } else {
                    this.pageMode = 'create';
                    this.postId = null;
                }
            });
    }

    onSavePost(form: NgForm) {
        if (form.invalid) {
            return;
        }
        this.isLoading = true;

        if (this.pageMode === 'create') {
            this.postService.addPost(form.value.title, form.value.content);
        } else {
            this.postService.updatePost(this.postId as string, form.value.title, form.value.content);
        }
        form.resetForm();
    }
}