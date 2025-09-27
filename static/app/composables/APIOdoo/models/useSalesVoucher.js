import Odoo from "../core/odoo";

export default class useSalesVoucher extends Odoo {
  constructor(HTTP) {
    super(HTTP, "sales.voucher");
  }

  models = {
    active: true,
    name: null,
    condition: "",
    condition_minimum_amount: 0.0,
    amount_discount_percent: 0.0,
    start_date: undefined,
    end_date: undefined,
  };
}
