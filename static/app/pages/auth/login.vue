<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="w-[360px]">
      <Card class="px-1.5 py-2">
        <CardContent class="space-y-6 pt-6">
          <div class="flex mb-8">
            <div class="flex items-center gap-2">
              <div
                class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center"
              >
                <svg
                  class="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <span class="text-xl font-semibold">Nimbus</span>
            </div>
          </div>

          <div class="">
            <h2 class="text-2xl font-semibold">Selamat Datang</h2>
            <p class="text-sm text-muted-foreground mt-1">
              Masuk kembali menggunakan akun anda
            </p>
          </div>

          <!-- Login Form -->
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div class="space-y-2">
              <Label for="email">Usename</Label>
              <Input
                id="email"
                v-model="form.email"
                placeholder="m@example.com"
                required
              />
            </div>

            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <Label for="password">Password</Label>
                <NuxtLink
                  to="/forgot-password"
                  class="text-sm text-primary hover:underline"
                >
                  Lupa password?
                </NuxtLink>
              </div>
              <Input
                id="password"
                v-model="form.password"
                type="password"
                required
              />
            </div>

            <Button type="submit" class="w-full"> Masuk </Button>
          </form>

          <div class="text-center text-sm">
            Belum punya akun?
            <NuxtLink to="/signup" class="text-primary hover:underline">
              <u>Daftar disini</u>
            </NuxtLink>
          </div>

          <!-- Terms -->
          <div class="text-center text-xs text-muted-foreground">
            Dengan melanjutkan anda setuju dengan
            <NuxtLink to="/terms" class="underline hover:text-primary">
              Syarat
            </NuxtLink>
            dan
            <NuxtLink to="/privacy" class="underline hover:text-primary">
              Ketentuan yang berlaku
            </NuxtLink>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const router = useRouter();

// Form data
const form = ref({
  email: "",
  password: "",
});

// Handle form submission
const handleSubmit = async () => {
  try {
    // TODO: Implement your login logic here
    // For example, call your authentication API

    // const { data } = await $fetch('/api/auth/login', {
    //   method: 'POST',
    //   body: form.value
    // })

    // Show success message

    // Redirect to dashboard or home
    await router.push("/dashboard");
  } catch (error) {
    // Show error message
  }
};

// Handle Apple login
const handleAppleLogin = async () => {
  try {
    // TODO: Implement Apple OAuth login
    console.log("Apple login");

    // Example:
    // await signInWithApple()
  } catch (error) {}
};

// Handle Google login
const handleGoogleLogin = async () => {
  try {
    // TODO: Implement Google OAuth login
    console.log("Google login");

    // Example:
    // await signInWithGoogle()
  } catch (error) {}
};
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
