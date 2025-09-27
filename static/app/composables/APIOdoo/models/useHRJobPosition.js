import Odoo from "../core/odoo";

export default class useHRJobPosition extends Odoo {
  constructor(HTTP) {
    super(HTTP, "hr.job");
  }

  models = {
    id: null,
    name: null,
  };
}
