import Odoo from "../core/odoo";

export default class useStockMove extends Odoo {
  constructor(HTTP) {
    super(HTTP, "stock.move");
  }

  models = {
    id: null,
    product_id: null,
    product_code: null,
    product_name: null,
    product_brand: null,
    product_variant: null,
  };
}
