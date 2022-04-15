import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  storedPosts: [{ title: '', content: '' }] = [{ title: '', content: '' }];

  onPostAdded(post: { title: '', content: '' }) {
    this.storedPosts.push(post);
  }
}
