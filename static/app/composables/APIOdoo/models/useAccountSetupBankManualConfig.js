import Odoo from "../core/odoo";

export default class useAccountSetupBankManualConfig extends Odoo {
  constructor(HTTP) {
    super(HTTP, "account.setup.bank.manual.config");
  }
}
