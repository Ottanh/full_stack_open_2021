import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const request = axios.get(baseUrl);
  const response = await request;
  return response.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const addComment = async (commentObj, id) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, commentObj);
  console.log(response.data);
  return response.data;
};

const update = async (newObject, id) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject);
  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  let url = `${baseUrl}/${id}`;
  await axios.delete(url, config);
};

export default { getAll, create, setToken, update, deleteBlog, addComment };
