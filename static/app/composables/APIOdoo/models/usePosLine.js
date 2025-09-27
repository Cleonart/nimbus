import Odoo from "../core/odoo";

export default class useAccountPOSLine extends Odoo {
  constructor(HTTP) {
    super(HTTP, "account.pos.line");
  }

  models = {
    id: null,
    product_id: undefined,
    product_name: "",
    quantity: 0,
    price_unit: 0,
    kitchen_order_id: undefined,
  };
}
