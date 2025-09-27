import Odoo from "../core/odoo";

export default class useIotDevice extends Odoo {
  constructor(HTTP) {
    super(HTTP, "iot.device");
  }
}
