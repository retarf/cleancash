import axios from "axios";

export const baseURL = `${process.env.REACT_APP_BASE_URL}`;

// TODO: Client -> client
// TODO: axios -> axios.create
const Client = (method, url, data = "", headers = {}) => {
  return axios({
    method: method,
    baseURL: baseURL,
    url: url,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    data: data,
  });
};

const Request = (url) => {
  const list = async () => await Client("get", `${url}`);
  const get = async (id) => await Client("get", `${url}${id}/`);
  const post = async (data) => await Client("post", `${url}`, data);
  const patch = async (data) =>
    await Client("patch", `${url}${data.id}/`, data);
  const del = async (id) => await Client("delete", `${url}${id}`);

  return {
    list,
    get,
    post,
    patch,
    del,
  };
};

export default Request;
