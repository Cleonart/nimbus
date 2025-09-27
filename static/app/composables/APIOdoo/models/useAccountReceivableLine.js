import Odoo from "../core/odoo";

export default class useAccountReceivableLine extends Odoo {
  constructor(HTTP) {
    super(HTTP, "account.move.line");
  }

  models = {
    id: undefined,
    product_id: undefined,
    product_name: undefined,
    product_uom_id: undefined,
    product_uom_category_id: undefined,
    product_uom_ref_id: undefined,
    product_uom_ref_name: undefined,
    product_uom_ref_factor: undefined,
    quantity_ratio: undefined,
    ratio: undefined,
    quantity: undefined,
    price_unit: undefined,
    price_subtotal: undefined,
    price_total: undefined,
    tax_ids: undefined,
  };
}
