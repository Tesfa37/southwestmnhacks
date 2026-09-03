// Vitest runs on defaults apart from the "@/" alias, which mirrors the tsconfig
// path so tests can import modules that use it (lib/sponsors/customer.ts and
// friends). Without this, Vite cannot resolve "@/lib/stripe" at import time.

import path from "node:path"
import { defineConfig } from "vitest/config"

export default defineConfig({
  resolve: {
    alias: { "@": path.resolve(import.meta.dirname) },
  },
})
