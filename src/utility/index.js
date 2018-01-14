export const createReducer = (handlers, initial) => (prev = initial, action) => {
  const handler = handlers[action.type];
  return handler ? handler(prev, action) : prev;
};