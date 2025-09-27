import Odoo from "../core/odoo";

export default class useCountry extends Odoo {
  constructor(HTTP) {
    super(HTTP, "res.country");
  }
}
