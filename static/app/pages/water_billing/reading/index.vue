<script setup>
import { ref, computed } from "vue";
import {
  Plus,
  Upload,
  Gauge,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const api = useAPI();

// State
const data = ref([]);
const isAddReadingOpen = ref(false);
const isDataLoading = ref(false);

const get = async () => {
  isDataLoading.value = true;
  try {
    const response = api.useWaterBillingMeterReading.search_read({
      domain: [],
    });
    const result = response.result;
    data.value = result;

    isDataLoading.value = false;
  } catch (e) {}
};

onMounted(async () => {
  await get();
});
</script>

<template>
  <div class="space-y-6 px-8 pt-4.5">
    <AppContentHeader class="mb-4" title="Pembacaan Meter">
      <template #subtitle>
        <Breadcrumb class="mt-1.5">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/water_billing">
                Tagihan Air
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/water_billing/reading">
                Pembacaan Meter
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </template>
      <template #buttonGroup>
        <div class="flex items-center gap-2">
          <Button @click="isAddReadingOpen = true">
            <Plus />
            Tambah Pengukuran
          </Button>
          <Button variant="outline" :disabled="true">
            <Upload />
            Impor Excel
          </Button>
        </div>
      </template>
    </AppContentHeader>

    <AppDataFilter class="mt-7 mb-3" />

    <!-- Meter Readings Table -->
    <AppDataTable
      :columns="[
        {
          key: 'meter_no',
          label: 'Meter ID',
          width: 'min-w-[100px]',
        },
        {
          key: 'customer_name',
          subDataKey: 'address',
          label: 'Nama Pelanggan',
          width: 'min-w-[200px]',
        },
        {
          key: 'previousReading',
          label: 'Sebelum',
          width: 'min-w-[100px]',
          type: 'number',
        },
        {
          key: 'currentReading',
          label: 'Saat Ini',
          width: 'min-w-[100px]',
          type: 'number',
        },
        {
          key: 'consumption',
          label: 'Konsumsi (m³)',
          width: 'min-w-[120px]',
          type: 'number',
        },
        {
          key: 'date',
          label: 'Tanggal',
          width: 'min-w-[150px]',
        },
      ]"
      :data="[
        {
          meter_no: 'MTR-2847',
          customer_name: 'Sarah Johnson',
          address: '123 Main St, North District',
          previousReading: 12450,
          currentReading: 12684,
          consumption: 234,
          date: '2024-01-15 16:30',
        },
        {
          meter_no: 'MTR-9182',
          customer_name: 'Mike Chen',
          address: '456 Oak Ave, East District',
          previousReading: 8920,
          currentReading: 9076,
          consumption: 156,
          date: '2024-01-15 18:30',
        },
      ]"
    />

    <!-- Add Reading Dialog -->
    <Dialog v-model:open="isAddReadingOpen">
      <DialogContent class="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Meter Reading</DialogTitle>
          <DialogDescription>
            Enter the meter reading details below
          </DialogDescription>
        </DialogHeader>
        <div class="grid gap-4 py-4">
          <div class="grid gap-2">
            <Label htmlFor="meter">Meter ID</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select meter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MTR-001">MTR-001 - John Doe</SelectItem>
                <SelectItem value="MTR-002">MTR-002 - Jane Smith</SelectItem>
                <SelectItem value="MTR-003">MTR-003 - Bob Johnson</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="grid gap-2">
            <Label htmlFor="reading">Current Reading (m³)</Label>
            <Input
              id="reading"
              type="number"
              placeholder="Enter current reading"
            />
          </div>
          <div class="grid gap-2">
            <Label htmlFor="photo">Reading Photo (Optional)</Label>
            <Input id="photo" type="file" accept="image/*" />
          </div>
          <div class="grid gap-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any notes about this reading"
              rows="3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="isAddReadingOpen = false">
            Cancel
          </Button>
          <Button @click="isAddReadingOpen = false"> Save Reading </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
