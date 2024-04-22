import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FlickrService, FlickrSearchParams } from './flickr.service';
import { environment } from 'src/app/environment';

describe('FlickrService', () => {
  let service: FlickrService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FlickrService]
    });
    service = TestBed.inject(FlickrService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should search for photos', () => {
    const keyword = 'test';
    const defaultMinUploadDate = '';
    const defaultMaxUploadDate = '';
    const defaultSort = '';
    const defaultNsfw = false;
    const defaultTags = '';
    const defaultInGallery = false;

    const searchParams: FlickrSearchParams = {
      keyword,
      minUploadDate: defaultMinUploadDate,
      maxUploadDate: defaultMaxUploadDate,
      sort: defaultSort,
      nsfw: defaultNsfw,
      tags: defaultTags,
      inGallery: defaultInGallery,
    };

    const mockResponse = {
      photos: {
        photo: [{ id: '1', title: { _content: 'Test Photo' } }]
      }
    };

    service.searchKeyword(searchParams).subscribe(photos => {
      expect(photos.length).toBe(1);
      expect(photos[0].id).toBe('1');
      expect(photos[0].title._content).toBe('Test Photo');
    });

    const req = httpMock.expectOne(
      request => request.url.includes(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${environment.flickr.key}&format=json&nojsoncallback=1&per_page=102&text=${keyword}`)
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });


  it('should handle errors during search', () => {
    const keyword = 'test';
    const defaultMinUploadDate = '';
    const defaultMaxUploadDate = '';
    const defaultSort = '';
    const defaultNsfw = false;
    const defaultTags = '';
    const defaultInGallery = false;

    const searchParams: FlickrSearchParams = {
      keyword,
      minUploadDate: defaultMinUploadDate,
      maxUploadDate: defaultMaxUploadDate,
      sort: defaultSort,
      nsfw: defaultNsfw,
      tags: defaultTags,
      inGallery: defaultInGallery,
    };

    service.searchKeyword(searchParams).subscribe(
      () => fail('Expected error, but got success'),
      error => expect(error).toBeTruthy()
    );

    const req = httpMock.expectOne(
      request => request.url.includes(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${environment.flickr.key}&format=json&nojsoncallback=1&per_page=102&text=${keyword}`)
    );
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Test error'));
  });

});
