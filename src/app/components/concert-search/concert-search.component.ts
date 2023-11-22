import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-concert-search',
  templateUrl: './concert-search.component.html',
  styleUrls: ['./concert-search.component.css']
})
export class ConcertSearchComponent {
  searchQuery: string = '';
  concertPhotos: any[] = [];
  noResults: boolean = false;
  showResults: boolean = false;
  viewMode: string = 'mosaic';
  
  constructor(private http: HttpClient) {}

  searchConcerts() {
    const apiKey = 'aeec917977c8270ecd1c269acd38cf69';
    const flickrApiUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${this.searchQuery}&format=json&nojsoncallback=1`;

    this.http.get(flickrApiUrl).subscribe((response: any) => {
      if (response.photos && response.photos.photo.length > 0) {
        this.concertPhotos = response.photos.photo.map((photo: any) => {
          return {
            url_m: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_m.jpg`,
            title: photo.title
          };
        });
        this.showResults = true;
        this.noResults = false;
      } else {
        this.showResults = false;
        this.noResults = true;
        this.concertPhotos = [];
      }
    }, (error) => {
      console.error('Error fetching data:', error);
      this.showResults = false;
      this.noResults = true;
      this.concertPhotos = [];
    });
  }
}
