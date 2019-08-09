function composeBurger(burger, { ingredients, buns, meats, sauces }) {
  return {
    ...burger,
    ingredients: burger.ingredients.map(id => ({
      state: true,
      info: ingredients[id]
    })),
    bun_type: { state: true, info: buns[burger.bun_type] },
    meat_type: { state: true, info: meats[burger.meat_type] },
    sauce_type: { state: true, info: sauces[burger.sauce_type] }
  };
}

export default composeBurger;
