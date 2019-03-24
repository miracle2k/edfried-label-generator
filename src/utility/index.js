export const id = (x) => x;

export const shrinkString = (s, l0 = 4, l1 = 3) => {
  return s.length < l0 + 3 + l1 ? s : s.slice(0, l0) + '...' + s.slice(-l1);
};

export const createReducer = (handlers, initial) => (prev = initial, action) => {
  const handler = handlers[action.type];
  return handler ? handler(prev, action) : prev;
};

export const log = (...args) => {
  // console.log(...args);
};

export const last = (xs) => xs[xs.length - 1];

export const orderBy = (xs, f = id) => {
  return xs.sort((x0, x1) => f(x0) - f(x1));
};