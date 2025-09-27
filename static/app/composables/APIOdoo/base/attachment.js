import Prisma from "../core/odoo";

export default class Attachment extends Prisma {
  constructor(HTTP) {
    super(HTTP, "attachment");
  }

  download(filename) {
    const url = [this.baseURL, "attachment", "download", filename].join("/");
    return this.http.get(url);
  }

  redirect(filename) {
    return [this.baseURL, "attachment", "download", filename].join("/");
  }
}
