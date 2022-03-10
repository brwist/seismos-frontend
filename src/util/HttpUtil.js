const authHttpHeaders = {
  headers: {
    "Access-Control-Allow-Origin": "http://localhost:3000",
  },
};

const adminHttpHeaders = () => {
  const accessString = localStorage.getItem("JWT") ? localStorage.getItem("JWT") : "";
  return {
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      Authorization: `Bearer ${accessString}`,
    },
    response: true,
    withCredentials: true,
  };
};

const HttpUtil = {
  authHttpHeaders,
  adminHttpHeaders,
};

export default HttpUtil;
