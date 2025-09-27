<template>
  <div class="p-6 space-y-6">
    <!-- Header Section -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p class="text-muted-foreground">
          Welcome back, {{ user.name }}. Here's your water utility overview.
        </p>
      </div>
      <div class="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <Download class="mr-2 h-4 w-4" />
          Export Report
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Calendar class="mr-2 h-4 w-4" />
              {{ selectedPeriod }}
              <ChevronDown class="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem @click="selectedPeriod = 'Today'">
              Today
            </DropdownMenuItem>
            <DropdownMenuItem @click="selectedPeriod = 'This Week'">
              This Week
            </DropdownMenuItem>
            <DropdownMenuItem @click="selectedPeriod = 'This Month'">
              This Month
            </DropdownMenuItem>
            <DropdownMenuItem @click="selectedPeriod = 'This Year'">
              This Year
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>

    <!-- Key Metrics Cards -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card v-for="metric in keyMetrics" :key="metric.title">
        <CardHeader
          class="flex flex-row items-center justify-between space-y-0 pb-2"
        >
          <CardTitle class="text-sm font-medium">
            {{ metric.title }}
          </CardTitle>
          <component :is="metric.icon" class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ metric.value }}</div>
          <p class="text-xs text-muted-foreground">
            <span
              :class="
                metric.trending === 'up' ? 'text-green-600' : 'text-red-600'
              "
            >
              <TrendingUp
                v-if="metric.trending === 'up'"
                class="inline h-3 w-3"
              />
              <TrendingDown v-else class="inline h-3 w-3" />
              {{ metric.change }}
            </span>
            from last month
          </p>
        </CardContent>
      </Card>
    </div>

    <!-- Charts Row -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <!-- Consumption Chart -->
      <Card class="col-span-4">
        <CardHeader>
          <CardTitle>Water Consumption Overview</CardTitle>
          <CardDescription>
            Monthly water consumption in cubic meters (m³)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="h-[300px] w-full">
            <!-- Chart placeholder - you would integrate a chart library here -->
            <div class="flex items-end justify-between h-full gap-2">
              <div
                v-for="(month, index) in consumptionData"
                :key="index"
                class="flex-1 bg-primary/10 hover:bg-primary/20 transition-colors rounded-t"
                :style="`height: ${month.value}%`"
                :title="`${month.month}: ${month.consumption} m³`"
              ></div>
            </div>
            <div
              class="flex justify-between mt-2 text-xs text-muted-foreground"
            >
              <span v-for="month in consumptionData" :key="month.month">
                {{ month.month }}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Revenue Distribution -->
      <Card class="col-span-3">
        <CardHeader>
          <CardTitle>Revenue by Category</CardTitle>
          <CardDescription> Current month revenue breakdown </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div
              v-for="category in revenueCategories"
              :key="category.name"
              class="space-y-2"
            >
              <div class="flex items-center justify-between text-sm">
                <div class="flex items-center gap-2">
                  <div :class="`h-2 w-2 rounded-full ${category.color}`"></div>
                  <span>{{ category.name }}</span>
                </div>
                <span class="font-medium"
                  >${{ category.amount.toLocaleString() }}</span
                >
              </div>
              <Progress :value="category.percentage" class="h-2" />
            </div>
            <Separator />
            <div class="flex items-center justify-between font-medium">
              <span>Total Revenue</span>
              <span class="text-lg">${{ totalRevenue.toLocaleString() }}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Recent Activities and Alerts -->
    <div class="grid gap-4 md:grid-cols-2">
      <!-- Recent Meter Readings -->
      <Card>
        <CardHeader class="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Meter Readings</CardTitle>
            <CardDescription> Latest meter reading activities </CardDescription>
          </div>
          <Button variant="ghost" size="sm">
            View All
            <ArrowRight class="ml-2 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div class="space-y-3">
            <div
              v-for="reading in recentReadings"
              :key="reading.id"
              class="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors"
            >
              <div class="flex items-center gap-3">
                <Avatar class="h-8 w-8">
                  <AvatarFallback>{{
                    reading.customerInitials
                  }}</AvatarFallback>
                </Avatar>
                <div>
                  <p class="text-sm font-medium">{{ reading.customerName }}</p>
                  <p class="text-xs text-muted-foreground">
                    Meter: {{ reading.meterId }}
                  </p>
                </div>
              </div>
              <div class="text-right">
                <p class="text-sm font-medium">{{ reading.consumption }} m³</p>
                <p class="text-xs text-muted-foreground">{{ reading.time }}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- System Alerts -->
      <Card>
        <CardHeader class="flex flex-row items-center justify-between">
          <div>
            <CardTitle>System Alerts</CardTitle>
            <CardDescription>
              Important notifications and alerts
            </CardDescription>
          </div>
          <Badge variant="destructive">{{ alerts.length }}</Badge>
        </CardHeader>
        <CardContent>
          <div class="space-y-3">
            <Alert
              v-for="alert in alerts"
              :key="alert.id"
              :class="
                alert.type === 'warning'
                  ? 'border-yellow-500'
                  : 'border-red-500'
              "
            >
              <AlertTriangle v-if="alert.type === 'warning'" class="h-4 w-4" />
              <AlertCircle v-else class="h-4 w-4" />
              <AlertTitle>{{ alert.title }}</AlertTitle>
              <AlertDescription>
                {{ alert.description }}
                <Button variant="link" class="h-auto p-0 text-xs">
                  View Details →
                </Button>
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Bottom Tables -->
    <div class="grid gap-4 lg:grid-cols-2">
      <!-- Pending Invoices -->
      <Card>
        <CardHeader class="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Pending Invoices</CardTitle>
            <CardDescription>
              Outstanding payments requiring attention
            </CardDescription>
          </div>
          <Badge>{{ pendingInvoices.length }} Pending</Badge>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead class="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="invoice in pendingInvoices" :key="invoice.id">
                <TableCell class="font-medium">
                  {{ invoice.customer }}
                </TableCell>
                <TableCell>${{ invoice.amount }}</TableCell>
                <TableCell>
                  <Badge
                    :variant="invoice.overdue ? 'destructive' : 'secondary'"
                  >
                    {{ invoice.dueDate }}
                  </Badge>
                </TableCell>
                <TableCell class="text-right">
                  <Button variant="ghost" size="sm">
                    <Mail class="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <!-- Top Consumers -->
      <Card>
        <CardHeader>
          <CardTitle>Top Water Consumers</CardTitle>
          <CardDescription>
            Highest consumption customers this month
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div
              v-for="(consumer, index) in topConsumers"
              :key="consumer.id"
              class="flex items-center gap-3"
            >
              <div
                class="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold"
              >
                {{ index + 1 }}
              </div>
              <div class="flex-1">
                <p class="text-sm font-medium">{{ consumer.name }}</p>
                <p class="text-xs text-muted-foreground">
                  Account: {{ consumer.accountNumber }}
                </p>
              </div>
              <div class="text-right">
                <p class="text-sm font-bold">{{ consumer.consumption }} m³</p>
                <p class="text-xs text-muted-foreground">
                  ${{ consumer.bill }}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  DollarSign,
  Users,
  Droplets,
  TrendingUp,
  TrendingDown,
  Download,
  Calendar,
  ChevronDown,
  ArrowRight,
  AlertTriangle,
  AlertCircle,
  Mail,
  Activity,
} from "lucide-vue-next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// User data
const user = ref({
  name: "John Doe",
});

