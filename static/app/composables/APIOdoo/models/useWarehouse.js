import Odoo from "../core/odoo";

export default class useWarehouse extends Odoo {
  constructor(HTTP) {
    super(HTTP, "stock.warehouse");
  }
  models = {
    id: null,
    code: null,
    name: null,
    address: null,
    is_allow_negative_stock: false,
    pic_id: undefined,
  };
}
