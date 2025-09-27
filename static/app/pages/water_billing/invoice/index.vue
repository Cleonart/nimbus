<template>
  <div class="p-6 space-y-6">
    <!-- Header Section -->
    <div
      class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
    >
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Billing & Invoicing</h1>
        <p class="text-muted-foreground">
          Manage customer bills and generate invoices
        </p>
      </div>
      <div class="flex items-center gap-2">
        <Button @click="isGenerateInvoiceOpen = true">
          <FileText class="mr-2 h-4 w-4" />
          Generate Invoice
        </Button>
        <Button variant="outline">
          <Calculator class="mr-2 h-4 w-4" />
          Bulk Billing
        </Button>
      </div>
    </div>

    <!-- Summary Cards -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      <Card v-for="summary in summaryCards" :key="summary.label">
        <CardContent class="p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-medium text-muted-foreground">
                {{ summary.label }}
              </p>
              <p class="text-xl font-bold">{{ summary.value }}</p>
              <p class="text-xs text-muted-foreground mt-1">
                {{ summary.subtext }}
              </p>
            </div>
            <component
              :is="summary.icon"
              :class="`h-8 w-8 ${summary.iconColor}`"
            />
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Quick Actions & Filters -->
    <div class="flex flex-col gap-4 lg:flex-row lg:items-center">
      <!-- Search -->
      <div class="relative flex-1">
        <Search
          class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          v-model="searchQuery"
          placeholder="Search by invoice number, customer name, or account..."
          class="pl-10"
        />
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap gap-2">
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
            <DropdownMenuItem @click="selectedStatus = 'Paid'">
              <CheckCircle class="mr-2 h-4 w-4 text-green-600" />
              Paid
            </DropdownMenuItem>
            <DropdownMenuItem @click="selectedStatus = 'Pending'">
              <Clock class="mr-2 h-4 w-4 text-yellow-600" />
              Pending
            </DropdownMenuItem>
            <DropdownMenuItem @click="selectedStatus = 'Overdue'">
              <AlertCircle class="mr-2 h-4 w-4 text-red-600" />
              Overdue
            </DropdownMenuItem>
            <DropdownMenuItem @click="selectedStatus = 'Cancelled'">
              <XCircle class="mr-2 h-4 w-4 text-gray-600" />
              Cancelled
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

    <!-- Invoices Table -->
    <Card>
      <CardHeader class="pb-4">
        <div class="flex items-center justify-between">
          <CardTitle>Recent Invoices</CardTitle>
          <div class="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Mail class="mr-2 h-4 w-4" />
              Send Reminders
            </Button>
            <Button variant="ghost" size="sm">
              <Printer class="mr-2 h-4 w-4" />
              Print Selected
            </Button>
          </div>
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
                <TableHead class="w-[120px]">Invoice No.</TableHead>
                <TableHead class="min-w-[200px]">Customer</TableHead>
                <TableHead class="w-[120px]">Billing Period</TableHead>
                <TableHead class="text-right w-[100px]">Consumption</TableHead>
                <TableHead class="text-right w-[100px]">Amount</TableHead>
                <TableHead class="w-[100px]">Due Date</TableHead>
                <TableHead class="w-[100px]">Status</TableHead>
                <TableHead class="text-center w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="invoice in invoices" :key="invoice.id">
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <span class="font-medium text-sm">{{
                    invoice.invoiceNo
                  }}</span>
                </TableCell>
                <TableCell>
                  <div>
                    <p class="font-medium text-sm">
                      {{ invoice.customerName }}
                    </p>
                    <p class="text-xs text-muted-foreground">
                      {{ invoice.accountNo }}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <span class="text-sm">{{ invoice.billingPeriod }}</span>
                </TableCell>
                <TableCell class="text-right">
                  <div class="flex items-center justify-end gap-1">
                    <Droplets class="h-3 w-3 text-blue-500" />
                    <span class="text-sm">{{ invoice.consumption }} m³</span>
                  </div>
                </TableCell>
                <TableCell class="text-right">
                  <span class="font-semibold text-sm"
                    >${{ invoice.amount.toFixed(2) }}</span
                  >
                </TableCell>
                <TableCell>
                  <span class="text-sm">{{ invoice.dueDate }}</span>
                </TableCell>
                <TableCell>
                  <Badge :variant="getStatusVariant(invoice.status)">
                    {{ invoice.status }}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div class="flex items-center justify-center gap-1">
                    <Button variant="ghost" size="icon" class="h-7 w-7">
                      <Eye class="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon" class="h-7 w-7">
                      <Download class="h-3 w-3" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" class="h-7 w-7">
                          <MoreHorizontal class="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Send class="mr-2 h-4 w-4" />
                          Send to Customer
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit class="mr-2 h-4 w-4" />
                          Edit Invoice
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy class="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem v-if="invoice.status === 'Pending'">
                          <CheckCircle class="mr-2 h-4 w-4" />
                          Mark as Paid
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem class="text-red-600">
                          <Trash2 class="mr-2 h-4 w-4" />
                          Delete
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
            <span class="font-medium">156</span> invoices
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
                16
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

    <!-- Bottom Section: Payment Overview & Recent Payments -->
    <div class="grid gap-6 lg:grid-cols-2">
      <!-- Payment Methods Distribution -->
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription
            >Distribution of payment methods this month</CardDescription
          >
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div
              v-for="method in paymentMethods"
              :key="method.name"
              class="space-y-2"
            >
              <div class="flex items-center justify-between text-sm">
                <div class="flex items-center gap-2">
                  <component
                    :is="method.icon"
                    class="h-4 w-4 text-muted-foreground"
                  />
                  <span>{{ method.name }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="font-medium"
                    >${{ method.amount.toLocaleString() }}</span
                  >
                  <span class="text-xs text-muted-foreground"
                    >({{ method.percentage }}%)</span
                  >
                </div>
              </div>
              <Progress :value="method.percentage" class="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Recent Payments -->
      <Card>
        <CardHeader>
          <CardTitle>Recent Payments</CardTitle>
          <CardDescription>Latest payment transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-3">
            <div
              v-for="payment in recentPayments"
              :key="payment.id"
              class="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div class="flex items-center gap-3">
                <Avatar class="h-8 w-8">
                  <AvatarFallback>{{ payment.initials }}</AvatarFallback>
                </Avatar>
                <div>
                  <p class="text-sm font-medium">{{ payment.customerName }}</p>
                  <p class="text-xs text-muted-foreground">
                    {{ payment.time }}
                  </p>
                </div>
              </div>
              <div class="text-right">
                <p class="text-sm font-medium text-green-600">
                  +${{ payment.amount }}
                </p>
                <p class="text-xs text-muted-foreground">
                  {{ payment.method }}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Generate Invoice Dialog -->
    <Dialog v-model:open="isGenerateInvoiceOpen">
      <DialogContent class="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Generate New Invoice</DialogTitle>
          <DialogDescription>
            Create a new invoice for a customer
          </DialogDescription>
        </DialogHeader>
        <div class="grid gap-4 py-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="grid gap-2">
              <Label htmlFor="customer">Customer</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select customer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cust1">John Doe - ACC-98472</SelectItem>
                  <SelectItem value="cust2">Jane Smith - ACC-73621</SelectItem>
                  <SelectItem value="cust3">ABC Corp - ACC-10293</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div class="grid gap-2">
              <Label htmlFor="period">Billing Period</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jan24">January 2024</SelectItem>
                  <SelectItem value="feb24">February 2024</SelectItem>
                  <SelectItem value="mar24">March 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          <div class="grid grid-cols-2 gap-4">
            <div class="grid gap-2">
              <Label>Previous Reading</Label>
              <Input type="number" placeholder="0" value="12450" />
            </div>
            <div class="grid gap-2">
              <Label>Current Reading</Label>
              <Input type="number" placeholder="0" value="12684" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="grid gap-2">
              <Label>Consumption (m³)</Label>
              <Input type="number" value="234" disabled />
            </div>
            <div class="grid gap-2">
              <Label>Rate per m³</Label>
              <Input type="number" value="1.25" />
            </div>
          </div>

          <Separator />

          <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span>Water Charges</span>
              <span>$292.50</span>
            </div>
            <div class="flex justify-between text-sm">
              <span>Service Fee</span>
              <span>$15.00</span>
            </div>
            <div class="flex justify-between text-sm">
              <span>Tax (10%)</span>
              <span>$30.75</span>
            </div>
            <Separator />
            <div class="flex justify-between font-semibold">
              <span>Total Amount</span>
              <span class="text-lg">$338.25</span>
            </div>
          </div>

          <div class="grid gap-2">
            <Label>Notes (Optional)</Label>
            <Textarea placeholder="Add any notes for this invoice" rows="2" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="isGenerateInvoiceOpen = false">
            Cancel
          </Button>
          <Button @click="isGenerateInvoiceOpen = false">
            Generate Invoice
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  FileText,
  Calculator,
  Search,
  CircleDot,
  ChevronDown,
  Calendar,
  Download,
  Mail,
  Printer,
  Eye,
  MoreHorizontal,
  Send,
  Edit,
  Copy,
  CheckCircle,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Clock,
  AlertCircle,
  XCircle,
  DollarSign,
  TrendingUp,
  Receipt,
  CreditCard,
  Smartphone,
  Banknote,
  Droplets,
  Users,
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
const selectedStatus = ref("All");
const dateRange = ref("This Month");
const isGenerateInvoiceOpen = ref(false);

// Summary Cards
const summaryCards = ref([
  {
    label: "Total Billed",
    value: "$48,574",
    subtext: "This month",
    icon: DollarSign,
    iconColor: "text-green-600",
  },
  {
    label: "Collected",
    value: "$39,847",
    subtext: "82% collected",
    icon: TrendingUp,
    iconColor: "text-blue-600",
  },
  {
    label: "Outstanding",
    value: "$8,727",
    subtext: "23 invoices",
    icon: Receipt,
    iconColor: "text-yellow-600",
  },
  {
    label: "Overdue",
    value: "$3,264",
    subtext: "8 invoices",
    icon: AlertCircle,
    iconColor: "text-red-600",
  },
  {
    label: "Customers",
    value: "2,847",
    subtext: "Active accounts",
    icon: Users,
    iconColor: "text-purple-600",
  },
]);

// Sample invoices data
const invoices = ref([
  {
    id: 1,
    invoiceNo: "INV-2024-001",
    customerName: "Sarah Johnson",
    accountNo: "ACC-98472",
    billingPeriod: "Jan 2024",
    consumption: 234,
    amount: 338.25,
    dueDate: "2024-02-15",
    status: "Paid",
  },
  {
    id: 2,
    invoiceNo: "INV-2024-002",
    customerName: "Mike Chen",
    accountNo: "ACC-73621",
    billingPeriod: "Jan 2024",
    consumption: 156,
    amount: 225.6,
    dueDate: "2024-02-15",
    status: "Pending",
  },
  {
    id: 3,
    invoiceNo: "INV-2024-003",
    customerName: "ABC Corporation",
    accountNo: "ACC-10293",
    billingPeriod: "Jan 2024",
    consumption: 3420,
    amount: 4947.0,
    dueDate: "2024-02-10",
    status: "Overdue",
  },
  {
    id: 4,
    invoiceNo: "INV-2024-004",
    customerName: "Green Hotels",
    accountNo: "ACC-84756",
    billingPeriod: "Jan 2024",
    consumption: 1823,
    amount: 2636.25,
    dueDate: "2024-02-15",
    status: "Pending",
  },
  {
    id: 5,
    invoiceNo: "INV-2024-005",
    customerName: "Emma Wilson",
    accountNo: "ACC-52841",
    billingPeriod: "Jan 2024",
    consumption: 298,
    amount: 431.1,
    dueDate: "2024-02-15",
    status: "Paid",
  },
  {
    id: 6,
    invoiceNo: "INV-2024-006",
    customerName: "Tech Park Campus",
    accountNo: "ACC-92847",
    billingPeriod: "Jan 2024",
    consumption: 3984,
    amount: 5762.4,
    dueDate: "2024-02-12",
    status: "Pending",
  },
  {
    id: 7,
    invoiceNo: "INV-2024-007",
    customerName: "Robert Davis",
    accountNo: "ACC-62841",
    billingPeriod: "Jan 2024",
    consumption: 175,
    amount: 253.13,
    dueDate: "2024-02-15",
    status: "Paid",
  },
  {
    id: 8,
    invoiceNo: "INV-2024-008",
    customerName: "City Mall",
    accountNo: "ACC-10847",
    billingPeriod: "Jan 2024",
    consumption: 3947,
    amount: 5711.13,
    dueDate: "2024-02-08",
    status: "Overdue",
  },
  {
    id: 9,
    invoiceNo: "INV-2024-009",
    customerName: "Lisa Anderson",
    accountNo: "ACC-39281",
    billingPeriod: "Jan 2024",
    consumption: 189,
    amount: 273.38,
    dueDate: "2024-02-15",
    status: "Cancelled",
  },
  {
    id: 10,
    invoiceNo: "INV-2024-010",
    customerName: "David Brown",
    accountNo: "ACC-48291",
    billingPeriod: "Jan 2024",
    consumption: 162,
    amount: 234.3,
    dueDate: "2024-02-15",
    status: "Paid",
  },
]);

// Payment Methods
const paymentMethods = ref([
  { name: "Bank Transfer", amount: 24580, percentage: 62, icon: Banknote },
  { name: "Credit Card", amount: 9876, percentage: 25, icon: CreditCard },
  { name: "Mobile Payment", amount: 3947, percentage: 10, icon: Smartphone },
  { name: "Cash", amount: 1444, percentage: 3, icon: DollarSign },
]);

// Recent Payments
const recentPayments = ref([
  {
    id: 1,
    customerName: "Sarah Johnson",
    initials: "SJ",
    amount: "338.25",
    method: "Credit Card",
    time: "2 hours ago",
  },
  {
    id: 2,
    customerName: "Robert Davis",
    initials: "RD",
    amount: "253.13",
    method: "Bank Transfer",
    time: "5 hours ago",
  },
  {
    id: 3,
    customerName: "Emma Wilson",
    initials: "EW",
    amount: "431.10",
    method: "Mobile Payment",
    time: "1 day ago",
  },
  {
    id: 4,
    customerName: "David Brown",
    initials: "DB",
    amount: "234.30",
    method: "Cash",
    time: "2 days ago",
  },
]);

// Methods
const getStatusVariant = (status) => {
  switch (status) {
    case "Paid":
      return "success";
    case "Pending":
      return "warning";
    case "Overdue":
      return "destructive";
    case "Cancelled":
      return "secondary";
    default:
      return "outline";
  }
};
</script>
