// @ts-ignore
export const fetcher = (args) => fetch(...args).then((res) => res.json());

export const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api`;

export const getAPIUrl = (path: string): string => `${apiUrl}${path}`;
export const getUrl = (path: string): string =>
  `${process.env.NEXT_PUBLIC_BASE_URL}${path}`;
