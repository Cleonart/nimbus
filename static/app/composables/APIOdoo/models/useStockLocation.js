import Odoo from "../core/odoo";

export default class useStockLocation extends Odoo {
  constructor(HTTP) {
    super(HTTP, "stock.location");
  }

  models = {
    id: null,
    name: null,
    partner_id: null,
    partner_type: undefined,
  };
}
