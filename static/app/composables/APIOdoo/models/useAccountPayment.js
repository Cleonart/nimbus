import Odoo from "../core/odoo";

export default class useAccountPayment extends Odoo {
  constructor(HTTP) {
    super(HTTP, "account.payment");
  }

  do_payment({
    partner_id = null,
    payment_date = null,
    account_move_ids = [],
    payment_method_line_id = null,
    amount = 0.0,
  }) {
    return this.exec_post("do_payment", {
      params: {
        args: [
          {
            partner_id: partner_id,
            payment_date: payment_date,
            account_move_ids: account_move_ids,
            payment_method_line_id: payment_method_line_id,
            amount: amount,
          },
        ],
        kwargs: {
          context: {
            tz: "Asia/Makassar",
            invalidate_cache: true,
            invalidate_cache_list: ["account.move", "account.payment"],
          },
        },
      },
    });
  }
}
