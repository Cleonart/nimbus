import Odoo from "../core/odoo";

export default class useHRPayslipInput extends Odoo {
  constructor(HTTP) {
    super(HTTP, "hr.payslip.input");
  }

  models = {
    id: null,
    amount: 0,
  };
}
