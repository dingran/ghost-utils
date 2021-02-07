const fetcher = async (url, token) => {
  const res = await fetch(url, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${token}`, //this is proper but harder to parse
      token,
    }),
    credentials: 'same-origin',
  });

  return res.json();
};

export default fetcher;
