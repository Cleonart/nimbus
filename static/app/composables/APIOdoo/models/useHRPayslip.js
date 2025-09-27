import Odoo from "../core/odoo";

export default class useHRPayslip extends Odoo {
  constructor(HTTP) {
    super(HTTP, "hr.payslip");
  }

  models = {
    id: null,
    employee_name: "",
    state: undefined,
    salary_input_basic_amount: 0,
    salary_input_bonus_amount: 0,
    salary_input_cash_advance_amount: 0,
    salary_input_credit_amount: 0,
    input_line_ids: [],
  };

  update_salary = ({
    id = undefined,
    basic_amount,
    bonus_amount,
    cash_advance_amount,
  }) => {
    return this.exec_post("update_salary", {
      params: {
        args: [id],
        kwargs: {
          salary_input_basic_amount: basic_amount,
          salary_input_bonus_amount: bonus_amount,
          salary_input_cash_advance_amount: cash_advance_amount,
          context: {
            tz: "Asia/Makassar",
            invalidate_cache: true,
          },
        },
      },
    });
  };

  refresh_payslip({ month_year = null, context = {} }) {
    return this.exec_post("refresh_payslip", {
      params: {
        args: [month_year],
        kwargs: {
          context: {
            tz: "Asia/Makassar",
            invalidate_cache: true,
          },
        },
      },
    });
  }

  action_payslip_done({ payslip_ids = [], context = {} }) {
    return this.exec_post("action_payslip_done", {
      params: {
        args: [payslip_ids],
        kwargs: {
          context: {
            tz: "Asia/Makassar",
            invalidate_cache: true,
          },
        },
      },
    });
  }

  action_payslip_confirm({
    payslip_ids = [],
    invoice_date = undefined,
    credit_account_id = undefined,
    context = {},
  }) {
    return this.exec_post("action_payslip_confirm", {
      params: {
        args: [
          payslip_ids,
          {
            invoice_date: invoice_date,
            credit_account_id: credit_account_id,
          },
        ],
        kwargs: {
          context: {
            tz: "Asia/Makassar",
            invalidate_cache: true,
          },
        },
      },
    });
  }

  action_payslip_cancel({ payslip_ids = [], context = {} }) {
    return this.exec_post("action_payslip_cancel", {
      params: {
        args: [payslip_ids],
        kwargs: {
          context: {
            tz: "Asia/Makassar",
            invalidate_cache: true,
          },
        },
      },
    });
  }
}
