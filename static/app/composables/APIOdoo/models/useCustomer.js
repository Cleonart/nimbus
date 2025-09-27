import Odoo from "../core/odoo";

export default class useCustomer extends Odoo {
  constructor(HTTP) {
    super(HTTP, "customer.master");
  }

  models = {
    id: null,
    name: null,
    country_id: 100,
    state_id: null,
    address: null,
  };
}
