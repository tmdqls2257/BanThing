export const SELECT_TO_CHICKEN = 'SELECT_TO_CHICKEN';
export const SELECT_TO_HAMBURGER = 'SELECT_TO_HAMBURGER';
export const SELECT_TO_PIZZA = 'SELECT_TO_PIZZA';

export const selectToChicken = (value: string) => {
  return {
    type: SELECT_TO_CHICKEN,
    payload: {
      value,
    },
  };
};
export const selectToHamburger = (value: string) => {
  return {
    type: SELECT_TO_CHICKEN,
    payload: {
      value,
    },
  };
};
export const selectToPizza = (value: string) => {
  return {
    type: SELECT_TO_CHICKEN,
    payload: {
      value,
    },
  };
};
