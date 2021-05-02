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
