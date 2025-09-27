import Odoo from "../core/odoo";

export default class useSalesLoyaltyReward extends Odoo {
  constructor(HTTP) {
    super(HTTP, "loyalty.reward");
  }

  models = {
    company_id: undefined,
    active: true,
    discount: 0.0,
    discount_mode: "percent",
    discount_max_amount: 0.0,
    discount_applicability: "order",
    discount_product_ids: [],
  };
}
