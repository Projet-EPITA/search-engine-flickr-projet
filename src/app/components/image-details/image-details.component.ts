import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlickrService, FlickrPhotoInfo, FlickrPhotoSize } from 'src/app/services/flickr.service';

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.css']
})
export class ImageDetailsComponent implements OnInit {
  photoInfo: FlickrPhotoInfo | null = null;
  photoSizes: FlickrPhotoSize[] | null = null;
  selectedSize: FlickrPhotoSize | null = null;
  originalSize: FlickrPhotoSize | null = null;

  constructor(
    private route: ActivatedRoute,
    private flickrService: FlickrService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log("Params received:", params);
      const photoId = params['id']; 
      console.log("ID photo is ", photoId); 
      this.fetchPhotoInfo(photoId);
      this.fetchPhotoInfo(photoId);
      this.fetchPhotoSizes(photoId);
    });
  }

  fetchPhotoInfo(photoId: string) {
    this.flickrService.getPhotoInfo(photoId)
      .subscribe(
        (data: FlickrPhotoInfo) => {
          this.photoInfo = data; 
          console.log("all datas : ", this.photoInfo)
          console.log("what is the title :", this.photoInfo.title._content);
        
        },
        (error) => {
          console.error('Error fetching photo information:', error);
        }
      );
  }

  fetchPhotoSizes(photoId: string) {
    this.flickrService.getSizes(photoId).subscribe(
      (sizes: FlickrPhotoSize[]) => {
        this.photoSizes = sizes;
        this.originalSize = sizes.find(size => size.label === 'Original') ?? null;
      },
      error => {
        console.error('Error fetching photo sizes:', error);
      }
    );
  }
}
