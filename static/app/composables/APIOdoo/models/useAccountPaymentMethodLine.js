import Odoo from "../core/odoo";

export default class useAccountPaymentMethodLine extends Odoo {
  constructor(HTTP) {
    super(HTTP, "account.payment.method.line");
  }
}
