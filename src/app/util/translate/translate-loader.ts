import {Injectable} from '@angular/core';
import {TranslateLoader} from '@ngx-translate/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AppTranslateLoader implements TranslateLoader  {

  constructor(private http: HttpClient) {

  }
  getTranslation(lang: string): Observable<any> {
    const remoteClassifiersApi = '/api/classifiers';
    const localLabelsFile = '/assets/i18n/et_label.json';
    let remoteClassifiers = {};
    let localLabels = {};
    let localClassifiers = {};
    return Observable.create(observer => {
      this.http.get(remoteClassifiersApi).subscribe((remoteResponse: Response) => {
          remoteClassifiers = remoteResponse;
          this.http.get(localLabelsFile).subscribe((labelsResponse: Response) => {
            localLabels = labelsResponse;
            localClassifiers['classifiers'] = remoteClassifiers;
            observer.next(Object.assign(localLabels, localClassifiers));
            observer.complete();

          });
        },
        error => {
          //  failed to retrieve from api, switch to local
          this.http.get(localLabelsFile).subscribe((labelsResponse) => {
            localLabels = labelsResponse;
            observer.next(Object.assign(localLabels));
            observer.complete();
          });
        }
      );
    });
  }
}
