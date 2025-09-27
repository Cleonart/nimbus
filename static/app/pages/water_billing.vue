<script setup>
import {
  Home,
  Settings,
  User,
  CreditCard,
  Bell,
  Receipt,
  Gauge,
  Calculator,
} from "lucide-vue-next";

const navigation = [
  {
    group: "main",
    groupLabel: "Navigasi Halaman",
    items: [
      { title: "Dashboard", url: "/water_billing", icon: Home },
      { title: "Pembacaan Meter", url: "/water_billing/reading", icon: Gauge },
      { title: "Tagihan", url: "/water_billing/invoice", icon: Receipt },
      { title: "Pembayaran", url: "/water_billing/payment", icon: CreditCard },
    ],
  },
  {
    group: "other",
    groupLabel: "Lainnya",
    items: [
      {
        title: "Pengaturan",
        icon: Settings,
        childs: [
          {
            title: "Pelanggan",
            url: "/water_billing/settings/customer",
            icon: User,
          },
          {
            title: "Tariff",
            url: "/water_billing/settings/tariff",
            icon: Calculator,
          },
          {
            title: "Billing",
            url: "/water_billing/settings/billing",
            icon: CreditCard,
          },
        ],
      },
      { title: "Notifications", url: "/notifications", icon: Bell },
    ],
  },
];
</script>

<template>
  <NuxtLayout name="container-sidebar" :navigation="navigation">
    <div>
      <NuxtPage />
    </div>
  </NuxtLayout>
</template>
