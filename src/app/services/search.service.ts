/* eslint-disable  @typescript-eslint/no-explicit-any */
// src/app/services/search.service.ts

import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private keyword: string = '';
  private images: any[] = [];

  setKeyword(keyword: string) {
    this.keyword = keyword;
  }

  getKeyword(): string {
    return this.keyword;
  }

  setImages(images: any[]) {
    this.images = images;
  }

  getImages(): any[] {
    return this.images;
  }
}
