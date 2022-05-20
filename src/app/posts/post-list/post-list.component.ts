import { Component, OnDestroy, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Subscription } from "rxjs";
import { Post } from "../post.model";
import { PostService } from "../post.service";

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

    totalPosts = 10;
    postsPerPage = 5;
    pageSizeOptions = [1, 2, 5, 10];
    isLoading = false;
    posts: Post[] = [];
    private postSubscription = new Subscription();

    constructor(public postService: PostService) {
    }

    ngOnInit() {
        this.isLoading = true;
        this.postService.getPosts();
        this.postSubscription = this.postService.getPostUpdateListener()
            .subscribe((posts: Post[]) => {
                this.isLoading = false;
                this.posts = posts;
            });
    }

    onDelete(postId: string) {
        this.postService.deletePost(postId);
    }

    onChangePage(pageData: PageEvent){

    }

    ngOnDestroy() {
        this.postSubscription.unsubscribe();
    }
}