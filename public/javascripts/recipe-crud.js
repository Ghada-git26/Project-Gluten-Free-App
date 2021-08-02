function addIngredient() {
    const ingredient = document.createElement('input');
    ingredient.setAttribute('type', 'text');
    ingredient.setAttribute('name', 'ingredients');
    document.getElementById('ingredients').appendChild(ingredient);
}

function removeIngredient() {
    const ingredients = document.getElementById('ingredients');
    if (ingredients.children.length > 0) {
        ingredients.removeChild(ingredients.lastChild);
    }
}