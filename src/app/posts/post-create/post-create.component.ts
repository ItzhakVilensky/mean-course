import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { PostService } from "../post.service";
import { PageMode } from "../page-mode";
import { Post } from "../post.model";
import { mimeType } from "./mime-type.validator";

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

    post: Post = { id: '', content: '', title: '', imagePath: '' };
    isLoading = false;
    form!: FormGroup;
    imagePreview: string = '';
    private pageMode: PageMode = 'create';
    private postId: string | null = null;

    constructor(
        public postService: PostService,
        public route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.form = new FormGroup({
            title: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
            content: new FormControl(null, { validators: [Validators.required] }),
            image: new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType] })
        });

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
                                content: postData.content,
                                imagePath: ''
                            }
                            this.form.setValue({
                                title: this.post.title,
                                content: this.post.content
                            });
                        });
                } else {
                    this.pageMode = 'create';
                    this.postId = null;
                }
            });
    }

    onImagePicked(event: Event) {
        const file = (event.target as HTMLInputElement).files![0];
        this.form.patchValue({ image: file });
        this.form.get('image')?.updateValueAndValidity();
        const reader = new FileReader();
        reader.onload = () => {
            this.imagePreview = reader.result as string;
        };
        reader.readAsDataURL(file);
    }

    onSavePost() {
        if (this.form.invalid) {
            return;
        }
        this.isLoading = true;

        if (this.pageMode === 'create') {
            this.postService.addPost(
                this.form.value.title,
                this.form.value.content,
                this.form.value.image
            );
        } else { // update
            this.postService.updatePost(
                this.postId as string,
                this.form.value.title,
                this.form.value.content
            );
        }
        this.form.reset();
    }
}