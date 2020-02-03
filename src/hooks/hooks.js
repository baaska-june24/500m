import React from "react";
import axios from "axios";

//Нүүр хуудасны контентуудыг авчрах
export const frontPage = () => {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState();

  const refetch = (lendcode, location) => {
    setLoading(true);
    axios
      .get(
        process.env.BACKEND_ENDPOINT +
          "/products/front_page?" +
          "latitude=" +
          location.latitude +
          "&" +
          "longitude=" +
          location.longitude +
          // "latitude=47.9096785&longitude=106.8965714" +
          "&code=" +
          lendcode
      )
      .then(async res => {
        if (res.data.code === 0) {
          setData(res.data.response);
          setLoading(false);
        } else {
          console.log(res);
          setLoading(false);
        }
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  };
  return { data, refetch, loading };
};

//Хэрэглэгчийн мэдээллийг авчрах
export const getUser = userId => {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState();
  const refetch = async () => {
    axios
      .get(process.env.BACKEND_ENDPOINT + "/users/" + userId)
      .then(res => {
        res.data.code === 0 && setData(res.data.response);
      })
      .catch(error => {
        console.log("USER-API-ERR:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  React.useEffect(() => {
    refetch();
  }, [userId]);
  return [data, loading, refetch];
};

// Хэрэглэгчийн хаяг нэмэх
export const addUserAddress = () => {
  const [loading, setLoading] = React.useState(false);

  const insertAddress = async (userId, address) => {
    setLoading(true);
    const response = await axios
      .post(
        process.env.BACKEND_ENDPOINT + "/users/" + userId + "/add_address",
        address
      )
      .catch(err => console.log(err));
    if (response && response.data && response.data.code === 0) {
      setLoading(false);
      return response.data.response;
    }
  };
  return [insertAddress, loading];
};

export const removeAddressFromUser = () => {
  const [loading, setLoading] = React.useState(false);
  const removeAddress = async (userId, addressId) => {
    setLoading(true);
    const response = await axios
      .post(
        process.env.BACKEND_ENDPOINT + "/users/" + userId + "/remove_address",
        addressId
      )
      .catch(err => console.log(err));
    if (response && response.data && response.data.code === 0) {
      return response.data.response;
    }
  };
  return [removeAddress, loading];
};

// Сагсан дахь бүтээгдхүүний мэдээллийг авчрах
export const getBasket = userId => {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState();

  const refetch = () => {
    setLoading(true);
    axios
      .get(process.env.BACKEND_ENDPOINT + "/user/" + userId + "/cart")
      .then(res => {
        if (res.data.code === 0) {
          setData(res.data.response.response);
        }
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  React.useEffect(() => {
    refetch();
  }, [userId]);

  return [data, refetch, loading];
};

// Сагсанд бүтээгдхүүн нэмэх
export const addToBasket = () => {
  const [result, setResult] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const insert = (userId, item) => {
    setLoading(true);
    axios
      .post(
        process.env.BACKEND_ENDPOINT + "/carts/" + userId + "/add_product",
        item
      )
      .then(res => {
        res.data.code === 0 && setResult(res.data.response);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return { insert, loading };
};

// Сагснаас бүтээгдхүүн устгах
export const removeFromBasket = () => {
  const [loading, setLoading] = React.useState(false);

  const remove = (userId, item) => {
    setLoading(true);
    axios
      .post(
        process.env.BACKEND_ENDPOINT + "/carts/" + userId + "/remove_product",
        item
      )
      .then(res => {
        res.data.code === 0 && console.log(res.data.response);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  };
  return { remove, loading };
};

// invoice үүсгэх
export const createInvoice = () => {
  const [loading, setLoading] = React.useState(false);

  const invoice = async userId => {
    setLoading(true);
    const response = await axios.post(
      process.env.BACKEND_ENDPOINT + "/carts/" + userId + "/checkout"
    );
    if (response && response.data && response.data.code === 0) {
      setLoading(false);
      return response.data.response;
    }
  };

  return [loading, invoice];
};

// Төлбөр төлөх
export const payInvoice = () => {
  const [loading, setLoading] = React.useState(false);

  const payWithLend = async (invoiceId, payment) => {
    setLoading(true);
    const response = await axios
      .post(
        process.env.BACKEND_ENDPOINT + "/invoices/" + invoiceId + "/pay",
        payment
      )
      .catch(err => {
        setLoading(false);
        alert("ERR: " + JSON.stringify(err));
      });
    if (response && response.data && response.data.code === 0) {
      setLoading(false);
      return response.data.response;
    }
  };

  return [loading, payWithLend];
};

// restaurant
export const getRestaurant = OrganizationId => {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState();
  const [error, setError] = React.useState();
  React.useEffect(() => {
    axios
      .get(
        process.env.BACKEND_ENDPOINT +
          "/restaurants/detail?organization=" +
          OrganizationId
      )
      .then(res => {
        res.data.code === 0 && setData(res.data.response);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [OrganizationId]);
  return { data, loading, error };
};
