import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  inject,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Recipe } from '../../interfaces/recipe.interface';
import { RecipeProviderService } from '../../services/providers/recipe-provider';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-recipes-page',
  imports: [NgClass],
  templateUrl: './recipes-page.component.html',
  styleUrl: './recipes-page.component.css',
})
export class RecipesPageComponent implements OnDestroy {
  private recipeProvider = inject(RecipeProviderService);
  private destroy$ = new Subject<void>();
  recipes: Recipe[] = [];

  getDifficultyClass(difficulty: string): string {
    if (difficulty === 'Easy') {
      return 'easy';
    } else if (difficulty === 'Medium') {
      return 'medium';
    } else if (difficulty === 'Hard') {
      return 'hard';
    } else {
      return '';
    }
  }

  ngOnInit() {
    this.recipeProvider.init();
    this.recipeProvider.recipe$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.recipes = data || [];
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

export default RecipesPageComponent;
