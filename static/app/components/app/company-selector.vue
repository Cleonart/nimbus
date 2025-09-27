<script setup>
import { ref } from "vue";
import { ChevronsUpDown } from "lucide-vue-next";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

// Handle company selection
const handleSelectCompany = (company) => {
    selectedCompany.value = company;
};


</script>

<template>
    <div>
        <DropdownMenu style="cursor: pointer;">
            <DropdownMenuTrigger asChild>
                <button
                    style="cursor: pointer;"
                    class="flex w-full items-center gap-2 px-2 py-3 text-left hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
                    <div class="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                        <span class="text-xs font-bold">
                            {{ selectedCompany.name?.slice(0, 2).toUpperCase() }}
                        </span>
                    </div>
                    <div class="flex-1 text-sm">
                        <p class="font-medium">{{ selectedCompany.name }}</p>
                        <p class="text-xs text-muted-foreground">
                            {{ selectedCompany.plan }} Plan
                        </p>
                    </div>
                    <ChevronsUpDown class="h-4 w-4 opacity-50" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent class="w-56" align="start">
                <DropdownMenuLabel>Companies</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem v-for="company in companies" :key="company.id" @click="handleSelectCompany(company)"
                    class="cursor-pointer">
                    <div class="flex items-center gap-2">
                        <div class="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10">
                            <span class="text-xs font-bold">
                                {{ company.name?.slice(0, 2).toUpperCase() }}
                            </span>
                        </div>
                        <div class="flex-1">
                            <p class="text-sm">{{ company.name }}</p>
                            <p class="text-xs text-muted-foreground">
                                {{ company.plan }}
                            </p>
                        </div>
                        <div v-if="company.id === selectedCompany.id" class="h-2 w-2 rounded-full bg-primary" />
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
</template>