import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlickrService, FlickrPhotoInfo } from 'src/app/services/flickr.service';

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.css']
})
export class ImageDetailsComponent implements OnInit {
  photoInfo: FlickrPhotoInfo | null = null;

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
    });
    
  }

  fetchPhotoInfo(photoId: string) {
    this.flickrService.getPhotoInfo(photoId)
      .subscribe(
        (data: FlickrPhotoInfo) => {
          this.photoInfo = data; 
          console.log("what is the title :", this.photoInfo.title._content);
        
        },
        (error) => {
          console.error('Error fetching photo information:', error);
        }
      );
  }
}
