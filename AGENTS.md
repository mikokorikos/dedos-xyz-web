## 0) TL;DR (stack recomendado)

* **Framework**: React 19 + (a) **Next.js 15** App Router (RSC), o (b) Vite + React Router si prefieres SPA puras. ([React][1])
* **Estilos & Design System**: **Tailwind CSS v4** (CSS‑first config + variables de tema) + **Radix UI Primitives** (accesibilidad), **shadcn/ui** patrón de componentes + **CVA** para variantes tipadas. ([Tailwind CSS][2])
* **Datos & formularios**: **TanStack Query v5** (fetch/caché) + **React Hook Form** (validación con **Zod**). ([TanStack][3])
* **Animación y microinteracciones**: **Motion** (ex‑Framer Motion). ([Motion][4])
* **Tokens de diseño**: **Style Dictionary** con formato **DTCG** (W3C). ([Style Dictionary][5])
* **Calidad**: ESLint flat config + TypeScript‑ESLint, Prettier, Vitest (unit), Playwright (e2e), Storybook + Chromatic (visual) + Lighthouse CI (perf). ([ESLint][6])

---

## 1) Principios de diseño que gobiernan este plan (resumen)

* **Contraste y accesibilidad**: texto normal ≥ **4.5:1**; nunca eliminar los indicadores de *focus*; estados `hover/active/disabled/loading` coherentes. 
* **Tipografía**: base **16 px**, interlineado ~**1.5**, longitud de línea ideal **60–75** caracteres. 
* **Espaciado**: rejilla de **8 px** (o 4 px) y ritmo consistente. 
* **Tamaño táctil**: controles mínimos **44–48 px** en móvil. 
* **Animación**: transiciones de **100–300 ms** con *easing* suave y microinteracciones con propósito. 
* **Responsive**: *mobile‑first* + *breakpoints* claros + pruebas de zoom/lectura. 

> Estos puntos sintetizan tu PDF y se reflejan en los agentes, los tokens y los *do’s & don’ts* de este documento. 

---

## 2) Agentes (automatizaciones) y *quality gates*

Cada **agente** corre en CI y protege una dimensión de calidad. Incluyo herramientas, umbrales y *checklists*.

### 2.1 Agente de **Tokens & Theming**

**Objetivo**: tokens únicos de verdad → CSS variables → consumo en React/Tailwind.
**Herramientas**: Style Dictionary + formato DTCG; Tailwind v4 `@theme`. ([Style Dictionary][5])
**Gate**:

* No se permite duplicar color/espaciado/tipo fuera de tokens.
* Build falla si el *lint* de tokens o la exportación a CSS/TS rompe.
  **Do’s**: tokens semánticos (`color.bg.surface`, `color.text.primary`, `space.2`, `radius.sm`); modos **light/dark** desde tokens. **Don’t**: hardcodear hex o px en componentes. 

### 2.2 Agente de **Accesibilidad (A11y)**

**Objetivo**: WCAG AA por defecto.
**Herramientas**: axe‑core/Playwright o Storybook + a11y addon. **Focus visible obligatorio**. ([npm][7])
**Gate**:

* Sin violaciones bloqueantes (contraste, *focus*, roles, labels).
* Navegación por teclado en rutas y componentes críticos.
  **Do’s**: usar Radix/React Aria para *focus management* y roles. ([Radix UI][8])

### 2.3 Agente de **Visual Regression**

**Objetivo**: UI estable.
**Herramientas**: Storybook + Chromatic Visual Tests. ([Storybook][9])
**Gate**:

* Cualquier *diff* visual requiere aprobación explícita de diseño.

### 2.4 Agente de **Rendimiento**

**Objetivo**: Web Vitals verdes.
**Herramientas**: Lighthouse CI con presupuestos. ([web.dev][10])
**Gate**:

* LCP ≤ 2.5 s, INP/TTI en verde, tamaño JS por ruta bajo presupuesto.

