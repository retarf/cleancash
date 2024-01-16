export const findItemById = (list, id) => list.find((obj) => obj.id === id);
export const findNameById = (list, id) =>
  list.find((obj) => obj.id === id).name;

export const findValueById = (list, id) =>
  list.find((obj) => obj.id === id).value;

export const findIdByName = (list, name) =>
    list.find((obj) => obj.name === name).id;
