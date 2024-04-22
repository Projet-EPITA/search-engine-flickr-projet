import { Component, OnInit } from '@angular/core';
import { FlickrSearchParams, FlickrService } from 'src/app/services/flickr.service';
import { SearchService } from 'src/app/services/search.service'; // Assurez-vous que le chemin est correct

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  images: any[] = []; // eslint-disable-line @typescript-eslint/no-explicit-any
  keyword: string = '';
  minUploadDate: string = '';
  maxUploadDate: string = '';
  sort: string = '';
  nsfw: boolean = false;
  tags: string = '';
  inGallery: boolean = false;

  constructor(
    private flickrService: FlickrService,
    private searchService: SearchService
  ) { }

  ngOnInit() {
    this.keyword = this.searchService.getKeyword();
    this.images = this.searchService.getImages();
    this.minUploadDate = ''; // Ou toute autre valeur par défaut appropriée
    this.maxUploadDate = ''; // Ou toute autre valeur par défaut appropriée
    this.sort = ''; // Ou toute autre valeur par défaut appropriée
    this.nsfw = false; // Ou toute autre valeur par défaut appropriée
    this.tags = ''; // Ou toute autre valeur par défaut appropriée
    this.inGallery = false;
  }

  // Dans SearchBarComponent

  search() {
    this.keyword = this.keyword.toLowerCase();
    this.searchService.setKeyword(this.keyword);

    if (this.keyword && this.keyword.length > 0) {
      const searchParams: FlickrSearchParams = {
        keyword: this.keyword,
        minUploadDate: this.minUploadDate,
        maxUploadDate: this.maxUploadDate,
        sort: this.sort,
        nsfw: this.nsfw,
        tags: this.tags,
        inGallery: this.inGallery,
      };

      this.flickrService.searchKeyword(searchParams)
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

  myUndefinedFunction() {};

  applyFilters() {
    const searchParams: FlickrSearchParams = {
      keyword: this.keyword,
      minUploadDate: this.minUploadDate,
      maxUploadDate: this.maxUploadDate,
      sort: this.sort,
      nsfw: this.nsfw,
      tags: this.tags,
      inGallery: this.inGallery,
    };

    this.flickrService.searchKeyword(searchParams)
    .toPromise()
    .then(res => {
      if (res) {
        this.images = res;
        this.searchService.setImages(res);
      } else {
        this.images = [];
        this.searchService.setImages([]);
      }
    })
    .catch(err => {
      console.error('Error searching images:', err);
      this.images = [];
      this.searchService.setImages([]);
    });
  }

}
