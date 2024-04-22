/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/app/environment';

export interface FlickrPhoto {
  farm: string;
  id: string;
  secret: string;
  server: string;
  title: {
    _content: string;
  };
}

export interface FlickrPhotoInfo {
  id: string;
  secret: string;
  server: string;

  title: {
    _content: string;
  };
  owner: {
    nsid: string;
    username: string;
    realname: string;
    location: string;
  };
  description: {
    _content: string;
    parsedContent : string;
  };
  dateTaken: string;
  tags: string;
}

export interface FlickrSearchResult {
  photos: {
    photo: FlickrPhoto[];
  };
}

export interface FlickrSearchParams {
  keyword: string;
  minUploadDate?: string;
  maxUploadDate?: string;
  sort?: string;
  nsfw?: boolean;
  tags?: string;
  inGallery?: boolean;
}

export interface FlickrPhotoSize {
  label: string;
  width: number;
  height: number;
  source: string;
  url: string;
}

export interface FlickrPhotoSizesResult {
  sizes: {
    size: FlickrPhotoSize[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class FlickrService {
  previousKeyword: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 20;

  constructor(private http: HttpClient) { }

  searchKeyword(params: FlickrSearchParams) {
    let queryParams = `api_key=${environment.flickr.key}&format=json&nojsoncallback=1&per_page=102&text=${params.keyword}`;

    if (params.minUploadDate) queryParams += `&min_upload_date=${params.minUploadDate}`;
    if (params.maxUploadDate) queryParams += `&max_upload_date=${params.maxUploadDate}`;
    if (params.sort) queryParams += `&sort=${params.sort}`;
    if (params.nsfw !== undefined) queryParams += `&safe_search=${params.nsfw ? 1 : 3}`;
    if (params.tags) queryParams += `&tags=${params.tags}`;
    if (params.inGallery !== undefined) queryParams += `&in_gallery=${params.inGallery ? 1 : 0}`;

    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&${queryParams}`;
    return this.http.get<FlickrSearchResult>(url + queryParams).pipe(
      map((res: FlickrSearchResult) => {
        return res.photos.photo.map((photo: FlickrPhoto) => {
          return {
            id : photo.id,
            url: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
            title: photo.title
          };
        });
      })
    );
  }


  parseDescription(description: string): string {
    const urlRegex = /(?:https?|ftp):\/\/[^\s/$.?#].[^\s"]*(?![^<]*>)/g;
    return description.replace(urlRegex, (url) => `<a href="${url}" target="_blank">${url}</a>`);
  }

  getPhotoInfo(photoId: string) {
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${environment.flickr.key}&photo_id=${photoId}&format=json&nojsoncallback=1`;

    return this.http.get<FlickrPhotoInfo>(url).pipe(
      map((res: any) => {
        const parsedDescription = this.parseDescription(res.photo.description._content);
        return {
          id: res.photo.id,
          secret: res.photo.secret,
          server: res.photo.server,
          title: res.photo.title,
          owner: {
            nsid: res.photo.owner.nsid,
            username: res.photo.owner.username,
            realname: res.photo.owner.realname,
            location: res.photo.owner.location
          },
          description: {
            _content: res.photo.description._content,
            parsedContent: parsedDescription
          },
          dateTaken: res.photo.dates.taken,
          tags: res.photo.tags.tag.map((tag: any) => tag.raw).join(', ')
        };
      })
    );
  }

  getSizes(photoId: string) {
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${environment.flickr.key}&photo_id=${photoId}&format=json&nojsoncallback=1`;
    return this.http.get<FlickrPhotoSizesResult>(url).pipe(
      map((res: any) => res.sizes.size)
    );
  }

}
