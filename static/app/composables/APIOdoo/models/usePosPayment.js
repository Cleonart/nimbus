import Odoo from "../core/odoo";

export default class useAccountPOSPayment extends Odoo {
  constructor(HTTP) {
    super(HTTP, "account.pos.payment");
  }
}
