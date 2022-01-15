import axios from "axios";

const BASER_URL = process.env.REACT_APP_SERVER_URL;

const instance = axios.create({
  baseURL: `${BASER_URL}/api/products` || "",
});

const list = (access_token: string) => {
  return instance.get("/", {
    headers: {
      Authorization: `bearer ${access_token}`,
    },
  });
};


const remove = (access_token: string, id: string) => {
  return instance.delete(`/${id}`, {
    headers: {
      Authorization: `bearer ${access_token}`,
    },
  });
};

export {
  list,remove
}
