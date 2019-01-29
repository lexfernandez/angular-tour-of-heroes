import { Hero } from './hero';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {

  createDb() {
    const heroes: Hero[] = [
      { id: 1, name: 'Gilber Fernandez' },
      { id: 2, name: 'Diana Lorenzo' },
      { id: 3, name: 'Alex Fernandez' },
      { id: 4, name: 'Isis Guzman' },
      { id: 5, name: 'Santiago Fernandez Guzman' },
      { id: 6, name: 'Mr. Nice' },
      { id: 7, name: 'Narco' },
      { id: 8, name: 'Bombasto' },
      { id: 9, name: 'Celeritas' },
      { id: 10, name: 'Magneta' },
      { id: 11, name: 'RubberMan' },
      { id: 12, name: 'Dynama' },
      { id: 13, name: 'Dr IQ' },
      { id: 14, name: 'Magma' },
      { id: 15, name: 'Tornado' }
    ];

    return { heroes };
  }

  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 1;
  }

}
