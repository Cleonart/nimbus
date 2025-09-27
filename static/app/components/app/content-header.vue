<script setup>
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const props = defineProps({
  title: {
    type: String,
    default: undefined,
  },
  subtitle: {
    type: String,
    default: undefined,
  },
  breadcrumb: {
    type: Array,
    default: [],
  },
});
</script>

<template>
  <div
    class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-0"
  >
    <div>
      <h1 class="text-3xl font-bold tracking-tight">
        {{ props.title || "" }}
      </h1>
      <slot name="subtitle">
        <p class="text-muted-foreground mt-[3px]" {{ props.subtitle }}></p>
      </slot>
    </div>
    <div class="flex items-center gap-2">
      <slot name="buttonGroup" />
    </div>
  </div>
</template>
