const QUANTITY_IN_BAKI = 30;

export default {
  convertTotalQuantityToBakiAndBtr: (quantity = 0) => {
    const quantityInBaki = Math.floor(quantity / QUANTITY_IN_BAKI);
    const quantityInBtr = Math.floor(quantity % QUANTITY_IN_BAKI);

    return {
      quantityBaki: quantityInBaki,
      quantityButir: quantityInBtr,
    };
  },

  convertBakiAndBtrToTotalQuantity: (baki = 0, btr = 0) => {
    return parseInt(baki) * QUANTITY_IN_BAKI + parseInt(btr);
  },

  calculateFCR: ({ feedIntakeInKg = 0, productionQuantity = 0 }) => {
    let valueFCR = undefined;
    if (feedIntakeInKg && productionQuantity) {
      const perTrayKg = feedIntakeInKg / (productionQuantity / 30);
      valueFCR = Math.round(perTrayKg * 100) / 100;
    }

    console.log(valueFCR);

    if (valueFCR == undefined) {
      console.log(valueFCR, "TESTs");

      return { value: undefined, grade: undefined, color: undefined };
    }
    console.log(valueFCR, "TESTs2");

    const thresholds = [
      { max: 3.5, grade: "SANGAT BAIK", color: "green" },
      { max: 4.0, grade: "BAIK", color: "blue" },
      { max: 4.5, grade: "CUKUP", color: "orange" },
      { max: 6.0, grade: "KURANG", color: "pink" },
      { max: Infinity, grade: "KRITIS", color: "red" },
    ];

    // Cari baris pertama yang memenuhi syarat
    const { grade, color } = thresholds.find((t) => valueFCR <= t.max);

    return {
      value: valueFCR,
      grade: grade,
      color: color,
    };
  },
};
