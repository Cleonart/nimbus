<template>
  <footer class="bg-white border-t border-gray-200 mt-auto">
    <div class="max-w-7xl mx-auto px-4 py-4">
      <div
        class="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600"
      >
        <!-- Left side - Company info -->
        <div class="flex items-center space-x-4 mb-2 sm:mb-0">
          <span>&copy; {{ currentYear }} {{ companyName }}</span>
          <span class="hidden sm:inline">•</span>
          <span class="hidden sm:inline">Version {{ version }}</span>
        </div>

        <!-- Right side - Links -->
        <div class="flex items-center space-x-4">
          <a
            href="#"
            @click.prevent="showSupport"
            class="text-gray-500 hover:text-gray-700 transition-colors"
          >
            Support
          </a>
          <span>•</span>
          <a
            href="#"
            @click.prevent="showPrivacy"
            class="text-gray-500 hover:text-gray-700 transition-colors"
          >
            Privacy
          </a>
          <span>•</span>
          <span class="text-xs text-gray-400">
            Last updated: {{ lastUpdated }}
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed } from "vue";

// Props
const props = defineProps({
  companyName: {
    type: String,
    default: "Your Company",
  },
  version: {
    type: String,
    default: "2.1.4",
  },
});

// Computed properties
const currentYear = computed(() => new Date().getFullYear());

const lastUpdated = computed(() => {
  const now = new Date();
  return now.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
});

// Emits
const emit = defineEmits(["show-support", "show-privacy"]);

// Methods
const showSupport = () => {
  emit("show-support");
  // You can also handle it locally
  console.log("Show support modal/page");
};

const showPrivacy = () => {
  emit("show-privacy");
  // You can also handle it locally
  console.log("Show privacy policy");
};
</script>

<style scoped>
/* Ensure footer sticks to bottom if needed */
footer {
  flex-shrink: 0;
}
</style>
