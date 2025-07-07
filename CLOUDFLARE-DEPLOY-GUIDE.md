# 🚀 Cloudflare Pages Deploy Rehberi

## Adım 1: Cloudflare Dashboard'a Git
**URL**: https://dash.cloudflare.com

## Adım 2: Workers & Pages
1. Sol menüden **Workers & Pages** tıkla
2. **Create a project** butonuna bas
3. **Connect to Git** seç

## Adım 3: Repository Seç
1. **GitHub** seç (eğer ilk kez bağlıyorsan authorize et)
2. **ozgeahras/tunel-frontend** repository'sini seç
3. **Begin setup** tıkla

## Adım 4: Build Settings
```
Project name: tunel-frontend
Production branch: main
Root directory: (BOŞ BIRAK)
Build command: npm run build
Build output directory: out
Environment variables: (BOŞ BIRAK)
```

## Adım 5: Deploy
1. **Save and Deploy** butonuna bas
2. Build log'unu izle (2-3 dakika sürer)
3. URL'ni al: `https://tunel-frontend.pages.dev`

## ✅ Test Et
Deploy tamamlandıktan sonra:
- Ana sayfa: `https://tunel-frontend.pages.dev`
- Jobs: `https://tunel-frontend.pages.dev/jobs`
- Germany: `https://tunel-frontend.pages.dev/germany`

## 🔗 Final URLs
- **Frontend**: https://tunel-frontend.pages.dev
- **Admin API**: https://tunel-admin.ozgeahras.workers.dev ✅

Both running on Cloudflare's global edge network! 🌍⚡