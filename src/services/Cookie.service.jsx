const Cookie = () => {
  const setCookie = (token) => {
    document.cookie = `token=${token}; expires=${new Date(
      Date.now() + 3600000
    ).toUTCString()}; path=/`;
  };

  const getCookie = () => {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === "token") {
        return value;
      }
    }
    return null;
  };

  const remove = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  return {
    setCookie,
    getCookie,
    remove,
  };
};
export default Cookie;
