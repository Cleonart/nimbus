import Odoo from "../core/odoo";

export default class useStockProductionMaterial extends Odoo {
  constructor(HTTP) {
    super(HTTP, "stock.production.material");
  }

  models = {
    id: null,
  };
}
