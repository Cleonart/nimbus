import Odoo from "../core/odoo";

export default class useWaterBillingMeterReading extends Odoo {
  constructor(HTTP) {
    super(HTTP, "billing.water.meter.reading");
  }

  get_reading_last({ partner_id, reading_date }) {
    return this.exec_post("get_reading_last", {
      params: {
        args: [
          {
            partner_id: partner_id,
            reading_date: reading_date,
          },
        ],
        kwargs: {
          context: {
            invalidate_cache: true,
          },
        },
      },
    });
  }
}
