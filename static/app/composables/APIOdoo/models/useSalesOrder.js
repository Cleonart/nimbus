import Odoo from "../core/odoo";

export default class useSalesOrder extends Odoo {
  constructor(HTTP) {
    super(HTTP, "sale.order");
  }

  models = {
    id: null,
    name: undefined,
    partner_id: undefined,
    partner_phone: undefined,
    date_order: undefined,
    validity_date: undefined,
    commitment_date: undefined,
    user_id: undefined,
    warehouse_id: undefined,
    remarks: "",
  };

  get_claimable_rewards(vals) {
    return this.exec_post("get_claimable_rewards", {
      params: {
        args: [vals],
        kwargs: {
          context: {
            tz: "Asia/Makassar",
          },
        },
      },
    });
  }
}
