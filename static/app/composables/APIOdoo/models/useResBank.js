import Odoo from "../core/odoo";

export default class useResBank extends Odoo {
  constructor(HTTP) {
    super(HTTP, "res.bank");
  }
}
