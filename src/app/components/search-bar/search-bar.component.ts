import { Component, OnInit } from '@angular/core';
import { FlickrService } from 'src/app/services/flickr.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  images: any[] = [];
  keyword: string = '';

  constructor(private flickrService: FlickrService) { }

  ngOnInit() {
  }

  search(event: Event) {
    const target = event.target as HTMLInputElement;
    this.keyword = target.value.toLowerCase();
    if (this.keyword && this.keyword.length > 0) {
      this.flickrService.searchKeyword(this.keyword)
        .toPromise()
        .then(res => {
          if (Array.isArray(res)) {
            this.images = res;
          } else {
            console.error('Invalid response format.');
          }
        })
        .catch(err => {
          console.error('Error searching images:', err);
        });
    }
  }
}
