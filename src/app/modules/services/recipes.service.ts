import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_GET_RECIPES } from '../../environment';
import { Recipe } from '../interfaces/recipe.interface';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private http = inject(HttpClient);

  getAllRecipes() {
    return this.http.get<{ recipes: Recipe[] }>(API_GET_RECIPES).pipe(
      tap((data) => console.log(data.recipes)),
      map((data) => data.recipes)
    );
  }
}
