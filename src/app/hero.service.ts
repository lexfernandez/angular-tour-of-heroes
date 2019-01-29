import { MessageService } from './message.service';
import { Hero } from './hero';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  
  private heroesUrl = 'api/heroes';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  searchHero(term: string): Observable<Hero[]>{
    if(!term.trim()) return of([]);

    const url = `${this.heroesUrl}/?name=${term}`;
    return this.http.get<Hero[]>(url).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>("searchHeroes", []))
    )
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post(this.heroesUrl, hero,httpOptions).pipe(
      tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
      catchError(this.handleError<Hero>("addHero"))
    );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`),
        catchError(this.handleError<any>(`updateHero id=${hero.id}`)))
    )
  }

  deleteHero(hero: Hero):Observable<Hero>{
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http.delete<Hero>(url,httpOptions).pipe(
      tap(_=>this.log(`deleted hero id=${hero.id}`)),
      catchError(this.handleError<Hero>(`deleteHero id=${hero.id}`))
    )
  }

  getHeroes(): Observable<Hero[]> {

    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    )
  }

  private log(message: string) {
    this.messageService.add(message)
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
