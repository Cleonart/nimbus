<script setup>
const currentPage = ref(1);
const rowsPerPage = ref(10);
const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
  columns: {
    type: Array,
    default: () => [],
  },
  data: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <div>
    <div class="rounded-sm border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead class="w-[10px] py-3">
              <Checkbox />
            </TableHead>
            <TableHead
              v-for="_head in props.columns"
              :class="_head.width.toString()"
              class="text-primary py-3"
            >
              {{ _head.label }}
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableEmpty
            :colspan="props.columns.length + 1"
            v-if="props.data.length === 0"
          >
            <p>Tidak ada data tersedia</p>
          </TableEmpty>
          <TableRow v-for="_row in props.data" :key="_row.id">
            <TableCell class="py-2">
              <Checkbox />
            </TableCell>
            <TableCell
              v-for="_col in props.columns"
              class="py-2"
              :key="_col.key"
            >
              <span v-if="_col.type == 'number'">
                {{ stringFormat.toNumberDecimalString(_row[_col.key]) }}
              </span>
              <span v-else>
                {{ _row[_col.key] }}
              </span>
              <span
                v-if="_col.subDataKey"
                class="text-muted-foreground text-xs"
              >
                <br />
                {{ _row[_col.subDataKey] }}
              </span>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <!-- Pagination-->
    <div class="flex justify-between mb-3 mt-3">
      <div class="flex">
        <AppDataPagination
          :rowsPerPage="10"
          v-model:currentPage="currentPage"
          :totalPages="10"
        />
      </div>
      <div class="flex">
        <Select size="xs" :value="String(rowsPerPage)" :default-value="10">
          <SelectTrigger class="h-9 w-25 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem :value="10">10 / hal</SelectItem>
            <SelectItem :value="20">20 / hal</SelectItem>
            <SelectItem :value="30">30 / hal</SelectItem>
            <SelectItem :value="40">40 / hal</SelectItem>
            <SelectItem :value="50">50 / hal</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  </div>
</template>
