import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Recipe } from '../../interfaces/recipe.interface';
import { RecipesService } from '../recipes.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeProviderService {
  private recipesSubject = new BehaviorSubject<Recipe[]>([]);
  recipe$ = this.recipesSubject.asObservable();
  private storageKey = 'recipes';

  private recipesService = inject(RecipesService);

  init() {
    const local = localStorage.getItem(this.storageKey);
    if (local) {
      this.recipesSubject.next(JSON.parse(local));
    } else {
      this.recipesService.getAllRecipes().subscribe((recipes) => {
        this.recipesSubject.next(recipes);
        localStorage.setItem(this.storageKey, JSON.stringify(recipes));
      });
    }
  }

  setRecipes(recipes: Recipe[]) {
    this.recipesSubject.next(recipes);
    localStorage.setItem(this.storageKey, JSON.stringify(recipes));
  }

  clear() {
    this.recipesSubject.next([]);
    localStorage.removeItem(this.storageKey);
  }
}
