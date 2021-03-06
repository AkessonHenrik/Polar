import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from './../environments/environment';
@Injectable()
export class ApiService {

  constructor(private http: Http) { }
  /**
    * Handles error responses
    * @param { Reponse | any } error: Error response sent by server
    * @return { Promise } Promisified error message
    */
  private handleError(error: Response | any) {
    console.log(error);
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Promise.reject(errMsg);
  }

  /**
   * Extracts data from raw response
   * @param res the raw response
   * @returns {any|{}} an object containing the response's data
   */
  private extractData(res: Response): any {
    let body = res.json();
    return body || {};
  }
  /**
     * Sends a POST request to the server
     * @param options HTTP options
     * @param path API-REST path
     * @param data the data to send along the post
     * @returns {Promise<TResult|TResult>} the body response of the server
     */
  private post(options, path, data): any {
    return this.http.post(environment.server + path, JSON.stringify(data), options)
      .toPromise()
      .then(response => {
        return response;
      })
      .then(this.extractData)
      .catch(this.handleError);
  }
  private static readonly jsonHeader = new Headers({ 'Content-Type': 'application/json' });

  public register(email: String, username: String, password: String): Promise<any> {
    var options = new RequestOptions({ headers: ApiService.jsonHeader });
    var path = "users";
    var data = {
      "email": email,
      "name": username,
      "password": password
    };

    return this.post(options, path, data);
  }

  public login(username: String, password: String): Promise<any> {
    var options = new RequestOptions({ headers: ApiService.jsonHeader });
    var path = "auth";
    var data = {
      "email": username,
      "password": password
    };

    return this.post(options, path, data);
  }

  public getPolls() {
    var options = new RequestOptions({ headers: ApiService.jsonHeader });
    var path = "poll";
    return this.get(options, path);
  }

  public getPollByShortcode(shortcode) {
    var options = new RequestOptions({ headers: ApiService.jsonHeader });
    var path = "poll/" + shortcode;
    return this.get(options, path);
  }

  /**
     * Sends a GET request to the server
     * @param options HTTP options
     * @param path API-REST path
     * @returns {Promise<TResult|TResult>} the body response of the server
     */
  private get(options, path): any {
    return this.http.get(environment.server + path, options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }


  public submitParticipation(pollId, selectedAnswers) {
    var options = new RequestOptions({ headers: ApiService.jsonHeader });
    var path = "poll/" + pollId;
    var data = {
      'selectedAnswers': selectedAnswers
    }
    if (localStorage["polar_id"]) {
      data['polar_id'] = localStorage["polar_id"];
    }
    console.log(data)
    return this.patch(options, path, data);
  }

  public patch(options, path, data): any {
    return this.http.patch(environment.server + path, JSON.stringify(data), options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  public addPoll(title, questions, submitter, keywords) {
    var options = new RequestOptions({ headers: ApiService.jsonHeader });
    var data = {
      'title': title,
      'questions': questions,
      'submitter': submitter,
      'keywords': keywords
    }
    var path = "poll/";
    return this.post(options, path, data);
  }

  public getMyPolls() {
    var options = new RequestOptions({ headers: ApiService.jsonHeader });
    var path = "users/polls/" + localStorage["polar_id"];
    return this.get(options, path)
  }
}