### 2.5 Agente de **Código & Tipado**

**Objetivo**: coherencia y DX.
**Herramientas**: ESLint flat config + typescript‑eslint; Prettier. ([ESLint][6])
**Gate**:

* `eslint --max-warnings=0`; TS `strict` sin `any` implícito.

### 2.6 Agente de **Pruebas (Unit/E2E)**

**Objetivo**: fiabilidad.
**Herramientas**: Vitest (unit/snapshots), Playwright (e2e). ([Vitest][11])
**Gate**:

* Cobertura mínima en UI núcleo, *smoke e2e* por ruta.

### 2.7 Agente de **Docs de Componentes**

**Objetivo**: catálogo vivo.
**Herramientas**: Storybook Docs + ejemplos de accesibilidad/estados. ([Storybook][9])

### 2.8 Agente de **Entrega**

**Objetivo**: versiones seguras.
**Herramientas**: Changesets (o similar) + *release notes* auto.

---

## 3) Arquitectura de repo (monorepo opcional)

```
/apps/web              # Next.js 15 (o Vite) app
/packages/ui           # Design system (React + Radix + Tailwind v4 + CVA)
/packages/tokens       # Tokens (DTCG JSON) + Style Dictionary build
/packages/config       # eslint.config.js, tsconfig, playwright.config.ts, etc.
/.storybook            # Storybook
```

* **Next.js 15** para SSR/SSG/RSC y alineado con React 19; o **Vite** si prefieres SPA/MPA ligeras. ([Next.js][12])
* **Radix Primitives** como base accesible y *unstyled*. ([Radix UI][8])
* **Tailwind v4** en modo CSS‑first para mapear tokens → `@theme`. ([Tailwind CSS][2])

---

## 4) TypeScript de diseño (tokens) + consumo

### 4.1 Tokens en formato DTCG

`/packages/tokens/src/color.json`

```json
{
  "$schema": "https://design-tokens.org/tr/drafts/format/schema.json",
  "color": {
    "brand": { "primary": { "value": "#2962FF", "type": "color" } },
    "text": {
      "primary": { "value": "#212121", "type": "color" },
      "secondary": { "value": "#616161", "type": "color" }
    },
    "feedback": {
      "success": { "value": "#2E7D32", "type": "color" },
      "error":   { "value": "#D32F2F", "type": "color" }
    }
  },
  "space": { "2": { "value": "8px", "type": "dimension" }, "3": { "value": "12px", "type": "dimension" } },
  "radius": { "sm": { "value": "4px", "type": "dimension" }, "md": { "value": "8px", "type": "dimension" } }
}
```

* **Style Dictionary** transforma a **CSS variables** y/o TS. ([Style Dictionary][5])

### 4.2 Build de tokens

`scripts/build-tokens.mjs`

```js
import StyleDictionary from 'style-dictionary';

export default StyleDictionary.extend({
  source: ['packages/tokens/src/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'packages/tokens/dist/',
      files: [{ destination: 'tokens.css', format: 'css/variables' }]
    }
  }
}).buildAllPlatforms();
```

> DTCG es el formato estandarizado de la W3C CG para interoperabilidad entre herramientas. ([W3C][13])

### 4.3 Tailwind v4 — **CSS‑first theming**

`apps/web/src/styles/theme.css`

```css
@import "tailwindcss";

@theme {
  --color-brand-primary: var(--color-brand-primary); /* expuesto por tokens.css */
  --radius-sm: var(--radius-sm);
  --radius-md: var(--radius-md);
  --space-2: var(--space-2);
}

/* Modo oscuro (ejemplo) */
@layer theme {
  :root[data-theme="dark"]{
    --color-text-primary: oklch(98% 0 0); /* ejemplo alternativo */
  }
}
```

> Tailwind v4 permite configurar tokens vía `@theme` y expone variables a toda la app. ([Tailwind CSS][2])

---

