const fetchBreedList = async ({ querykey }) => {
  const animal = querykey[1];
  if (!animal) return [];

  const apiRes = await fetch(
    `https://pets-v2.dev-apis.com/breeds?animal=${animal}`
  );

  if (!apiRes.ok) {
    throw new Error(`breeds/${animal} fetch not ok`);
  }
  return apiRes.json();
};
export default fetchBreedList;
