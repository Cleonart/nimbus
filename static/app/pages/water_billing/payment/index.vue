<template>
  <div class="p-6 space-y-6">
    <!-- Header Section -->
    <div
      class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
    >
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Payments</h1>
        <p class="text-muted-foreground">
          Track and manage all customer payments
        </p>
      </div>
      <div class="flex items-center gap-2">
        <Button @click="isRecordPaymentOpen = true">
          <Plus class="mr-2 h-4 w-4" />
          Record Payment
        </Button>
        <Button variant="outline">
          <FileText class="mr-2 h-4 w-4" />
          Payment Report
        </Button>
      </div>
    </div>

    <!-- Payment Statistics -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card v-for="stat in paymentStats" :key="stat.label">
        <CardContent class="p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-medium text-muted-foreground">
                {{ stat.label }}
              </p>
              <p class="text-2xl font-bold">{{ stat.value }}</p>
              <div class="flex items-center gap-1 mt-1">
                <component
                  :is="stat.trending === 'up' ? TrendingUp : TrendingDown"
                  :class="`h-3 w-3 ${
                    stat.trending === 'up' ? 'text-green-600' : 'text-red-600'
                  }`"
                />
                <span
                  :class="`text-xs ${
                    stat.trending === 'up' ? 'text-green-600' : 'text-red-600'
                  }`"
                >
                  {{ stat.change }}
                </span>
                <span class="text-xs text-muted-foreground">vs last month</span>
              </div>
            </div>
            <div :class="`rounded-full p-2 ${stat.bgColor}`">
              <component :is="stat.icon" :class="`h-4 w-4 ${stat.iconColor}`" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Payment Trends Chart -->
    <div class="grid gap-4 lg:grid-cols-7">
      <Card class="col-span-4">
        <CardHeader>
          <CardTitle>Payment Trends</CardTitle>
          <CardDescription
            >Daily payment collection over the last 30 days</CardDescription
          >
        </CardHeader>
        <CardContent>
          <div class="h-[250px] w-full">
            <!-- Simple bar chart visualization -->
            <div class="flex items-end justify-between h-full gap-1">
              <div
                v-for="(day, index) in dailyPayments"
                :key="index"
                class="flex-1 bg-primary/20 hover:bg-primary/30 transition-colors rounded-t cursor-pointer relative group"
                :style="`height: ${day.percentage}%`"
              >
                <div
                  class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                >
                  ${{ day.amount.toLocaleString() }}
                </div>
              </div>
            </div>
            <div
              class="flex justify-between mt-2 text-xs text-muted-foreground"
            >
              <span>1</span>
              <span>5</span>
              <span>10</span>
              <span>15</span>
              <span>20</span>
              <span>25</span>
              <span>30</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Payment Methods Summary -->
      <Card class="col-span-3">
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>Distribution by payment type</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div
              v-for="method in paymentMethods"
              :key="method.name"
              class="space-y-2"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <component
                    :is="method.icon"
                    class="h-4 w-4 text-muted-foreground"
                  />
                  <span class="text-sm font-medium">{{ method.name }}</span>
                </div>
                <div class="text-right">
                  <p class="text-sm font-semibold">
                    ${{ method.amount.toLocaleString() }}
                  </p>
                  <p class="text-xs text-muted-foreground">
                    {{ method.count }} transactions
                  </p>
                </div>
              </div>
              <Progress :value="method.percentage" class="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Filters Section -->
    <div class="flex flex-col gap-4 lg:flex-row lg:items-center">
      <!-- Search -->
      <div class="relative flex-1">
        <Search
          class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          v-model="searchQuery"
          placeholder="Search by transaction ID, customer name, or reference..."
          class="pl-10"
        />
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap gap-2">
        <!-- Payment Method Filter -->
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <CreditCard class="mr-2 h-4 w-4" />
              Method: {{ selectedMethod }}
              <ChevronDown class="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem @click="selectedMethod = 'All'">
              All Methods
            </DropdownMenuItem>
            <DropdownMenuItem @click="selectedMethod = 'Bank Transfer'">
              Bank Transfer
            </DropdownMenuItem>
            <DropdownMenuItem @click="selectedMethod = 'Credit Card'">
              Credit Card
            </DropdownMenuItem>
            <DropdownMenuItem @click="selectedMethod = 'Mobile Payment'">
              Mobile Payment
            </DropdownMenuItem>
            <DropdownMenuItem @click="selectedMethod = 'Cash'">
              Cash
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <!-- Status Filter -->
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <CircleDot class="mr-2 h-4 w-4" />
              Status: {{ selectedStatus }}
              <ChevronDown class="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem @click="selectedStatus = 'All'">
              All Status
            </DropdownMenuItem>
            <DropdownMenuItem @click="selectedStatus = 'Completed'">
              Completed
            </DropdownMenuItem>
            <DropdownMenuItem @click="selectedStatus = 'Processing'">
              Processing
            </DropdownMenuItem>
            <DropdownMenuItem @click="selectedStatus = 'Failed'">
              Failed
            </DropdownMenuItem>
            <DropdownMenuItem @click="selectedStatus = 'Refunded'">
              Refunded
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <!-- Date Range -->
        <Button variant="outline" size="sm">
          <Calendar class="mr-2 h-4 w-4" />
          {{ dateRange }}
        </Button>

        <!-- Export -->
        <Button variant="outline" size="sm">
          <Download class="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>
    </div>

    <!-- Payments Table -->
    <Card>
      <CardHeader class="pb-4">
        <div class="flex items-center justify-between">
          <CardTitle>Payment Transactions</CardTitle>
          <Badge variant="outline"
            >{{ payments.length }} Transactions Today</Badge
          >
        </div>
      </CardHeader>
      <CardContent class="p-0">
        <div class="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="w-[40px]">
                  <Checkbox />
                </TableHead>
                <TableHead class="w-[140px]">Transaction ID</TableHead>
                <TableHead class="min-w-[200px]">Customer</TableHead>
                <TableHead class="w-[120px]">Invoice No.</TableHead>
                <TableHead class="w-[120px]">Payment Method</TableHead>
                <TableHead class="text-right w-[100px]">Amount</TableHead>
                <TableHead class="w-[140px]">Date & Time</TableHead>
                <TableHead class="w-[100px]">Status</TableHead>
                <TableHead class="text-center w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="payment in payments" :key="payment.id">
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <span class="font-mono text-xs">{{
                    payment.transactionId
                  }}</span>
                </TableCell>
                <TableCell>
                  <div>
                    <p class="font-medium text-sm">
                      {{ payment.customerName }}
                    </p>
                    <p class="text-xs text-muted-foreground">
                      {{ payment.accountNo }}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <span class="text-sm">{{ payment.invoiceNo }}</span>
                </TableCell>
                <TableCell>
                  <div class="flex items-center gap-2">
                    <component
                      :is="getMethodIcon(payment.method)"
                      class="h-3 w-3 text-muted-foreground"
                    />
                    <span class="text-sm">{{ payment.method }}</span>
                  </div>
                </TableCell>
                <TableCell class="text-right">
                  <span class="font-semibold text-sm"
                    >${{ payment.amount.toFixed(2) }}</span
                  >
                </TableCell>
                <TableCell>
                  <div>
                    <p class="text-sm">{{ payment.date }}</p>
                    <p class="text-xs text-muted-foreground">
                      {{ payment.time }}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge :variant="getPaymentStatusVariant(payment.status)">
                    {{ payment.status }}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div class="flex items-center justify-center gap-1">
                    <Button variant="ghost" size="icon" class="h-7 w-7">
                      <Receipt class="h-3 w-3" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" class="h-7 w-7">
                          <MoreHorizontal class="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye class="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Printer class="mr-2 h-4 w-4" />
                          Print Receipt
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail class="mr-2 h-4 w-4" />
                          Email Receipt
                        </DropdownMenuItem>
                        <DropdownMenuItem v-if="payment.status === 'Completed'">
                          <RotateCcw class="mr-2 h-4 w-4" />
                          Refund Payment
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem class="text-red-600">
                          <AlertCircle class="mr-2 h-4 w-4" />
                          Report Issue
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <!-- Pagination -->
        <div class="flex items-center justify-between px-4 py-3 border-t">
          <div class="text-sm text-muted-foreground">
            Showing <span class="font-medium">1-10</span> of
            <span class="font-medium">342</span> payments
          </div>
          <div class="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              <ChevronLeft class="h-4 w-4" />
              Previous
            </Button>
            <div class="flex items-center gap-1">
              <Button variant="outline" size="sm" class="h-8 w-8 p-0">
                1
              </Button>
              <Button variant="ghost" size="sm" class="h-8 w-8 p-0"> 2 </Button>
              <Button variant="ghost" size="sm" class="h-8 w-8 p-0"> 3 </Button>
              <span class="px-2 text-muted-foreground">...</span>
              <Button variant="ghost" size="sm" class="h-8 w-8 p-0">
                35
              </Button>
            </div>
            <Button variant="outline" size="sm">
              Next
              <ChevronRight class="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Record Payment Dialog -->
    <Dialog v-model:open="isRecordPaymentOpen">
      <DialogContent class="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Record New Payment</DialogTitle>
          <DialogDescription>
            Enter payment details to record a customer payment
          </DialogDescription>
        </DialogHeader>
        <div class="grid gap-4 py-4">
          <div class="grid gap-2">
            <Label>Customer Account</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select customer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="acc1">Sarah Johnson - ACC-98472</SelectItem>
                <SelectItem value="acc2">Mike Chen - ACC-73621</SelectItem>
                <SelectItem value="acc3"
                  >ABC Corporation - ACC-10293</SelectItem
                >
              </SelectContent>
            </Select>
          </div>

          <div class="grid gap-2">
            <Label>Outstanding Invoices</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select invoice" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inv1"
                  >INV-2024-001 - $338.25 (Due: Feb 15)</SelectItem
                >
                <SelectItem value="inv2"
                  >INV-2024-002 - $225.60 (Due: Feb 15)</SelectItem
                >
              </SelectContent>
            </Select>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="grid gap-2">
              <Label>Payment Amount</Label>
              <Input type="number" placeholder="0.00" />
            </div>
            <div class="grid gap-2">
              <Label>Payment Method</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                  <SelectItem value="card">Credit Card</SelectItem>
                  <SelectItem value="mobile">Mobile Payment</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div class="grid gap-2">
            <Label>Reference Number</Label>
            <Input placeholder="Enter transaction reference" />
          </div>

          <div class="grid gap-2">
            <Label>Payment Date</Label>
            <Input type="date" />
          </div>

          <div class="grid gap-2">
            <Label>Notes (Optional)</Label>
            <Textarea placeholder="Add any notes about this payment" rows="2" />
          </div>

          <!-- Payment Summary -->
          <div class="rounded-lg bg-muted p-3 space-y-2">
            <div class="flex justify-between text-sm">
              <span>Invoice Amount:</span>
              <span class="font-medium">$338.25</span>
            </div>
            <div class="flex justify-between text-sm">
              <span>Payment Amount:</span>
              <span class="font-medium">$338.25</span>
            </div>
            <Separator />
            <div class="flex justify-between text-sm font-semibold">
              <span>Remaining Balance:</span>
              <span>$0.00</span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="isRecordPaymentOpen = false">
            Cancel
          </Button>
          <Button @click="isRecordPaymentOpen = false"> Record Payment </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  Plus,
  FileText,
  Search,
  CircleDot,
  ChevronDown,
  Calendar,
  Download,
  CreditCard,
  Banknote,
  Smartphone,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Receipt,
  MoreHorizontal,
  Eye,
  Printer,
  Mail,
  RotateCcw,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Clock,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
} from "lucide-vue-next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

// State
const searchQuery = ref("");
const selectedMethod = ref("All");
const selectedStatus = ref("All");
const dateRange = ref("Today");
const isRecordPaymentOpen = ref(false);

// Payment Statistics
const paymentStats = ref([
  {
    label: "Today's Collection",
    value: "$12,847",
    change: "+23.5%",
    trending: "up",
    icon: ArrowUpRight,
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    label: "This Week",
    value: "$68,392",
    change: "+8.2%",
    trending: "up",
    icon: DollarSign,
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    label: "Processing",
    value: "$3,264",
    change: "12 payments",
    trending: "up",
    icon: Clock,
    bgColor: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  {
    label: "Failed",
    value: "$892",
    change: "3 payments",
    trending: "down",
    icon: XCircle,
    bgColor: "bg-red-100",
    iconColor: "text-red-600",
  },
]);

// Daily payments for chart
const dailyPayments = ref([
  { day: 1, amount: 3200, percentage: 45 },
  { day: 2, amount: 4500, percentage: 63 },
  { day: 3, amount: 3800, percentage: 53 },
  { day: 4, amount: 5200, percentage: 73 },
  { day: 5, amount: 4100, percentage: 57 },
  { day: 6, amount: 2900, percentage: 41 },
  { day: 7, amount: 3500, percentage: 49 },
  { day: 8, amount: 6200, percentage: 87 },
  { day: 9, amount: 5800, percentage: 81 },
  { day: 10, amount: 4300, percentage: 60 },
  { day: 11, amount: 3900, percentage: 55 },
  { day: 12, amount: 4700, percentage: 66 },
  { day: 13, amount: 5100, percentage: 71 },
  { day: 14, amount: 3200, percentage: 45 },
  { day: 15, amount: 7100, percentage: 100 },
  { day: 16, amount: 6400, percentage: 90 },
  { day: 17, amount: 5500, percentage: 77 },
  { day: 18, amount: 4800, percentage: 67 },
  { day: 19, amount: 5300, percentage: 74 },
  { day: 20, amount: 4100, percentage: 57 },
  { day: 21, amount: 3700, percentage: 52 },
  { day: 22, amount: 4900, percentage: 69 },
  { day: 23, amount: 5600, percentage: 79 },
  { day: 24, amount: 6100, percentage: 86 },
  { day: 25, amount: 5400, percentage: 76 },
  { day: 26, amount: 4600, percentage: 65 },
  { day: 27, amount: 5000, percentage: 70 },
  { day: 28, amount: 5900, percentage: 83 },
  { day: 29, amount: 6300, percentage: 89 },
  { day: 30, amount: 6800, percentage: 96 },
]);

// Payment Methods
const paymentMethods = ref([
  {
    name: "Bank Transfer",
    amount: 7845,
    count: 23,
    percentage: 61,
    icon: Banknote,
  },
  {
    name: "Credit Card",
    amount: 3264,
    count: 18,
    percentage: 25,
    icon: CreditCard,
  },
  {
    name: "Mobile Payment",
    amount: 1523,
    count: 12,
    percentage: 12,
    icon: Smartphone,
  },
  { name: "Cash", amount: 215, count: 3, percentage: 2, icon: Wallet },
]);

// Sample payments data
const payments = ref([
  {
    id: 1,
    transactionId: "TXN-2024-0847",
    customerName: "Sarah Johnson",
    accountNo: "ACC-98472",
    invoiceNo: "INV-2024-001",
    method: "Credit Card",
    amount: 338.25,
    date: "2024-01-15",
    time: "09:32 AM",
    status: "Completed",
  },
  {
    id: 2,
    transactionId: "TXN-2024-0848",
    customerName: "Mike Chen",
    accountNo: "ACC-73621",
    invoiceNo: "INV-2024-002",
    method: "Bank Transfer",
    amount: 225.6,
    date: "2024-01-15",
    time: "10:15 AM",
    status: "Processing",
  },
  {
    id: 3,
    transactionId: "TXN-2024-0849",
    customerName: "ABC Corporation",
    accountNo: "ACC-10293",
    invoiceNo: "INV-2024-003",
    method: "Bank Transfer",
    amount: 4947.0,
    date: "2024-01-15",
    time: "10:45 AM",
    status: "Completed",
  },
  {
    id: 4,
    transactionId: "TXN-2024-0850",
    customerName: "Green Hotels",
    accountNo: "ACC-84756",
    invoiceNo: "INV-2024-004",
    method: "Mobile Payment",
    amount: 2636.25,
    date: "2024-01-15",
    time: "11:20 AM",
    status: "Failed",
  },
  {
    id: 5,
    transactionId: "TXN-2024-0851",
    customerName: "Emma Wilson",
    accountNo: "ACC-52841",
    invoiceNo: "INV-2024-005",
    method: "Credit Card",
    amount: 431.1,
    date: "2024-01-15",
    time: "11:55 AM",
    status: "Completed",
  },
  {
    id: 6,
    transactionId: "TXN-2024-0852",
    customerName: "Tech Park Campus",
    accountNo: "ACC-92847",
    invoiceNo: "INV-2024-006",
    method: "Bank Transfer",
    amount: 5762.4,
    date: "2024-01-15",
    time: "12:30 PM",
    status: "Processing",
  },
  {
    id: 7,
    transactionId: "TXN-2024-0853",
    customerName: "Robert Davis",
    accountNo: "ACC-62841",
    invoiceNo: "INV-2024-007",
    method: "Cash",
    amount: 253.13,
    date: "2024-01-15",
    time: "01:15 PM",
    status: "Completed",
  },
  {
    id: 8,
    transactionId: "TXN-2024-0854",
    customerName: "City Mall",
    accountNo: "ACC-10847",
    invoiceNo: "INV-2024-008",
    method: "Credit Card",
    amount: 5711.13,
    date: "2024-01-15",
    time: "02:00 PM",
    status: "Refunded",
  },
  {
    id: 9,
    transactionId: "TXN-2024-0855",
    customerName: "Lisa Anderson",
    accountNo: "ACC-39281",
    invoiceNo: "INV-2024-009",
    method: "Mobile Payment",
    amount: 273.38,
    date: "2024-01-15",
    time: "02:45 PM",
    status: "Completed",
  },
  {
    id: 10,
    transactionId: "TXN-2024-0856",
    customerName: "David Brown",
    accountNo: "ACC-48291",
    invoiceNo: "INV-2024-010",
    method: "Bank Transfer",
    amount: 234.3,
    date: "2024-01-15",
    time: "03:20 PM",
    status: "Processing",
  },
]);

// Methods
const getPaymentStatusVariant = (status) => {
  switch (status) {
    case "Completed":
      return "success";
    case "Processing":
      return "warning";
    case "Failed":
      return "destructive";
    case "Refunded":
      return "secondary";
    default:
      return "outline";
  }
};

const getMethodIcon = (method) => {
  switch (method) {
    case "Bank Transfer":
      return Banknote;
    case "Credit Card":
      return CreditCard;
    case "Mobile Payment":
      return Smartphone;
    case "Cash":
      return Wallet;
    default:
      return DollarSign;
  }
};
</script>
