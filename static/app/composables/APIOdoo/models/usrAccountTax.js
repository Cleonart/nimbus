import Odoo from "../core/odoo";

export default class useAccountTax extends Odoo {
  constructor(HTTP) {
    super(HTTP, "account.tax");
  }
}
