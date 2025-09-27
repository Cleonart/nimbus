import Odoo from "../core/odoo";

export default class useHREmployee extends Odoo {
  constructor(HTTP) {
    super(HTTP, "hr.employee");
  }

  models = {
    id: null,
    name: null,
    jobtitle: "",
    mobile_phone: "",
    department_id: undefined,
  };
}
