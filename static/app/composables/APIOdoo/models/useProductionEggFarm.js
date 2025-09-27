import Odoo from "../core/odoo";
import moment from "moment";
import commonFarm from "~~/core/common_farm";
import _ from "underscore";

export default class useStockProduction extends Odoo {
  constructor(HTTP) {
    super(HTTP, "production.farm.egg");
  }

  models = {
    id: null,
    date: undefined,
    session_id: undefined,
    stock_warehouse_id: undefined,
    stock_warehouse_name: undefined,
    chicken_dead_quantity: 0,
    chicken_missing_quantity: 0,
    chicken_culled_quantity: 0,
    chicken_total_loss_quantity: 0,
    crop_total_used_quantity: 0,
    crop_product_ids: 0,
    quantity: 0,
    quantity_in_baki: 0,
    quantity_in_btr: 0,
    sort_ids: [],
  };

  read_by_date({
    date = moment().format("YYYY-MM-DD"),
    session_id = undefined,
    warehouse_ids = [],
  }) {
    return this.exec_post("read_by_date", {
      params: {
        args: [
          {
            date: date,
            session_id: session_id,
            warehouse_ids: warehouse_ids,
          },
        ],
        kwargs: {
          context: {
            tz: "Asia/Makassar",
          },
        },
      },
    });
  }

  read_data({
    date_start = moment().format("YYYY-MM-DD"),
    date_end = moment().format("YYYY-MM-DD"),
    offset = 0,
    limit = 10,
  }) {
    return this.exec_post("read_data", {
      params: {
        args: [
          {
            date_start: date_start,
            date_end: date_end,
            offset: offset,
            limit: limit,
          },
        ],
        kwargs: {
          context: {
            tz: "Asia/Makassar",
          },
        },
      },
    });
  }

  read_one({
    date = moment().format("YYYY-MM-DD"),
    stock_warehouse_id = undefined,
    session_id = undefined,
  }) {
    return this.exec_post("read_one", {
      params: {
        args: [
          {
            date: date,
            stock_warehouse_id: stock_warehouse_id,
            session_id: session_id,
          },
        ],
        kwargs: {
          context: {
            tz: "Asia/Makassar",
          },
        },
      },
    });
  }

  restructureToProductionLine = ({ listProduction = [] }) => {
    const listOfProductionLine = _.map(listProduction, (obj) => {
      const totalQuantity = obj.quantity || 0;
      const qty = commonFarm.convertTotalQuantityToBakiAndBtr(totalQuantity);
      const qtyInBaki = qty.quantityBaki;
      const qtyInBtr = qty.quantityButir;
      return {
        id: obj.id || undefined,
        date: obj.date,
        stock_warehouse_id: obj.stock_warehouse_id,
        stock_warehouse_name: obj.stock_warehouse_name,
        material_animal_start_qty: obj.material_animal_start_qty,
        material_animal_count_qty: obj.material_animal_count_qty,
        material_animal_end_qty: obj.material_animal_end_qty,
        material_crop_used_qty: obj.material_crop_used_qty,
        quantity_in_baki: qtyInBaki,
        quantity_in_btr: qtyInBtr,
        narration: obj.narration || "",
      };
    });
    return listOfProductionLine;
  };
}
