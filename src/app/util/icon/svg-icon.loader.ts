import {tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

@Injectable()
export class SvgIconLoader {

  public defaultSvgSrc = '../../assets/svg/icons.svg';
  private cache: Map<string, Observable<string>> = new Map<string, Observable<string>>();


  constructor(private http: HttpClient) {
    this.getSvg(this.defaultSvgSrc).subscribe();
  }

  public getSvg(url: string): Observable<string> {
    if (this.cache.has(url)) {
      return this.cache.get(url);
    } else {
      return this.http.get(url, {responseType: 'text'}).pipe(tap((value: string) => {
        this.cache.set(url, of(value));
      }));
    }
  }
}
