import Odoo from "../core/odoo";

export default class useStockProductionLine extends Odoo {
  constructor(HTTP) {
    super(HTTP, "stock.production.line");
  }

  models = {
    id: null,
  };
}
