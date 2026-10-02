# Sparklights 254

Website + admin for Sparklights 254 (Nairobi lighting).

## Quick start

```bash
cd web
npm install
npm run db:up          # Postgres on localhost:5433
npm run db:push
npm run db:seed
npm run dev
```

- Storefront: http://localhost:3000  
- Admin: http://localhost:3000/admin/login  
  - Email: `mary@sparklights.co.ke`  
  - Password: `Mary254`

## Contact (live on site)

- Phone / WhatsApp: +254 712 827 840  
- Email: marykamaa548@gmail.com  
- Address: Nyamakima, Duruma Road, Nairobi, Kenya

## Database

Local Postgres runs in Docker on **port 5433** (avoids clashing with any system Postgres on 5432).

```bash
npm run db:up      # start container
npm run db:down    # stop
npm run db:seed    # re-seed from src/lib/data.ts
npm run db:studio  # Prisma Studio
```

Seeded: 8 categories, 30 products, rooms, locations, guides, projects, admin user, site settings.

Public pages read from Postgres when available, and fall back to static data if the DB is offline.

## Admin

- Dashboard with counts and recent products  
- Products list with Live/Draft publish toggles  
- Categories overview with product counts and shop links  

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Next.js dev server |
| `npm run db:up` | Start Postgres |
| `npm run db:push` | Sync Prisma schema |
| `npm run db:seed` | Seed catalog + admin |
| `npm run build` | Production build |
