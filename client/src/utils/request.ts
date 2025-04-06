import { toggleLoading } from "../components";

const HEADERS_OPTIONS = new Headers({
  //Define extend Header
});
const FETCH_TIMEOUT = 600000;

interface IFetchOptions extends RequestInit {
  timeout?: number;
  body?: any;
  params?: any;
}

const fetchWithTimeout = (
  url: string,
  options: IFetchOptions
): Promise<Response> => {
  const { timeout = FETCH_TIMEOUT } = options;
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error("Request timed out"));
    }, timeout);

    fetch(url, options).then(
      (response) => {
        clearTimeout(timer);
        resolve(response);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      }
    );
  });
};

const fetchClient = {
  request: async (
    method: string,
    path: string,
    options: IFetchOptions = {}
  ) => {
    let url = `${path}`;

    if (options.params) {
      const queryString = new URLSearchParams(options.params).toString();
      url = `${url}?${queryString}`;
    }

    const defaultOptions: IFetchOptions = {
      ...options,
      method,
      headers: {
        ...HEADERS_OPTIONS,
        ...options.headers,
      },
    };

    if (options.body) {
      defaultOptions.body = JSON.stringify(options.body);
    }

    try {
      toggleLoading(true);
      const response = await fetchWithTimeout(url, defaultOptions);
      if (!response.ok) {
        throw new Error(
          `HTTP Error: ${response.status} ${response.statusText}`
        );
      }

      if (response.status === 204) {
        return null; // No content
      }

      return response.json();
    } catch (error) {
      console.error("Fetch Error:", error);
      throw error;
    } finally {
      toggleLoading(false);
    }
  },

  get: (path: string, options?: any) =>
    fetchClient.request("GET", path, options),

  post: (path: string, body: any, options?: IFetchOptions) =>
    fetchClient.request("POST", path, { ...options, body }),

  put: (path: string, body?: any, options?: IFetchOptions) =>
    fetchClient.request("PUT", path, { ...options, body }),

  delete: (path: string, options?: IFetchOptions) =>
    fetchClient.request("DELETE", path, options),
};

export { fetchClient };
