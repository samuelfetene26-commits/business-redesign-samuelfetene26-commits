# ADDIS-EAT - Quick Start (5 Minutes)

## ⚡ TL;DR - Get Running in 5 Steps

### 1️⃣ Download Project
- Go to Manus Management UI → Code panel → Download as ZIP
- Extract to your PC (e.g., `C:\Users\YourName\Desktop\addis-eat`)

### 2️⃣ Install Node.js
- Download from https://nodejs.org/ (LTS version)
- Install with default settings
- Verify: Open Command Prompt/Terminal, type `node --version`

### 3️⃣ Install Dependencies
- Open Terminal/Command Prompt in your project folder
- Run: `npm install -g pnpm` (one time only)
- Run: `pnpm install`
- Wait for completion (~2-3 minutes)

### 4️⃣ Start Server
- In same terminal, run: `pnpm dev`
- You'll see: `Local: http://localhost:3000/`

### 5️⃣ Open in Browser
- Copy: `http://localhost:3000/`
- Paste in your browser
- Login with: `demo@addis.com` / `demo123`

✅ **Done! ADDIS-EAT is running!**

---

## 🎯 What to Try First

### As Customer (Role: Customer)
1. Browse restaurants on home page
2. Click a restaurant to see menu
3. Add items to cart
4. Go to cart, adjust quantities
5. Checkout (mock order)
6. View orders page

### As Restaurant (Role: Restaurant)
1. View dashboard with stats
2. Check "Orders" tab for incoming orders
3. View "Menu" tab with all items
4. Check "Analytics" tab for charts

---

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| "pnpm not found" | Run: `npm install -g pnpm` |
| Port 3000 in use | Run: `pnpm dev -- --port 3001` |
| Blank page | Press: `Ctrl+Shift+R` (refresh) |
| Can't login | Use: `demo@addis.com` / `demo123` |
| Dependencies fail | Run: `pnpm install` again |

---

## 📂 Key Files to Know

```
addis-eat/
├── client/src/
│   ├── pages/           ← Page components (Home, Cart, Dashboard, etc.)
│   ├── stores/          ← State management (auth, cart)
│   └── lib/mockData.ts  ← Mock restaurants & orders
├── package.json         ← Dependencies
└── LOCAL_SETUP_GUIDE.md ← Detailed setup guide
```

---

## 🔗 Useful Links

- **Manus Management UI** - Publish & manage your app
- **Local Dev Server** - `http://localhost:3000/`
- **Node.js Download** - https://nodejs.org/
- **React Docs** - https://react.dev

---

## 💡 Pro Tips

1. **Keep terminal open** while developing - it shows errors
2. **Hard refresh browser** if changes don't appear: `Ctrl+Shift+R`
3. **Edit files** in `client/src/` - changes auto-reload
4. **Stop server** with `Ctrl+C` in terminal
5. **Restart server** after major changes

---

## 📞 Need More Help?

- Read full guide: `LOCAL_SETUP_GUIDE.md`
- Check: `ADDIS_EAT_README.md` for architecture
- View: `ideas.md` for design philosophy

---

**Ready? Start with Step 1 above! 🚀**
