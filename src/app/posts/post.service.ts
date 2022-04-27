import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Post } from "./post.model";

@Injectable({
    providedIn: 'root'
})
export class PostService {

    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    constructor(private http: HttpClient, private router: Router) {
    }

    getPosts() {
        this.http
            .get<{ message: string, posts: any }>(
                'http://localhost:3000/api/posts'
            ).pipe(
                map((postData) => {
                    return postData.posts
                        .map((post: { title: any; content: any; _id: any; __v: number }) => {
                            return {
                                title: post.title,
                                content: post.content,
                                id: post._id
                            }
                        });
                })
            )
            .subscribe((adaptedPosts) => {
                this.posts = adaptedPosts;
                this.postsUpdated.next([...this.posts]);
            });
    }

    getPostUpdateListener(): Observable<Post[]> {
        return this.postsUpdated.asObservable();
    }

    getPost(id: string) {
        return this.http.get<{ _id: string, title: string, content: string }>
            (
                'http://localhost:3000/api/posts/' + id
            );
    }

    addPost(title: string, content: string) {
        const post: Post = { id: '', title: title, content: content };
        this.http.post<{ message: string, postId: string }>('http://localhost:3000/api/posts', post)
            .subscribe((responseData) => {
                const id = responseData.postId;
                post.id = id;
                this.posts.push(post);
                this.postsUpdated.next([...this.posts]);
                this.router.navigate(['/']);
            });
    }

    updatePost(id: string, title: string, content: string) {
        const post: Post = { id: id, title: title, content: content };
        this.http.put('http://localhost:3000/api/posts/' + id, post)
            .subscribe((responseData) => {
                const updatedPosts = [...this.posts];
                const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
                updatedPosts[oldPostIndex] = post;
                this.posts = updatedPosts;
                this.postsUpdated.next([...this.posts]);
                this.router.navigate(['/']);
            });
    }

    deletePost(postId: string) {
        this.http.delete<{ acknowledged: boolean, deletedCount: number }>
            (
                'http://localhost:3000/api/posts/' + postId
            )
            .subscribe((responseData) => {
                const postsUpdated = this.posts.filter(post => post.id !== postId);
                this.posts = postsUpdated;
                this.postsUpdated.next([...this.posts]);
            });
    }
}