const fetcher = async (url, token) => {
  console.log(token);
  const res = await fetch(url, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      token,
    }),
    credentials: 'same-origin',
  });

  return res.json();
};

export default fetcher;