## 5) Componentes base (React + Radix + CVA + Motion)

### 5.1 Botón accesible con variantes tipadas

`packages/ui/src/button.tsx`

```tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

const buttonStyles = cva(
  "inline-flex items-center justify-center rounded-[var(--radius-sm)] " +
  "px-4 py-2 font-medium transition-colors focus-visible:outline " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:  "bg-[var(--color-brand-primary)] text-white hover:brightness-110 active:brightness-90",
        outline:  "border border-current text-[var(--color-brand-primary)] bg-transparent hover:bg-black/5",
        ghost:    "bg-transparent hover:bg-black/5"
      },
      size: { sm: "h-9 text-sm", md: "h-10", lg: "h-12 text-base" }
    },
    defaultVariants: { variant: "primary", size: "md" }
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonStyles> & { asChild?: boolean };

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild, variant, size, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={buttonStyles({ variant, size }) + (className ? ` ${className}` : "")}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
```

* **Radix Slot** permite composición; **CVA** tipa variantes y evita *stringly types*. ([Radix UI][8])
* Estados `hover/active/focus/disabled` cubiertos; *focus visible* siempre presente (accesibilidad). 

### 5.2 Microinteracción (Motion)

```tsx
import { motion } from "motion/react";
export function Pulse({ children }: { children: React.ReactNode }) {
  return <motion.span whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.02 }}>{children}</motion.span>;
}
```

> Usa duraciones **100–300 ms** y *easings* suaves; evita animar “todo a la vez”.  ([Motion][4])

### 5.3 Formularios con RHF + Zod

```tsx
import { useForm } from "react-hook-form";
import { z } from "zod";
const Schema = z.object({ email: z.string().email(), name: z.string().min(1) });
type FormData = z.infer<typeof Schema>;

export function ProfileForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>();
  return (
    <form
      onSubmit={handleSubmit(() => {/* mutate */})}
      aria-busy={isSubmitting}
    >
      <label>Email<input {...register("email")} /></label>
      {errors.email && <p role="alert">{errors.email.message}</p>}
      <Button type="submit">Guardar</Button>
    </form>
  );
}
```

> RHF es performante y flexible; Zod añade validación *type‑first*. ([React Hook Form][14])

---

## 6) Do’s & Don’ts (diseño, accesibilidad y UX)

**Color y contraste**

* ✅ Usa paletas semánticas (primario, éxito, error) y verifica contraste **≥ 4.5:1** (texto normal).
* ❌ No uses grises claros sobre blanco para texto principal; evita colores brillantes sin ajustar en *dark mode*. 

**Tipografía**

* ✅ Base **16 px** (cuerpo), **line‑height ~1.5**, y jerarquía (H1/H2/H3) consistente. Longitud de línea **60–75** chars.
* ❌ Evita ULTRALIGHT en tamaños pequeños; no abuses de MAYÚSCULAS sin *letter‑spacing*. 

**Espaciado y layout**

* ✅ Rejilla de **8 px**; `gap` consistente; `max-width` en textos largos.
* ❌ No mezcles 7 px aquí y 11 px allá; evita líneas de texto demasiado largas. 

**Tacto y estados**

* ✅ Superficies clicables **44–48 px** en móvil; estados `hover/active/focus/disabled/loading` bien definidos.
* ❌ Nunca elimines el *outline* de *focus* sin reemplazarlo por uno visible. 

**Animaciones / microinteracciones**

* ✅ Duraciones **100–300 ms**, *ease‑out* para entradas, *ease‑in* para salidas; anima lo que aporte significado.
* ❌ Evita animaciones simultáneas masivas o > 500 ms que ralenticen la UX. 

**Responsive**

* ✅ *Mobile‑first*, *breakpoints* claros, pruebas en zoom y *landscape*.
* ❌ No dependas exclusivamente de *hover* en móvil; contempla *touch*. 

---

## 7) Plan de desarrollo (fases)

### Fase 0 — Setup

