# Steelify – Metallsilhouetten Webshop

Willkommen bei **Steelify**, dem Webshop zur Bestellung individueller Metallsilhouetten aus Kundenfotos.

## 🔧 Installation (lokal)

1. Repository klonen
```bash
git clone https://github.com/okanoeztuerk/steelify.git
cd steelify
```

2. Abhängigkeiten installieren
```bash
npm install
```

3. `.env.local` Datei anlegen und folgende Variablen setzen:
```env
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_live_...
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/steelify
NEXT_PUBLIC_ADMIN_PASSWORD=deinadminpasswort
```

4. Entwicklungsserver starten
```bash
npm run dev
```

## 🚀 Deployment mit Vercel

- Projekt bei [vercel.com](https://vercel.com) importieren
- Umgebungsvariablen wie oben setzen
- Deploy starten – fertig!

## 📁 Projektstruktur

- `pages/` – Next.js Seiten (Homepage, Admin, API-Routen)
- `public/` – statische Assets und exportierte SVG/DXF-Dateien
- `components/` – UI-Komponenten (Tailwind, shadcn)
- `lib/` – z. B. MongoDB-Verbindung

## ✅ Features

- Bild-Upload mit Vorschau
- Automatische Silhouetten-Erzeugung (SVG, DXF)
- Produktkonfiguration (Größe, Farbe)
- Bezahlung per Stripe
- Admin-Panel mit Bestellverwaltung & Export (CSV, PDF)

---

> © 2025 Steelify. Alle Rechte vorbehalten.
