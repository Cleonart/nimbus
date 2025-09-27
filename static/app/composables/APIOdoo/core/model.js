import config from "../config";

export default class Model {
  constructor(HTTP, modelName, endpoint = undefined) {
    this.http = HTTP;
    this.baseURL = HTTP.defaults.baseURL;

    // Generate the endpoint if the endpoint is not set
    if (!endpoint) {
      this.endpoint = [config.endpoint, modelName].join("/");
    }
  }

  exec_post(method = undefined, payload = {}, timeout = 5000) {
    if ([undefined, "", null].includes(method)) {
      throw new Error("Endpoint is required!");
    }

    // Remake the endpoint by join it with (/)
    const endpoint = [this.endpoint, method].join("/");

    // Return the axios instance
    return this.http.post(endpoint, payload, { timeout: timeout });
  }

  exec_raw(
    endpoint = undefined,
    payload = {},
    timeout = 5000,
    custom_headers = {},
  ) {
    if ([undefined, "", null].includes(endpoint)) {
      throw new Error("Endpoint is required!");
    }

    // Remake the endpoint by join it with (/)
    const finalEndpoint = [this.baseURL, endpoint].join("/");

    // Return the axios instance
    return this.http.post(finalEndpoint, payload, {
      timeout: timeout,
      headers: {
        ...this.http.defaults.headers,
        ...custom_headers,
      },
    });
  }
}
