import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';

export class BasketService {
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Mint leaves', 7)
      ];

    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredient(index: number) {
        return this.ingredients[index];
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        // for (let ingredients of ingredients){
        //    this.addIngredients(ingredient);
        // } ovo bi bio ok , validan metod, ali se postavlja pitanje , da li je optimalan kada aplikacija ima puno recepta i stavki
        // tada cemo emitovati puno eventova na ovaj nacin, i zato cemo odraditi loop na drugi nacin

        this.ingredients.push(...ingredients);
        // tri tacke je novi es6 metod koji se zove "spread operator", koji nam omogucava da array elemenata pretvorimo u listu elemenata
        // push moze da radi sa vise elemenata, ali ako mu prosledimo array, on ce je prebaciti kao objekat u drugi array
        // znaci tri tacke nam prosledjuju pojedinacne elemente arraya, koje nakon toga moramo da sacuvamo, i da prosledimo event
        // slice nam sluzi da dobijemo uvek kopiju ingredientsa, a ne original
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}
