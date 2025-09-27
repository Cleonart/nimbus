import Odoo from "../core/odoo";
import _ from "underscore";

export default class useSessionEggFarm extends Odoo {
  constructor(HTTP) {
    super(HTTP, "session.farm.egg");
  }

  models = {
    id: null,
    sequence: undefined,
    name: undefined,
  };
}
