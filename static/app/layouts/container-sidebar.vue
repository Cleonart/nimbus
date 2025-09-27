<script setup>
import {
  ChevronDown,
  ChevronRight,
  ChevronsUpDown,
  LogOut,
  User,
  Settings,
  Grid3x3,
  ExternalLink,
  MoonIcon,
  BellIcon,
  Sun,
} from "lucide-vue-next";
import { ref } from "vue";
import { useRoute } from "nuxt/app";
import {
  SidebarProvider,
  SidebarTrigger,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Define props - only navigation
const props = defineProps({
  navigation: {
    type: Array,
    default: () => [],
  },
});

// Get current route
const colorMode = useColorMode();
const route = useRoute();

// Track which items are expanded
const expandedItems = ref({});

// Hardcoded company data for now
const companies = ref([
  { id: 1, name: "UD. Dua Puteri", plan: "Pro" },
  { id: 2, name: "Tech Corp", plan: "Team" },
  { id: 3, name: "StartUp Co", plan: "Free" },
]);

const selectedCompany = ref({
  id: 1,
  name: "UD. Dua Puteri",
  plan: "Pro",
});

// Hardcoded user data for now
const user = ref({
  name: "John Doe",
  email: "john@example.com",
  avatar: "",
});

// Hardcoded other apps data
const otherApps = ref([
  {
    id: 1,
    name: "Analytics Dashboard",
    description: "Real-time data analytics",
    icon: "📊",
    url: "https://analytics.example.com",
  },
  {
    id: 2,
    name: "CRM System",
    description: "Customer relationship management",
    icon: "👥",
    url: "https://crm.example.com",
  },
  {
    id: 3,
    name: "Email Marketing",
    description: "Campaign management tools",
    icon: "📧",
    url: "https://email.example.com",
  },
  {
    id: 4,
    name: "Project Manager",
    description: "Task and project tracking",
    icon: "📋",
    url: "https://projects.example.com",
  },
  {
    id: 5,
    name: "Cloud Storage",
    description: "File storage and sharing",
    icon: "☁️",
    url: "https://storage.example.com",
  },
  {
    id: 6,
    name: "HR Portal",
    description: "Human resources management",
    icon: "🏢",
    url: "https://hr.example.com",
  },
]);

// Modal state
const isAppsModalOpen = ref(false);

const toggleExpanded = (title) => {
  expandedItems.value[title] = !expandedItems.value[title];
};

const isExpanded = (title) => {
  return expandedItems.value[title] || false;
};

// Check if a link is active
const isActiveLink = (url) => {
  if (!url) return false;

  // Exact match
  if (route.path === url) return true;

  return false;
};

// Check if parent has active child
const hasActiveChild = (childs) => {
  if (!childs || !Array.isArray(childs)) return false;
  return childs.some((child) => isActiveLink(child.url));
};

// Auto-expand parent if child is active
const initExpandedItems = () => {
  props.navigation.forEach((section) => {
    if (section.group && section.items) {
      section.items.forEach((item) => {
        if (item.childs && hasActiveChild(item.childs)) {
          expandedItems.value[`${section.group}-${item.title}`] = true;
        }
      });
    } else if (section.childs && hasActiveChild(section.childs)) {
      expandedItems.value[section.title] = true;
    }
  });
};

// Initialize expanded items on mount
initExpandedItems();

// Get user initials for avatar fallback
const getUserInitials = (name) => {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

// Handle logout
const handleLogout = () => {
  console.log("Logout clicked");
  // Add your logout logic here
};
</script>

<template>
  <SidebarProvider
    style="--sidebar-width: 13.5rem; --sidebar-width-mobile: 20rem"
  >
    <Sidebar>
      <!-- Company Selector Header -->
      <SidebarHeader class="border-b">
        <!-- App Name and Apps Grid -->
        <div class="flex items-center justify-between px-2 py-2">
          <div class="flex items-center gap-2">
            <div
              class="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-sm"
            >
              SI
            </div>
            <span class="font-semibold text-lg">SILICON</span>
          </div>

          <!-- Apps Grid Button -->
          <Dialog v-model:open="isAppsModalOpen">
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" class="h-8 w-8">
                <Grid3x3 class="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>All Applications</DialogTitle>
                <DialogDescription>
                  Access all your workspace applications
                </DialogDescription>
              </DialogHeader>
              <div class="grid grid-cols-3 gap-4 py-4">
                <a
                  v-for="app in otherApps"
                  :key="app.id"
                  :href="app.url"
                  target="_blank"
                  class="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer group"
                >
                  <div
                    class="text-3xl group-hover:scale-110 transition-transform"
                  >
                    {{ app.icon }}
                  </div>
                  <div class="text-center">
                    <p class="text-sm font-medium">{{ app.name }}</p>
                    <p class="text-xs text-muted-foreground mt-1">
                      {{ app.description }}
                    </p>
                  </div>
                  <ExternalLink
                    class="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </a>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <!-- Company Selector -->
        <AppCompanySelector />
      </SidebarHeader>

      <!-- Navigation Content -->
      <SidebarContent>
        <template v-for="(section, index) in navigation" :key="index">
          <!-- Section with group label -->
          <SidebarGroup v-if="section.group">
            <SidebarGroupLabel>{{
              section.groupLabel || section.group
            }}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <template v-for="item in section.items" :key="item.title">
                  <SidebarMenuItem v-if="!item.childs">
                    <SidebarMenuButton
                      asChild
                      :isActive="isActiveLink(item.url)"
                    >
                      <NuxtLink :to="item.url">
                        <component :is="item.icon" v-if="item.icon" />
                        <span>{{ item.title }}</span>
                      </NuxtLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <!-- Menu item with children -->
                  <Collapsible
                    v-else
                    :open="isExpanded(`${section.group}-${item.title}`)"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          @click="
                            toggleExpanded(`${section.group}-${item.title}`)
                          "
                          :class="{
                            'sidebar-parent-active': hasActiveChild(
                              item.childs
                            ),
                          }"
                        >
                          <component :is="item.icon" v-if="item.icon" />
                          <span>{{ item.title }}</span>
                          <ChevronRight
                            class="ml-auto h-4 w-4 transition-transform duration-200"
                            :class="{
                              'rotate-90': isExpanded(
                                `${section.group}-${item.title}`
                              ),
                            }"
                          />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          <SidebarMenuSubItem
                            v-for="child in item.childs"
                            :key="child.title"
                          >
                            <SidebarMenuSubButton
                              asChild
                              :class="{
                                'sidebar-active': isActiveLink(child.url),
                              }"
                            >
                              <NuxtLink
                                :to="child.url"
                                class="flex items-center gap-2"
                              >
                                <component :is="child.icon" v-if="child.icon" />
                                <span>{{ child.title }}</span>
                              </NuxtLink>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                </template>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <!-- Flat navigation items (backward compatibility) -->
          <SidebarGroup v-else-if="section.title">
            <SidebarGroupContent>
              <SidebarMenu>
                <!-- Regular menu item without children -->
                <SidebarMenuItem v-if="!section.childs">
                  <SidebarMenuButton
                    asChild
                    :isActive="isActiveLink(section.url)"
                  >
                    <NuxtLink :to="section.url">
                      <component :is="section.icon" v-if="section.icon" />
                      <span>{{ section.title }}</span>
                    </NuxtLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <!-- Menu item with children -->
                <Collapsible v-else :open="isExpanded(section.title)">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        @click="toggleExpanded(section.title)"
                        :class="{
                          'sidebar-parent-active': hasActiveChild(
                            section.childs
                          ),
                        }"
                      >
                        <component :is="section.icon" v-if="section.icon" />
                        <span>{{ section.title }}</span>
                        <ChevronRight
                          class="ml-auto h-4 w-4 transition-transform duration-200"
                          :class="{ 'rotate-90': isExpanded(section.title) }"
                        />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        <SidebarMenuSubItem
                          v-for="child in section.childs"
                          :key="child.title"
                        >
                          <SidebarMenuSubButton
                            asChild
                            :class="{
                              'sidebar-active': isActiveLink(child.url),
                            }"
                          >
                            <NuxtLink :to="child.url">
                              <component :is="child.icon" v-if="child.icon" />
                              <span>{{ child.title }}</span>
                            </NuxtLink>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </template>
      </SidebarContent>

      <!-- User Account Footer -->
      <SidebarFooter class="border-t">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              class="flex w-full items-center gap-2 px-2 py-3 text-left hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
            >
              <Avatar class="h-8 w-8">
                <AvatarImage :src="user.avatar" :alt="user.name" />
                <AvatarFallback>{{
                  getUserInitials(user.name)
                }}</AvatarFallback>
              </Avatar>
              <div class="flex-1 text-sm">
                <p class="font-medium">{{ user.name }}</p>
                <p class="text-xs text-muted-foreground">{{ user.email }}</p>
              </div>
              <ChevronDown class="h-4 w-4 opacity-50" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent class="w-56" align="start" side="top">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem class="cursor-pointer">
              <NuxtLink to="/profile" class="flex items-center w-full">
                <User class="mr-2 h-4 w-4" />
                <span>Profile</span>
              </NuxtLink>
            </DropdownMenuItem>
            <DropdownMenuItem class="cursor-pointer">
              <NuxtLink to="/settings" class="flex items-center w-full">
                <Settings class="mr-2 h-4 w-4" />
                <span>Settings</span>
              </NuxtLink>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              @click="handleLogout"
              class="cursor-pointer text-red-600"
            >
              <LogOut class="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
    <SidebarInset>
      <header
        style="z-index: 5"
        class="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4"
      >
        <div class="flex flex-1 items-center gap-2 px-3">
          <SidebarTrigger class="-ml-1" />
          <Separator orientation="vertical" class="mr-2 !h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem class="hidden md:block">
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator class="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div class="ml-auto px-3 flex gap-3">
          <Button variant="ghost" size="icon">
            <BellIcon />
          </Button>
          <span>
            <Button
              variant="ghost"
              size="icon"
              @click="
                () => {
                  if (colorMode.value === 'light') {
                    colorMode.preference = 'dark';
                  } else {
                    colorMode.preference = 'light';
                  }
                }
              "
            >
              <MoonIcon v-if="colorMode.value == 'light'" />
              <Sun v-if="colorMode.value == 'dark'" />
            </Button>
          </span>
        </div>
      </header>

      <section class="mb-10">
        <slot />
      </section>

      <WindowFooter />
    </SidebarInset>
  </SidebarProvider>
</template>

<style scoped>
/* Custom styles for active state visibility */
.sidebar-active {
  background-color: #f3f3f3;
  color: hsl(var(--primary));
  font-weight: 500;
}

.sidebar-parent-active {
  background-color: hsl(var(--primary) / 0.05);
}
</style>
