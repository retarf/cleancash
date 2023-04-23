
import Request from './client';

const create = (baseUrl, data) => {
Request("post", baseUrl, data)
  .then((response) => {
    return response.data;
  })
  .catch((error) => {
    // add exception handling
    console.log(error);
  });
};

const list = (baseUrl) => {
Request("get", baseUrl)
  .then((response) => {
    return response.data;
  })
  .catch((error) => {
    console.log(error);
  });
}

const get = (baseUrl, id) => {
    let url = baseUrl + "/" + id;
    Request("get", url)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
};

const update = (baseUrl, id, data) => {
    let url = baseUrl + "/" + id;
    Request("patch", url)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
      };

export { create, list, get, update };