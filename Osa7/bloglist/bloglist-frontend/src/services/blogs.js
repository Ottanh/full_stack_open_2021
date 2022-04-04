import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (newObject, id) => {
  let url = `${baseUrl}/${id}`;
  const response = await axios.put(url, newObject);
  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  let url = `${baseUrl}/${id}`;
  await axios.delete(url, config);
};

export default { getAll, create, setToken, update, deleteBlog };