import Odoo from "../core/odoo";

export default class useAccountAccount extends Odoo {
  constructor(HTTP) {
    super(HTTP, "account.account");
  }

  action_update_bank_cash_balance(payload = {}) {
    return this.exec_post("action_update_bank_cash_balance", {
      params: {
        args: [payload],
        kwargs: {
          context: {
            invalidate_cache: true,
          },
        },
      },
    });
  }

  action_update_balance({ id, balance }) {
    return this.exec_post("action_update_balance", {
      params: {
        args: [id, balance],
        kwargs: {
          context: {
            invalidate_cache: true,
          },
        },
      },
    });
  }

  get_general_ledger({ start_date, end_date }) {
    return this.exec_post("get_general_ledger", {
      params: {
        args: [
          {
            start_date: start_date,
            end_date: end_date,
          },
        ],
        kwargs: {},
      },
    });
  }
}
