export const findItemById = (list, id) => list.find((obj) => obj.id === id);
export const findNameById = (list, id) =>
  list.find((obj) => obj.id === id).name;
