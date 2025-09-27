import Model from "../core/model";

export default class Auth extends Model {
  constructor(HTTP) {
    super(HTTP);
    this.endpoint = "/api/v2/auth/";
  }

  login(db_name, username, password) {
    return this.http.post(this.endpoint + "login", {
      jsonrpc: "2.0",
      params: {
        args: [{ db_name: db_name, username: username, password: password }],
        kwargs: {},
      },
    });
  }

  logout() {
    return this.http.post(this.endpoint + "logout", {
      jsonrpc: "2.0",
      params: {},
    });
  }

  http_login(db_name, username, password, endpoint_override = undefined) {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("db_name", db_name);
    const endpoint = endpoint_override || this.endpoint + "http_login";
    return this.http({
      method: "post",
      url: endpoint,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  getSession() {
    return this.http.post(this.endpoint + "get_session", {
      jsonrpc: "2.0",
      params: {},
    });
  }
}