* Monorepo + CI (GitHub Actions): instalar agentes 2.1–2.8.
* Base **Next 15** (o Vite) + **React 19**. ([Next.js][12])
* Tailwind v4 + tokens CSS; Storybook inicial. ([Tailwind CSS][2])

### Fase 1 — Tokens & DS mínimo viable

* Definir tokens (color/space/radius/typography) en DTCG + build con Style Dictionary. ([Style Dictionary][5])
* Componentes base: **Button, Input, Select, Card, Modal, Toast** (Radix + CVA). ([Radix UI][8])
* Agentes de accesibilidad y visual regression operativos. ([Storybook][9])

### Fase 2 — Formularios y datos

* RHF + Zod; patrones de validación; estados de error/success estandarizados. ([React Hook Form][14])
* TanStack Query (cacheo, errores, *optimistic updates*). ([TanStack][3])

### Fase 3 — Microinteracciones y rendimiento

* Entradas/salidas con Motion; *skeletons* donde aplique. ([Motion][4])
* Presupuestos Lighthouse CI + ajuste de *Core Web Vitals*. ([web.dev][10])

### Fase 4 — Tematizado y oscurecimiento

* Temas **light/dark** y variantes de marca basadas en tokens; *a11y* re‑test (contraste). 

---

## 8) Definition of Done (por PR)

* Historias en Storybook con **estados** y **test visual** OK. ([Storybook][9])
* **axe** sin violaciones bloqueantes + navegación por teclado. ([npm][7])
* **Lighthouse CI** ≥ presupuestos definidos. ([web.dev][10])
* **ESLint** (flat) sin *warnings* + **TS strict** + **Vitest** verde. ([ESLint][6])

---

## 9) Apéndice — snippets de configuración

**ESLint (flat)**

```js
// eslint.config.js
import ts from "typescript-eslint";
export default [
  { ignores: ["**/dist/**"] },
  ...ts.configs.recommended,
  { rules: { "@typescript-eslint/explicit-module-boundary-types": "off" } }
];
```

> ESLint flat config es el formato moderno recomendado. ([ESLint][6])

**Vitest + Playwright**

```ts
// vitest.config.ts
import { defineConfig } from "vitest/config";
export default defineConfig({ test: { globals: true, environment: "jsdom", coverage: { reporter: ["text","html"] } } });

// playwright.config.ts
import { defineConfig, devices } from "@playwright/test";
export default defineConfig({ use: { ...devices["Desktop Chrome"] }, reporter: [["list"]] });
```

> Vitest es Vite‑native; Playwright cubre Chromium/WebKit/Firefox y CI. ([Vitest][11])

**Lighthouse CI (presupuesto simple)**

```js
// lighthouserc.js
module.exports = {
  ci: {
    collect: { numberOfRuns: 3, url: ["http://localhost:3000/"] },
    assert: { assertions: { "categories:performance": ["error", { minScore: 0.9 }] } }
  }
};
```

> Integración de Lighthouse CI para vigilar *performance budgets*. ([web.dev][10])

---

## 10) Por qué estas librerías “del momento”

* **React 19** + **Next 15**: soporte oficial, mejoras de DX y alineación con el ecosistema moderno. ([React][1])
* **Tailwind v4**: *CSS‑first*, variables de tema y *builds* muy rápidos. ([Tailwind CSS][2])
* **Radix UI**: *primitives* accesibles, API consistente y TypeScript. ([Radix UI][8])
* **TanStack Query v5**: *fetch/caché* de estado del servidor robusto. ([TanStack][3])
* **Motion**: animaciones declarativas de alto nivel para React. ([Motion][4])
* **RHF + Zod**: DX excelente en formularios y validación *type‑first*. ([React Hook Form][14])
* **ESLint flat / Vitest / Playwright / Storybook+Chromatic / Lighthouse CI**: *toolchain* consolidada para calidad integral. ([ESLint][6])

---


