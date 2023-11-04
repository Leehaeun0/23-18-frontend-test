const decodeBase64 = (str: string) => {
  return JSON.parse(atob(str)) as unknown;
};

export default decodeBase64;
