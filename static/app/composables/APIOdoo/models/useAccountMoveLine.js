import Odoo from "../core/odoo";

export default class useAccountMoveLine extends Odoo {
  constructor(HTTP) {
    super(HTTP, "account.move.line");
  }
}