// Selected period
const selectedPeriod = ref("This Month");

// Key metrics data
const keyMetrics = ref([
  {
    title: "Total Revenue",
    value: "$124,563",
    change: "+12.5%",
    trending: "up",
    icon: DollarSign,
  },
  {
    title: "Active Customers",
    value: "2,847",
    change: "+3.2%",
    trending: "up",
    icon: Users,
  },
  {
    title: "Water Consumption",
    value: "45,231 m³",
    change: "-5.4%",
    trending: "down",
    icon: Droplets,
  },
  {
    title: "Collection Rate",
    value: "94.7%",
    change: "+2.1%",
    trending: "up",
    icon: Activity,
  },
]);

// Consumption data for chart
const consumptionData = ref([
  { month: "Jan", consumption: 42000, value: 70 },
  { month: "Feb", consumption: 38000, value: 63 },
  { month: "Mar", consumption: 45000, value: 75 },
  { month: "Apr", consumption: 47000, value: 78 },
  { month: "May", consumption: 52000, value: 87 },
  { month: "Jun", consumption: 48000, value: 80 },
]);

// Revenue categories
const revenueCategories = ref([
  { name: "Residential", amount: 78500, percentage: 63, color: "bg-blue-500" },
  { name: "Commercial", amount: 32400, percentage: 26, color: "bg-green-500" },
  { name: "Industrial", amount: 13663, percentage: 11, color: "bg-purple-500" },
]);

const totalRevenue = ref(124563);

// Recent meter readings
const recentReadings = ref([
  {
    id: 1,
    customerName: "Sarah Johnson",
    customerInitials: "SJ",
    meterId: "MTR-2847",
    consumption: 234,
    time: "2 hours ago",
  },
  {
    id: 2,
    customerName: "Mike Chen",
    customerInitials: "MC",
    meterId: "MTR-9182",
    consumption: 156,
    time: "4 hours ago",
  },
  {
    id: 3,
    customerName: "Emma Wilson",
    customerInitials: "EW",
    meterId: "MTR-7364",
    consumption: 298,
    time: "6 hours ago",
  },
]);

// System alerts
const alerts = ref([
  {
    id: 1,
    type: "warning",
    title: "High Consumption Alert",
    description: "5 customers exceeded normal usage by 150%",
  },
  {
    id: 2,
    type: "error",
    title: "Meter Reading Failed",
    description: "3 smart meters offline in District 7",
  },
]);

// Pending invoices
const pendingInvoices = ref([
  {
    id: 1,
    customer: "ABC Corp",
    amount: 2458,
    dueDate: "Overdue",
    overdue: true,
  },
  {
    id: 2,
    customer: "Green Hotels",
    amount: 1823,
    dueDate: "Due in 3 days",
    overdue: false,
  },
  {
    id: 3,
    customer: "City Mall",
    amount: 3947,
    dueDate: "Due in 7 days",
    overdue: false,
  },
]);

// Top consumers
const topConsumers = ref([
  {
    id: 1,
    name: "Riverside Factory",
    accountNumber: "ACC-9847",
    consumption: 8453,
    bill: 12847,
  },
  {
    id: 2,
    name: "Grand Hotel Plaza",
    accountNumber: "ACC-7263",
    consumption: 6234,
    bill: 9456,
  },
  {
    id: 3,
    name: "Sunset Apartments",
    accountNumber: "ACC-3928",
    consumption: 4872,
    bill: 7398,
  },
  {
    id: 4,
    name: "Tech Park Campus",
    accountNumber: "ACC-8472",
    consumption: 3984,
    bill: 6047,
  },
]);
</script>
