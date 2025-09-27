import Odoo from "../core/odoo";

export default class IrModuleInstalled extends Odoo {
  constructor(HTTP) {
    super(HTTP, "ir.module.installed");
  }
}
