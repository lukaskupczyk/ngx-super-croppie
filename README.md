# NgxSuperCroppie

NgxSuperCroppie is a simple angular8+ wrapper for [croppie](https://github.com/foliotek/croppie).

## Version

The version numbers are in line with major Angular versions:

| Angular Version | ngx-super-croppie Version |
| --------------- | ------------------------- |
| 10.x.x          | 10.x.x                    |
| 11.x.x          | 11.x.x                    |
| 12.x.x          | 12.x.x                    |
| 13.x.x          | 13.x.x                    |
| 14.x.x          | 14.x.x                    |
| 15.x.x          | 15.x.x                    |
| 16.x.x          | 16.x.x                    |
| 17.x.x          | 17.x.x                    |
| 18.x.x          | 18.x.x                    |

## Installation

Install the package and croppie with yarn:

```bash
yarn add ngx-super-croppie croppie @types/croppie
```

or with npm:

```bash
npm install ngx-super-croppie croppie @types/croppie
```

## Usage

### 1. Import ngx-super-croppie in your src/app/app.module.ts

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxSuperCroppieModule } from 'ngx-super-croppie';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxSuperCroppieModule],
  providers: [NgxSuperCroppieModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

### 2. Import the croppie styles in your src/styles.scss

```css
/* You can add global styles to this file, and also import other style files */
@import '~croppie/croppie.css';
```

### 3. Configure ngx-super-croppie in your component.ts

```typescript
import { Component, OnInit, ViewChild } from '@angular/core';
import { CroppieOptions, ResultOptions } from 'croppie';
import { NgxSuperCroppieComponent } from 'ngx-super-croppie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild('ngxSuperCroppie')
  ngxSuperCroppie: NgxSuperCroppieComponent;

  public croppieOptions: CroppieOptions = {
    boundary: { width: 220, height: 220 },
    customClass: 'my-class',
    enableExif: true,
    enableOrientation: true,
    enableZoom: true,
    enforceBoundary: true,
    enableResize: false,
    maxZoom: 1,
    minZoom: 0,
    mouseWheelZoom: true,
    showZoomer: true,
    viewport: { width: 200, height: 200, type: 'circle' },
  };

  public url: string | ArrayBuffer;

  public points: number[] = [0, 0, 200, 200];

  public orientation = 1;

  public zoom = 0;

  public resultOptions: ResultOptions = {
    type: 'base64',
    size: 'viewport',
    format: 'jpeg',
    quality: 1,
    circle: false,
  };

  public croppedImage: string | HTMLElement | Blob | HTMLCanvasElement;

  ngOnInit(): void {
    this.url = null;
  }

  public updateCroppedImage(
    crop: string | HTMLElement | Blob | HTMLCanvasElement,
  ): void {
    this.croppedImage = crop;
  }

  public handleFileInput(files: FileList): void {
    if (files.length !== 1) {
      return;
    }

    const file = files[0];

    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.url = fileReader.result;
    };

    fileReader.readAsDataURL(file);
  }

  public get(): void {
    const data = this.ngxSuperCroppie.get();
    console.log(data);
  }

  public destroy(): void {
    this.ngxSuperCroppie.destroy();
  }

  public rotate(): void {
    this.ngxSuperCroppie.rotate(90);
  }

  public setZoom(): void {
    this.ngxSuperCroppie.setZoom(0.3);
  }
}
```

### 4. Add ngx-super-croppie to your component.html

```html
<h1>NgxSuperCroppie Demo</h1>

Select image:
<input type="file" (change)="handleFileInput($event.target.files)" /><br />
<button type="button" (click)="get()">Get</button>
<button type="button" (click)="destroy()">Destroy</button>
<button type="button" (click)="rotate()">Rotate 90°</button>
<button type="button" (click)="setZoom()">Zoom 0.3</button>

<ngx-super-croppie
  *ngIf="url"
  #ngxSuperCroppie
  [croppieOptions]="croppieOptions"
  [url]="url"
  [points]="points"
  [orientation]="orientation"
  [zoom]="zoom"
  [resultOptions]="resultOptions"
  (result)="updateCroppedImage($event)"
></ngx-super-croppie>

<img
  *ngIf="croppedImage"
  [src]="croppedImage"
  alt="cropped image"
  accept="image/gif, image/jpeg, image/jpg, image/png"
  style="border: 2px solid grey"
/>
```

## Example

You can find a full example under src/app/app.component.ts in this repository.
To run the example, follow these steps:

1. Clone the repository:
   `git clone git@github.com:lukaskupczyk/ngx-super-croppie.git`

2. Install the necessary dependencies:
   `yarn` or `npm install`

3. Serve angular:
   `yarn start` or `npm run start`

4. Open the app in your browser:
   [http://localhost:4200](http://localhost:4200)

## Development

To build the module use `yarn build:package`

## Credit

ngx-super-croppie is inspired by the (unfortunately) unmaintained [ngx-croppie](https://github.com/deej81/ngx-croppie) package.
