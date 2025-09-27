import Odoo from "../core/odoo";

export default class useSalesLoyaltyRule extends Odoo {
  constructor(HTTP) {
    super(HTTP, "loyalty.rule");
  }

  models = {
    company_id: undefined,
    active: true,
    code: "",
    minimum_qty: 0,
    minimum_amount: 0,
    product_ids: [],
  };
}
