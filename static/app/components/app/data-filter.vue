<script setup>
import { Search, Download, Funnel } from "lucide-vue-next";
const searchQuery = ref();
</script>

<template>
  <div class="flex justify-between lg:flex-row lg:items-center">
    <div class="flex gap-2">
      <div class="relative flex-1">
        <Search
          class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          v-model="searchQuery"
          placeholder="Cari disini..."
          class="pl-10 md:w-[300px] h-8"
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Funnel />
            Filter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <p style="width: 250px">test</p>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <div class="flex flex-wrap gap-2">
      <Button variant="outline" size="sm">
        <Download class="h-4 w-4" />
        Unduh
      </Button>
    </div>
  </div>
</template>
