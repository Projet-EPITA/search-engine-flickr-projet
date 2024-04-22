import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDetailsComponent } from './image-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('ImageDetailsComponent', () => {
  let component: ImageDetailsComponent;
  let fixture: ComponentFixture<ImageDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageDetailsComponent],
      imports: [
        RouterTestingModule,
        HttpClientModule
      ]
    });
    fixture = TestBed.createComponent(ImageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize properties correctly', () => {
    expect(component.photoInfo).toBeNull();
    expect(component.photoSizes).toBeNull();
    expect(component.selectedSize).toBeNull();
    expect(component.originalSize).toBeNull();
  });
});
