import Odoo from "../core/odoo";

export default class useState extends Odoo {
  constructor(HTTP) {
    super(HTTP, "res.country.state");
  }
}
