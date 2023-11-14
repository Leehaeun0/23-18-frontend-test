const encodeBase64 = (params: unknown) => {
  return btoa(JSON.stringify(params));
};

export default encodeBase64;
