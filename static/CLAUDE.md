# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev` or `yarn dev` (starts on http://localhost:3000)
- **Build for production**: `npm run build` or `yarn build`
- **Preview production build**: `npm run preview` or `yarn preview`
- **Install dependencies**: `npm install` or `yarn install`
- **Post-install setup**: `npm run postinstall` (runs `nuxt prepare`)

## Architecture Overview

This is a Nuxt.js 4 application with a sophisticated ERP frontend architecture built for Silicon ERP system integration with Odoo backend.

### Core Technologies
- **Framework**: Nuxt.js 4 with Vue 3
- **UI Framework**: Tailwind CSS 4 with shadcn-nuxt components
- **Component Library**: Reka UI for Vue primitives
- **HTTP Client**: Axios for API communication
- **Data Management**: TanStack Table for complex table interactions
- **State Management**: VueUse composables and custom Nuxt composables
- **Icons**: Lucide Vue Next
- **Utilities**: Moment.js for dates, Underscore.js for data manipulation

### Project Structure

The project follows Nuxt.js conventions with additional organization:

- **`app/`** - Main application directory (Nuxt 4 structure)
  - **`components/`** - Vue components organized by purpose
    - `app/` - Application-specific components (company-selector, sidebar-content-header)
    - `ui/` - Reusable UI components from shadcn (organized by component type)
  - **`composables/`** - Business logic and API integration
    - `APIOdoo/` - Comprehensive Odoo API integration layer
    - `useAPI.js`, `useAccessRights.js`, `useIndexedDB.js` - Core composables
  - **`layouts/`** - Layout components (container-sidebar.vue for main layout)
  - **`pages/`** - Route pages (ovoya_farm_egg, water_billing with nested routes)
  - **`plugins/`** - Nuxt plugins (ssr-width.ts)
  - **`lib/`** - Utility functions and shared logic

- **`core/`** - Business logic utilities (outside app directory)
  - Common functions for farms, translations, dates, stock management, etc.

### API Architecture

The application uses a sophisticated Odoo API integration layer:

- **Base Layer** (`app/composables/APIOdoo/base/`): Core authentication and HTTP handling
- **Core Layer** (`app/composables/APIOdoo/core/`): Odoo-specific API wrapper classes
- **Models Layer** (`app/composables/APIOdoo/models/`): 50+ composables for different Odoo models (accounting, HR, inventory, POS, etc.)
- **Configuration**: API endpoint configuration in `config.js`

Key patterns:
- Each model has a dedicated composable (e.g., `useAccountAccount.js`, `useHREmployee.js`)
- Models extend the base `Odoo` class with CRUD operations
- All API calls include timezone context (`tz: "Asia/Makassar"`) and caching invalidation
- Standardized methods: `create()`, `write()`, `search_read()`, `read()`, `read_group()`

### Component Architecture

- **UI Components**: Located in `app/components/ui/`, following shadcn-vue patterns
  - Each component category has its own directory with index.ts exports
  - Components use Reka UI primitives with Tailwind CSS styling
  - TypeScript support with proper type exports

- **Layout System**: Sidebar-based layout with:
  - Collapsible navigation with nested menu support
  - Company selector integration
  - Dark/light mode toggle
  - Breadcrumb navigation
  - User account dropdown

### Business Domain

This ERP system covers multiple business domains:
- **Accounting**: Accounts, payments, journals, bank management
- **Human Resources**: Employees, payslips, job positions
- **Inventory**: Stock management, transfers, production
- **Point of Sale**: POS sessions, payments, lines
- **Farm Management**: Egg production, incubation, sorting (specialized for agricultural business)
- **Water Billing**: Utility management system
- **Sales & CRM**: Orders, loyalty programs, vouchers

### Development Patterns

- **Composables**: Extensive use of composables for business logic and API integration
- **TypeScript**: Partial TypeScript adoption (some files .js, some .ts)
- **Styling**: Tailwind CSS with CSS variables for theming
- **Navigation**: Dynamic navigation structure passed as props to sidebar layout
- **State**: Reactive state management using Vue 3 composition API patterns
- **Utilities**: Centralized utility functions in `core/` directory for business logic

### Important Configuration

- **Tailwind**: Uses v4 with Vite plugin integration
- **shadcn-nuxt**: UI components located in `./app/components/ui`
- **Color Mode**: Dark/light theme support with `@nuxtjs/color-mode`
- **Aliases**: Standard Nuxt aliases (@/components, @/composables, etc.)

The application is designed as a comprehensive ERP frontend with deep Odoo integration, supporting complex business workflows across multiple domains.