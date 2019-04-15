import {Component, ElementRef, Input, OnChanges} from '@angular/core';
import {SvgIconLoader} from './svg-icon.loader';

const extractSymbol = (svg, name, svgClass) => {
  return svg.split('<symbol')
    .filter((def: string) => def.includes('id="' + name + '"'))
    .map((def) => def.split('</symbol>')[0])
    .map((def) => def.includes('<title>') && def.includes('</title>') ? def.split('<title>')[0] + def.split('</title>')[1] : def)
    .map((def) => '<svg class="' + svgClass + '" ' + def + '</svg>');
};

@Component({
  selector: '[svgIcon]',
  template: ''
})

export class SvgIconComponent implements OnChanges {
  @Input() svgIcon: string;
  @Input() svgClass: string;
  @Input() svgSrc: string;

  constructor (
    private element: ElementRef,
    private svgIconLoader: SvgIconLoader
  ) {}

  ngOnChanges (values) {
    if (values.svgIcon.currentValue) {
      // The resource url of the svg
      const src  = this.svgSrc ? this.svgSrc : this.svgIconLoader.defaultSvgSrc;
      // The id of the symbol definition
      const name = this.svgIcon;
      const svgClass = this.svgClass;

      this.svgIconLoader.getSvg(src).subscribe(svg => {
          this.element.nativeElement.innerHTML = extractSymbol(svg, name, svgClass);
        });
      }
  }}
