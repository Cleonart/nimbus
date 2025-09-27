import Odoo from "../core/odoo";

export default class useUsers extends Odoo {
  constructor(HTTP) {
    super(HTTP, "users.pic");
  }
}
