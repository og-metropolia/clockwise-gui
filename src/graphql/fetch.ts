const GRAPHQL_URL = import.meta.env.VITE_GRAPHQL_URL;

const fetchGraphql = async (
  query: string,
  variables: object,
  token?: string,
  url?: string,
) => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url ?? GRAPHQL_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  if (!response.ok) throw new Error(response.statusText);
  const json = await response.json();

  return json.data;
};

export { fetchGraphql };
