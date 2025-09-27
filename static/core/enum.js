export default {
  shipment_option: [
    {
      label: "Pengiriman Darat",
      value: "land",
    },
    {
      label: "Pengiriman Udara",
      value: "air",
    },
    {
      label: "Pengiriman Laut",
      value: "ship",
    },
    {
      label: "Ekspedisi J&T",
      value: "expedition_jnt",
    },
    {
      label: "Ekspedisi JNE",
      value: "expedition_jne",
    },
    {
      label: "Ekspedisi DHL",
      value: "expedition_dhl",
    },
    {
      label: "Ekspedisi Tiki",
      value: "expedition_tiki",
    },
  ],
  job_title: [
    {
      label: "Admin",
      value: "admin",
    },
    {
      label: "Kasir",
      value: "cashier",
    },
    {
      label: "Operasional",
      value: "operational",
    },
  ],
  product_only_product_type: [
    {
      label: "Produk",
      value: "product",
      modules: ["all"],
    },
    {
      label: "Makanan",
      value: "food",
      modules: ["restaurant"],
    },
    {
      label: "Minuman",
      value: "drink",
      modules: ["restaurant"],
    },
    {
      label: "Hasil Ternak",
      value: "livestock",
      modules: ["ovoya_egg_farm"],
    },
    {
      label: "Hewan",
      value: "animal",
      modules: ["ovoya_egg_farm"],
    },
    {
      label: "Material",
      value: "material",
      modules: ["all"],
    },
  ],
  payment_methods: [
    {
      label: "Tunai",
      value: "cash",
      icon: "WalletOutlined",
      image: "~/assets/payment_cash.png",
    },
    {
      label: "EDC BRI",
      value: "edc_bri",
      icon: "BankOutlined",
      image: "~/assets/payment_bank_transfer.png",
    },
    {
      label: "EDC BCA",
      value: "edc_bca",
      icon: "BankOutlined",
      image: "~/assets/payment_bank_transfer.png",
    },
    {
      label: "QRIS",
      value: "qris",
      icon: "QrcodeOutlined",
      image: "~/assets/payment_qris.png",
    },
    {
      label: "GOJEK",
      value: "gojek",
      icon: "BankOutlined",
      image: "~/assets/payment_bank_transfer.png",
    },
    {
      label: "GRAB",
      value: "grab",
      icon: "BankOutlined",
      image: "~/assets/payment_bank_transfer.png",
    },
  ],
  sales_promotion_discount: [
    {
      label: "Promosi",
      value: "promotion",
    },
    {
      label: "Buy 1 Get 1 Free",
      value: "buy_x_get_y",
    },
  ],
  sales_discount_applicability: [
    {
      label: "Terhadap Total Sales",
      value: "order",
    },
    {
      label: "Terhadap Produk",
      value: "specific",
    },
  ],
  sales_discount_mode: [
    {
      label: "%",
      value: "percent",
    },
    {
      label: "Rp.",
      value: "per_order",
    },
  ],
  eligible_date: Array.from({ length: 28 }, (_, i) => ({
    label: `${i + 1}`,
    value: `${i + 1}`,
  })),
  expense_type: [],
  expense_farm_type: [
    {
      label: "Pembelian Pakan",
      value: "feed",
    },
    {
      label: "Pembelian Ayam",
      value: "chicken",
    },
    {
      label: "Lainnya",
      value: "others",
    },
  ],
};
