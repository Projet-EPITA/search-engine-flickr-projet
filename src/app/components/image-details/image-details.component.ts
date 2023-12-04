import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.css']
})
export class ImageDetailsComponent implements OnInit {
  imageTitle: string = 'Untitled';
  author: string = 'Unknown';
  suggestions: string[] = ['Nothing to show'];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      // Retrieve parameters from the URL query
      this.imageTitle = params['title'] || 'Untitled';
      this.author = params['author'] || 'Unknown';
      // TODO: Fetch other images by the same author based on this.author
      // For example, make an API call to Flickr to get more images by this author
      // Update this.suggestions with fetched data
    });
  }
}
