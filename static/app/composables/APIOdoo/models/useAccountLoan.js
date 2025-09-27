import Odoo from "../core/odoo";

export default class useAccountLoan extends Odoo {
  constructor(HTTP) {
    super(HTTP, "account.loan");
  }

  action_simulate_credit({ start_date, loan_amount, period_type, period }) {
    return this.exec_post("action_simulate_credit", {
      params: {
        args: [
          {
            start_date: start_date,
            loan_amount: loan_amount,
            period_type: period_type,
            period: period,
          },
        ],
        kwargs: {},
      },
    });
  }
}
