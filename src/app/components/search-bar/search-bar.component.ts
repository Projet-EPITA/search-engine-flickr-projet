import { Component, OnInit } from '@angular/core';
import { FlickrService } from 'src/app/services/flickr.service';
import { SearchService } from 'src/app/services/search.service'; // Assurez-vous que le chemin est correct

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  images: any[] = [];
  keyword: string = '';

  constructor(
    private flickrService: FlickrService,
    private searchService: SearchService
  ) { }

  ngOnInit() {
    // Récupérer l'état de la recherche en mémoire
    this.keyword = this.searchService.getKeyword();
    this.images = this.searchService.getImages();
  }

  search(event: Event) {
    const target = event.target as HTMLInputElement;
    this.keyword = this.keyword.toLowerCase();
    this.searchService.setKeyword(this.keyword);
    

    if (this.keyword && this.keyword.length > 0) {
      this.flickrService.searchKeyword(this.keyword)
        .toPromise()
        .then(res => {
          if (Array.isArray(res)) {
            this.images = res;
            this.searchService.setImages(res);
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
