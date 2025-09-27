import Odoo from "../core/odoo";

export default class useSupplier extends Odoo {
  constructor(HTTP) {
    super(HTTP, "supplier.master");
  }
  models = {
    name: "",
    id: "",
    country_id: "",
    state_id: "",
    address: "",
  };
}
