/**
 * wrapper for croppie
 * @packageDocumentation
 */

import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import Croppie, { CroppieOptions, ResultOptions, CropData } from 'croppie';

@Component({
  selector: 'ngx-super-croppie',
  templateUrl: './ngx-super-croppie.component.html',
  styleUrls: ['./ngx-super-croppie.component.css'],
})
export class NgxSuperCroppieComponent implements OnInit {
  /**
   * reference to croppie div
   */
  @ViewChild('croppie', { static: true }) croppie: ElementRef;

  /**
   * croppie options. See:
   * https://foliotek.github.io/Croppie/
   */
  @Input() croppieOptions: CroppieOptions;

  /**
   * URL to image
   */
  private _url: string;
  get url(): string {
    return this._url;
  }

  @Input() set url(url: string) {
    if (this._url === url) {
      return;
    }

    this._url = url;

    if (this._croppie) {
      this.bind();
    }
  }

  /**
   * Array of points that translate into [topLeftX, topLeftY, bottomRightX, bottomRightY]
   */
  @Input() points: number[] = null;

  /**
   * Custom orientation, applied after exif orientation (if enabled).
   * Only works with enableOrientation option enabled (see 'Options').
   *
   * Valid options are:
   * 1 unchanged
   * 2 flipped horizontally
   * 3 rotated 180 degrees
   * 4 flipped vertically
   * 5 flipped horizontally, then rotated left by 90 degrees
   * 6 rotated clockwise by 90 degrees
   * 7 flipped horizontally, then rotated right by 90 degrees
   * 8 rotated counter-clockwise by 90 degrees
   */
  @Input() orientation: number = null;

  /**
   * Apply zoom after image has been bound
   */
  @Input() zoom = 0;

  /**
   * Options for result. See:
   * https://foliotek.github.io/Croppie/
   */
  @Input() resultOptions: ResultOptions;

  /**
   * event emitted to parent
   */
  @Output() result: EventEmitter<
    string | HTMLElement | Blob | HTMLCanvasElement
  > = new EventEmitter<string | HTMLElement | Blob | HTMLCanvasElement>();

  /**
   * croppie object
   */
  private _croppie: Croppie;

  /**
   * init cropper
   */
  ngOnInit(): void {
    this._croppie = new Croppie(
      this.croppie.nativeElement,
      this.croppieOptions,
    );

    this.bind();
  }

  /**
   * get crop data
   * @returns crop points, and the zoom of the image.
   */
  public get(): CropData {
    return this._croppie.get();
  }

  /**
   * Bind an image to the croppie.
   * Returns a promise to be resolved when the image has been loaded
   * and the croppie has been initialized.
   */
  private async bind(): Promise<void> {
    await this._croppie.bind({
      url: this.url,
      points: this.points,
      orientation: this.orientation,
      zoom: this.zoom,
    });
  }

  /**
   * Destroy a croppie instance and remove it from the DOM
   */
  public destroy(): void {
    this._croppie.destroy();
  }

  /**
   * emits croppie result to parent
   */
  public async croppieResult(): Promise<void> {
    const result = await this._croppie.result(this.resultOptions);
    this.result.emit(result);
  }

  /**
   * Rotate the image by a specified degree amount.
   * Only works with enableOrientation option enabled (see 'Options')
   * @param degrees degrees of rotation
   */
  public rotate(degrees: 90 | 180 | 270 | -90 | -180 | -270): void {
    this._croppie.rotate(degrees);
  }

  /**
   * Set the zoom of a Croppie instance. The value passed in is
   * still restricted to the min/max set by Croppie.
   * @param zoom zoom value
   */
  public setZoom(zoom: number): void {
    this._croppie.setZoom(zoom);
  }
}
