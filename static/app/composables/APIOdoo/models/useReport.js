import axios from "axios";
import Odoo from "../core/odoo";

export default class useResUsers extends Odoo {
  printDeliveryNote(payload = {}) {
    const host = window.location.protocol + "//" + window.location.host;
    const api_call = host + "/api/report/accounting_delivery_note";
    return axios({
      url: api_call,
      method: "POST",
      responseType: "blob",
      data: {
        payload: payload,
      },
    });
  }
  printSalesInvoices(payload = {}) {
    const host = window.location.protocol + "//" + window.location.host;
    const api_call = host + "/api/report/accounting_invoice_sales";
    return axios({
      url: api_call,
      method: "POST",
      responseType: "blob",
      data: {
        payload: payload,
      },
    });
  }
}
