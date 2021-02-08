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

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

export default fetcher;
