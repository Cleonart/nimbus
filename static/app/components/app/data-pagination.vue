<script setup>
import { computed } from "vue";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const props = defineProps({
  totalPages: {
    type: Number,
    required: true,
    validator: (value) => value >= 1,
  },
  currentPage: {
    type: Number,
    required: true,
    validator: (value) => value >= 1,
  },
  rowsPerPage: {
    type: Number,
    required: true,
    default: 10,
  },
  totalItems: {
    type: Number,
    default: 0,
  },
});

// Emits
const emit = defineEmits(["update:currentPage", "update:rowsPerPage"]);

const visiblePages = computed(() => {
  const pages = [];
  const total = props.totalPages;
  const current = props.currentPage;
  const delta = 2; // Number of pages to show on each side

  if (total <= 7) {
    // Show all pages if total is small
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    // Always show first page
    pages.push(1);

    // Calculate start and end of middle section
    let start = Math.max(2, current - delta);
    let end = Math.min(total - 1, current + delta);

    // Add ellipsis after first page if needed
    if (start > 2) {
      pages.push("...");
    }

    // Add middle pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add ellipsis before last page if needed
    if (end < total - 1) {
      pages.push("...");
    }

    // Always show last page if it's not already included
    if (total > 1) {
      pages.push(total);
    }
  }

  return pages;
});

// Methods
const goToPage = (page) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit("update:currentPage", page);
  }
};

const updateRowsPerPage = (value) => {
  const newRowsPerPage = parseInt(value);
  if (newRowsPerPage !== props.rowsPerPage) {
    emit("update:rowsPerPage", newRowsPerPage);
    // Reset to first page when changing rows per page
    emit("update:currentPage", 1);
  }
};
</script>

<style scoped>
/* Custom styles for better responsive behavior */
@media (max-width: 640px) {
  .flex-col {
    gap: 0.75rem;
  }
}
</style>

<template>
  <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
    <div class="flex items-center space-x-1">
      <Button
        variant="outline"
        size="xs"
        :disabled="currentPage <= 1"
        @click="goToPage(currentPage - 1)"
        class="py-1 px-1"
      >
        <ChevronLeft class="h-4 w-4" />
      </Button>

      <template v-for="page in visiblePages" :key="page">
        <Button
          v-if="typeof page === 'number'"
          size="xs"
          :variant="page === currentPage ? 'default' : 'outline'"
          @click="goToPage(page)"
          class="py-1 px-2"
        >
          {{ page }}
        </Button>

        <!-- Ellipsis -->
        <div
          v-else-if="page === '...'"
          class="flex h-9 w-9 items-center justify-center"
        >
          <MoreHorizontal class="h-4 w-4" />
        </div>
      </template>

      <!-- Next Page Button -->
      <Button
        variant="outline"
        size="xs"
        :disabled="currentPage >= totalPages"
        @click="goToPage(currentPage + 1)"
        class="py-1 px-1"
      >
        <ChevronRight class="h-4 w-4" />
      </Button>
    </div>

    
  </div>
</template>
