import Odoo from "../core/odoo";

export default class useAccountBankAccount extends Odoo {
  constructor(HTTP) {
    super(HTTP, "res.partner.bank");
  }
}
