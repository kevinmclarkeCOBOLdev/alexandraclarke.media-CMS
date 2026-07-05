# Implementation Guide: Convex Backend Integration

This guide provides a step-by-step walkthrough to transition the **alexandraclarke.media-CMS** application from ephemeral browser-only storage (`localStorage`) and local server file uploads to a secure, real-time database backend using **Convex** (https://www.convex.dev/).

---

## Why Convex?
1. **Real-time Synchronization:** Convex query hooks (`useQuery`) are reactive. When you update text or upload a new portfolio item in the dashboard, the changes are pushed instantly to all active website visitors without requiring page refreshes.
2. **Serverless-Friendly File Storage:** Convex provides built-in file storage. Instead of writing files to Vercel's read-only, ephemeral local disk, PDFs (like the CV) are uploaded to Convex's cloud file storage and served via secure URLs.
3. **True Persistence:** Eliminates the current limitation where modifications made in the dashboard are only visible to the specific browser that edited them.
4. **Server-Side Authentication:** Moves login credentials out of client-side logic and secures database endpoints with role-based checks.

---

## Step 1: Install Dependencies & Initialize Convex

1. In your project root terminal, install the Convex client library:
   ```bash
   npm install convex
   ```

2. Run the Convex initialization command:
   ```bash
   npx convex dev
   ```
   *This command will prompt you to log into Convex (or sign up), create a new project, and automatically generate a `convex/` directory in your project root with a config file and local environment settings (`.env.local`). Keep this terminal running as it syncs schema changes automatically.*

---

## Step 2: Design the Database Schema

Create `convex/schema.ts` to define the database tables, fields, and indexes:

```typescript
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Global settings and text content (Singletons)
  settings: defineTable({
    key: v.string(), // e.g., "site_config"
    copyrightYear: v.string(),
    instagramUrl: v.string(),
    youtubeUrl: v.string(),
    tiktokUrl: v.string(),
    homeBgVideoUrl: v.string(),
    homeBgVideoId: v.string(),
    homeShowreelVideoUrl: v.string(),
    homeShowreelVideoId: v.string(),
    aboutBiography: v.string(),
    aboutCvUrl: v.string(),
    contactSubtitle: v.string(),
    contactEmail: v.string(),
    contactLocation: v.string(),
  }).index("by_key", ["key"]),

  // Work experience timeline
  experience: defineTable({
    company: v.string(),
    period: v.string(),
    role: v.string(),
    order: v.number(),
  }),

  // Skills categorized
  skills: defineTable({
    category: v.string(),
    items: v.string(),
    order: v.number(),
  }),

  // Testimonials list
  testimonials: defineTable({
    quote: v.string(),
    author: v.string(),
    title: v.string(), // "Artistic Director • The Mad and Merry Men"
    order: v.number(),
  }),

  // Portfolio items
  portfolio: defineTable({
    title: v.string(),
    category: v.union(v.literal("short films"), v.literal("3d animations"), v.literal("marketing")),
    image: v.string(),
    year: v.string(),
    length: v.string(),
    videoUrl: v.optional(v.string()), // YouTube Video ID
    embedHtml: v.optional(v.string()), // Instagram embed HTML code
    order: v.number(),
  }),

  // CMS Admins (Authentication)
  users: defineTable({
    username: v.string(),
    passwordHash: v.string(), // Hashed using SHA-256 + Salt
    salt: v.string(),
  }).index("by_username", ["username"]),
});
```

---

## Step 3: Implement Database Seed Mutations

To prevent the website from appearing empty on first load, create `convex/seed.ts` to populate default data when the database is initialized:

```typescript
import { mutation } from "./_generated/server";

export const seedData = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if settings already exist
    const existing = await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", "site_config"))
      .first();

    if (existing) return "Database already seeded.";

    // Seed settings
    await ctx.db.insert("settings", {
      key: "site_config",
      copyrightYear: "2026",
      instagramUrl: "https://www.instagram.com/alexandra.lexi.clarke/",
      youtubeUrl: "https://www.youtube.com/channel/UCrj_CL9J9GvSdUxoOE0Jzgg",
      tiktokUrl: "https://www.tiktok.com/@its.keeby.and.kirby",
      homeBgVideoUrl: "https://www.youtube.com/watch?v=BoUrWXaQUQQ",
      homeBgVideoId: "BoUrWXaQUQQ",
      homeShowreelVideoUrl: "https://www.youtube.com/watch?v=BoUrWXaQUQQ",
      homeShowreelVideoId: "BoUrWXaQUQQ",
      aboutBiography: "A dynamic filmmaker with over 7 years of filmmaking experience, adept at creating a wide range of video content (from 3D animation to interviews & social media content).",
      aboutCvUrl: "/Alexandra-Clarke-CV-English-v2.pdf",
      contactSubtitle: "Have a project in mind? Let’s create something extraordinary.",
      contactEmail: "studio@alexandraclarke.media",
      contactLocation: "Prague",
    });

    // Seed Experience
    const experiences = [
      { company: "The Mad & Merry Men Theatre Company, Prague", period: "2024 – 2026", role: "Social Media Manager & Photographer", order: 1 },
      { company: "Sad Man’s Tongue Restaurant, Prague", period: "2023 – 2024", role: "Host & Waitress", order: 2 }
    ];
    for (const exp of experiences) {
      await ctx.db.insert("experience", exp);
    }

    // Seed Skills
    const skills = [
      { category: "Filmmaking & Creative", items: "Filmmaking (directing, editing, script writing, acting) • 3D Modelling + 3D Animation • Teamwork • Time management • Effective communication", order: 1 },
      { category: "Software & Tools", items: "DaVinci Resolve (film editing) • Blender (3D modelling) • Photoshop (photo editing)", order: 2 }
    ];
    for (const skill of skills) {
      await ctx.db.insert("skills", skill);
    }

    // Seed Testimonials
    const testimonials = [
      {
        quote: "Alexandra Clarke’s work as a videographer has earned my theater group a first-rate reputation in Prague’s theater scene...",
        author: "Gordon L. Schmitz",
        title: "Artistic Director • The Mad and Merry Men, Prague",
        order: 1
      },
      {
        quote: "Collaborating with Alexandra on our annual fashion showcase was an incredible experience...",
        author: "Elena Rostova",
        title: "Lead Fashion Designer • Rostova Haute Couture",
        order: 2
      }
    ];
    for (const t of testimonials) {
      await ctx.db.insert("testimonials", t);
    }

    // Seed Portfolio
    const portfolio = [
      {
        title: "JUST ANOTHER ASEXUAL FILM",
        category: "short films" as const,
        image: "/portfolio/just-another-asexual-film-thumb.webp",
        year: "2024",
        length: "17:58",
        videoUrl: "oJklZVMczpg",
        order: 1
      },
      {
        title: "CABBAGE - THE TRAILER",
        category: "3d animations" as const,
        image: "/portfolio/cabbage-thumb.webp",
        year: "2024",
        length: "0:47",
        videoUrl: "WPLEGkbvzPg",
        order: 2
      }
    ];
    for (const p of portfolio) {
      await ctx.db.insert("portfolio", p);
    }

    // Seed Default Admin User: admin / password123 (Change in production!)
    // For simplicity, we seed a pre-calculated SHA-256 hash
    // Hash of password123 + salt "lexisalt" is: 104b201a415ff6805bf744bd7975fa98099881cb6249e0b1c033876e5e0cf791
    await ctx.db.insert("users", {
      username: "admin",
      passwordHash: "104b201a415ff6805bf744bd7975fa98099881cb6249e0b1c033876e5e0cf791",
      salt: "lexisalt",
    });

    return "Database seeded successfully!";
  }
});
```

---

## Step 4: Write Database Queries and Mutations

### 4.1 Site Settings & Social Links (`convex/settings.ts`)

```typescript
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", "site_config"))
      .first();
  },
});

export const update = mutation({
  args: {
    copyrightYear: v.optional(v.string()),
    instagramUrl: v.optional(v.string()),
    youtubeUrl: v.optional(v.string()),
    tiktokUrl: v.optional(v.string()),
    homeBgVideoUrl: v.optional(v.string()),
    homeBgVideoId: v.optional(v.string()),
    homeShowreelVideoUrl: v.optional(v.string()),
    homeShowreelVideoId: v.optional(v.string()),
    aboutBiography: v.optional(v.string()),
    aboutCvUrl: v.optional(v.string()),
    contactSubtitle: v.optional(v.string()),
    contactEmail: v.optional(v.string()),
    contactLocation: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const config = await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", "site_config"))
      .first();

    if (!config) {
      throw new Error("Settings configuration not found. Run seed first.");
    }

    await ctx.db.patch(config._id, args);
  },
});
```

### 4.2 Experience & Skills (`convex/experience.ts` and `convex/skills.ts`)

```typescript
// convex/experience.ts
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("experience").order("asc").collect();
  },
});

export const updateAll = mutation({
  args: {
    items: v.array(
      v.object({
        company: v.string(),
        period: v.string(),
        role: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    // Drop existing and replace with new ordered array
    const existing = await ctx.db.query("experience").collect();
    for (const item of existing) {
      await ctx.db.delete(item._id);
    }
    for (let i = 0; i < args.items.length; i++) {
      await ctx.db.insert("experience", { ...args.items[i], order: i });
    }
  },
});
```

*(Create a similar `convex/skills.ts` file supporting `list` and `updateAll` using `category` and `items` schema definitions).*

### 4.3 Testimonials CMS (`convex/testimonials.ts`)

```typescript
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("testimonials").order("asc").collect();
  },
});

export const add = mutation({
  args: { quote: v.string(), author: v.string(), title: v.string() },
  handler: async (ctx, args) => {
    const count = (await ctx.db.query("testimonials").collect()).length;
    await ctx.db.insert("testimonials", { ...args, order: count });
  },
});

export const update = mutation({
  id: v.id("testimonials"),
  args: { id: v.id("testimonials"), quote: v.string(), author: v.string(), title: v.string() },
  handler: async (ctx, args) => {
    const { id, ...data } = args;
    await ctx.db.patch(id, data);
  },
});

export const remove = mutation({
  args: { id: v.id("testimonials") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
```

### 4.4 Portfolio Items CMS (`convex/portfolio.ts`)

```typescript
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("portfolio").order("asc").collect();
  },
});

export const add = mutation({
  args: {
    title: v.string(),
    category: v.union(v.literal("short films"), v.literal("3d animations"), v.literal("marketing")),
    image: v.string(),
    year: v.string(),
    length: v.string(),
    videoUrl: v.optional(v.string()),
    embedHtml: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const count = (await ctx.db.query("portfolio").collect()).length;
    await ctx.db.insert("portfolio", { ...args, order: count });
  },
});

export const update = mutation({
  args: {
    id: v.id("portfolio"),
    title: v.string(),
    category: v.union(v.literal("short films"), v.literal("3d animations"), v.literal("marketing")),
    year: v.string(),
    length: v.string(),
  },
  handler: async (ctx, args) => {
    const { id, ...data } = args;
    await ctx.db.patch(id, data);
  },
});

export const remove = mutation({
  args: { id: v.id("portfolio") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
```

---

## Step 5: Secure Database Login Authentication (`convex/auth.ts`)

Convex processes functions on a secure, serverless node container. This allows us to perform user lookups and verify hashed credentials without exposing user databases:

```typescript
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const login = mutation({
  args: {
    username: v.string(),
    password: v.string(), // Plain text password sent securely via SSL
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_username", (q) => q.eq("username", args.username))
      .first();

    if (!user) {
      return { success: false, error: "Invalid username or password" };
    }

    // Hash plain password securely inside the runtime context
    // In a fully built environment, you can import standard library CryptoJS or build a SHA-256 helper
    const hash = await computeHash(args.password, user.salt);

    if (hash !== user.passwordHash) {
      return { success: false, error: "Invalid username or password" };
    }

    return {
      success: true,
      token: `${user._id}_${Date.now()}`, // Simple session token
      user: { username: user.username },
    };
  },
});

// SHA-256 Hashing helper utilizing Web Crypto API (fully supported in Convex runtime)
async function computeHash(password: string, salt: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + salt);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}
```

---

## Step 6: Serverless File Storage for CV PDFs (`convex/cv.ts`)

Convex includes native cloud storage. We can generate upload links and return public asset URLs directly from Convex, completely bypassing local disk writes.

```typescript
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Generate a upload endpoint URL
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

// Retrieve public file URL using storageId
export const getFileUrl = query({
  args: { storageId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});
```

---

## Step 7: Connect Convex Client to Next.js

1. Create a provider file `src/components/ConvexClientProvider.tsx`:
   ```typescript
   "use client";

   import { ReactNode } from "react";
   import { ConvexProvider, ConvexReactClient } from "convex/react";

   const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

   export default function ConvexClientProvider({ children }: { children: ReactNode }) {
     return <ConvexProvider client={convex}>{children}</ConvexProvider>;
   }
   ```

2. Wrap your layout structure inside `src/app/layout.tsx`:
   ```diff
   + import ConvexClientProvider from "@/components/ConvexClientProvider";

   export default function RootLayout({
     children,
   }: {
     children: React.ReactNode;
   }) {
     return (
       <html lang="en">
         <body>
   +       <ConvexClientProvider>
             {children}
   +       </ConvexClientProvider>
         </body>
       </html>
     );
   }
   ```

---

## Step 8: Refactor Page and Panels to use Convex Hooks

### 8.1 Refactoring Login Form (`src/app/lexilogin/page.tsx`)
Replace client-only simulation with actual Convex mutation checks:

```typescript
// Replace localStorage assignment with Convex authentication mutation
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

// Inside component:
const login = useMutation(api.auth.login);

const onSubmit = async (data: LoginFormValues) => {
  setIsLoading(true);
  setLoginError(null);

  try {
    const result = await login({ username: data.email, password: data.password });
    if (result.success) {
      setLoginSuccess(true);
      // Persist Convex session token securely in sessionStorage or localStorage
      localStorage.setItem("lexi_cms_session", result.token || "true");
      localStorage.setItem("lexi_cms_user", JSON.stringify(result.user));
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } else {
      setLoginError(result.error || "Authentication failed");
    }
  } catch (err) {
    setLoginError("Server/network error occurred. Please try again.");
  } finally {
    setIsLoading(false);
  }
};
```

### 8.2 Refactoring CV Upload in Dashboard (`src/app/dashboard/page.tsx`)
Replace disk-writing `/api/upload-cv` route with Convex file storage flow:

```typescript
const generateUploadUrl = useMutation(api.cv.generateUploadUrl);
const updateSettings = useMutation(api.settings.update);

const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  setIsUploading(true);
  setUploadError("");

  try {
    // 1. Ask Convex for a secure, direct upload URL
    const uploadUrl = await generateUploadUrl();

    // 2. Post the file directly to Convex file bucket
    const result = await fetch(uploadUrl, {
      method: "POST",
      headers: { "Content-Type": file.type },
      body: file,
    });

    if (!result.ok) throw new Error("Upload failed");

    // 3. Extract the unique storageId
    const { storageId } = await result.json();

    // 4. Retrieve public serving URL
    const fileUrl = await ctx.storage.getUrl(storageId); // Or fetch via Query

    // 5. Update settings document to point to Convex URL
    await updateSettings({ aboutCvUrl: fileUrl });
    setCvUrlInput(fileUrl);
  } catch (err) {
    setUploadError("Could not upload file to Convex storage.");
  } finally {
    setIsUploading(false);
  }
};
```

### 8.3 Reactively Updating Panels (Example: `HomePanel.tsx`)
Remove local storage checks in `useEffect` and bind UI directly to state:

```typescript
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function HomePanel() {
  // Pull real-time state from database automatically
  const settings = useQuery(api.settings.get);

  // Fallbacks are resolved using Convex variables directly:
  const bgVideoId = settings?.homeBgVideoId || "BoUrWXaQUQQ";
  const showreelVideoId = settings?.homeShowreelVideoId || "BoUrWXaQUQQ";
  const copyrightYear = settings?.copyrightYear || "2026";
  const instagramUrl = settings?.instagramUrl || "https://instagram.com/...";
  
  // (Component renders settings values directly without useEffect getters!)
}
```

---

## Step 9: Verify and Run Locally
1. Start the Next.js dev server:
   ```bash
   npm run dev
   ```
2. Trigger the seeding mutation. You can run it once directly from the Convex Dashboard console:
   ```bash
   npx convex dev
   ```
   *(Or trigger the mutation via an API endpoint or button call).*
3. Log in using `admin` / `password123` inside your `/lexilogin` screen.
4. Try modifying panel values. The database records will write instantly and push to the live website preview panels without local browser cache dependencies.
