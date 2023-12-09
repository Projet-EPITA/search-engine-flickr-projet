import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { FlickrService } from './services/flickr.service';
import { ImageDetailsComponent } from './components/image-details/image-details.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    ImageDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [FlickrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
