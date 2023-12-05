import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/app/environment';

export interface FlickrPhoto {
  farm: string;
  id: string;
  secret: string;
  server: string;
  title: string;
}

export interface FlickrSearchResult {
  photos: {
    photo: FlickrPhoto[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class FlickrService {
  previousKeyword: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 12;

  constructor(private http: HttpClient) { }

  searchKeyword(keyword: string) {
    if (this.previousKeyword === keyword) {
      this.currentPage++;
    } else {
      this.currentPage = 1;
    }
    this.previousKeyword = keyword;

    const url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&';
    const queryParams = `api_key=${environment.flickr.key}&text=${keyword}&format=json&nojsoncallback=1&per_page=${this.itemsPerPage}&page=${this.currentPage}`;

    return this.http.get<FlickrSearchResult>(url + queryParams).pipe(
      map((res: FlickrSearchResult) => {
        return res.photos.photo.map((photo: FlickrPhoto) => {
          return {
            url: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
            title: photo.title
          };
        });
      })
    );
  }
}
