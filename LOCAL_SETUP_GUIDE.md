# ADDIS-EAT - Local Setup Guide for Your PC

Complete step-by-step instructions to run ADDIS-EAT on your personal computer.

---

## 📋 Prerequisites

Before starting, ensure your PC has:

1. **Node.js** (v18 or higher)
   - Download from: https://nodejs.org/
   - Choose "LTS" version
   - Verify installation: Open Command Prompt/Terminal and run:
     ```bash
     node --version
     npm --version
     ```

2. **Git** (optional but recommended)
   - Download from: https://git-scm.com/
   - Helps with version control

3. **Code Editor** (optional)
   - VS Code: https://code.visualstudio.com/
   - Or any text editor you prefer

4. **pnpm** (Package Manager)
   - Install globally via npm:
     ```bash
     npm install -g pnpm
     ```
   - Verify: `pnpm --version`

---

## 🚀 Step-by-Step Setup

### Step 1: Get the Project Files

**Option A: Download from Manus (Recommended)**
1. Go to the Manus Management UI
2. Click "Code" panel
3. Click "Download as ZIP"
4. Extract the ZIP file to a folder on your PC
   - Example: `C:\Users\YourName\Desktop\addis-eat`

**Option B: Clone with Git**
```bash
git clone <repository-url>
cd addis-eat
```

### Step 2: Open Terminal/Command Prompt

**Windows:**
1. Navigate to your project folder
2. Right-click in the folder
3. Select "Open in Terminal" or "Open PowerShell here"

**Mac/Linux:**
1. Open Terminal
2. Navigate to project folder:
   ```bash
   cd /path/to/addis-eat
   ```

### Step 3: Install Dependencies

In your terminal, run:

```bash
pnpm install
```

This will download all required packages (~500MB). Wait for it to complete.

**If you don't have pnpm:**
```bash
npm install
```

### Step 4: Start Development Server

Run the development server:

```bash
pnpm dev
```

Or with npm:
```bash
npm run dev
```

**Expected Output:**
```
VITE v7.1.9  ready in 450 ms

➜  Local:   http://localhost:3000/
➜  Network: http://192.168.x.x:3000/
```

### Step 5: Open in Browser

1. Copy the local URL: `http://localhost:3000/`
2. Open your web browser (Chrome, Firefox, Safari, Edge)
3. Paste the URL in the address bar
4. Press Enter

✅ **ADDIS-EAT should now be running!**

---

## 🔐 First Time Login

### Demo Credentials

**Customer Account:**
- Email: `demo@addis.com`
- Password: `demo123`
- Role: **Customer**

**Restaurant Account:**
- Email: `demo@addis.com`
- Password: `demo123`
- Role: **Restaurant**

### Login Steps

1. You'll see the authentication page
2. Select your role (Customer or Restaurant)
3. Click "Sign In" tab
4. Enter email and password
5. Click "Sign In" button
6. You'll be redirected to the appropriate dashboard

---

## 🎯 Explore the Application

### As a Customer

1. **Home Page** - Browse available restaurants
2. **Search & Filter** - Find restaurants by name or cuisine
3. **Restaurant Menu** - Click on a restaurant to view menu items
4. **Add to Cart** - Select items and quantities, add to cart
5. **Shopping Cart** - Review items, adjust quantities, see total
6. **Checkout** - Place order (mock checkout)
7. **Orders** - View order history and status

### As a Restaurant Owner

1. **Dashboard** - View key metrics (orders, revenue, ratings)
2. **Orders Tab** - See incoming orders and update status
3. **Menu Tab** - Manage menu items (add, edit, delete)
4. **Analytics Tab** - View charts and sales data

---

## 🛠️ Common Commands

### Development

```bash
# Start development server
pnpm dev

# Type checking
pnpm check

# Format code
pnpm format
```

### Building for Production

```bash
# Build the project
pnpm build

# Preview production build
pnpm preview
```

### Troubleshooting

```bash
# Clear node_modules and reinstall
rm -r node_modules pnpm-lock.yaml
pnpm install

# On Windows, use:
rmdir /s /q node_modules
del pnpm-lock.yaml
pnpm install
```

---

## 🔧 Project Structure

```
addis-eat/
├── client/                 # Frontend React app
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── stores/        # Zustand stores
│   │   ├── components/    # Reusable components
│   │   ├── lib/           # Utilities & mock data
│   │   ├── App.tsx        # Main app with routes
│   │   └── index.css      # Global styles
│   └── index.html         # HTML entry point
├── package.json           # Dependencies
└── pnpm-lock.yaml        # Dependency lock file
```

---

## 🌐 Access from Other Devices

To access ADDIS-EAT from another device on your network:

1. Find your PC's IP address:
   - **Windows:** Open Command Prompt, run `ipconfig`, look for "IPv4 Address"
   - **Mac/Linux:** Open Terminal, run `ifconfig`, look for "inet"

2. On another device, open browser and go to:
   ```
   http://YOUR_PC_IP:3000
   ```
   Example: `http://192.168.1.100:3000`

---

## 🐛 Troubleshooting

### Issue: Port 3000 Already in Use

**Solution:**
```bash
# Kill the process using port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -i :3000
kill -9 <PID>
```

Or use a different port:
```bash
pnpm dev -- --port 3001
```

### Issue: "pnpm: command not found"

**Solution:**
```bash
npm install -g pnpm
```

### Issue: Dependencies Installation Fails

**Solution:**
```bash
# Clear cache and reinstall
pnpm store prune
pnpm install
```

### Issue: Blank Page or Errors in Console

**Solution:**
1. Hard refresh browser: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. Clear browser cache
3. Check browser console for errors (F12)
4. Restart dev server: Stop (Ctrl+C) and run `pnpm dev` again

### Issue: Can't Login

**Solution:**
1. Verify you're using correct credentials: `demo@addis.com` / `demo123`
2. Check browser console for errors (F12)
3. Make sure cookies are enabled in browser
4. Try incognito/private mode

---

## 📝 Environment Setup (Optional)

If you want to customize the app, you can create a `.env.local` file:

```bash
# Create file in project root
# Add any custom variables here
```

---

## 🚀 Next Steps

### To Deploy Online

1. **Build the project:**
   ```bash
   pnpm build
   ```

2. **Deploy to Manus** (Recommended)
   - Click "Publish" in Manus Management UI
   - Get a live URL instantly

3. **Deploy to Other Platforms:**
   - **Vercel:** https://vercel.com
   - **Netlify:** https://netlify.com
   - **Railway:** https://railway.app

### To Customize

1. Edit pages in `client/src/pages/`
2. Modify styles in `client/src/index.css`
3. Update mock data in `client/src/lib/mockData.ts`
4. Changes auto-reload in browser

---

## 📞 Getting Help

### Common Resources

- **React Documentation:** https://react.dev
- **Tailwind CSS:** https://tailwindcss.com
- **Vite Guide:** https://vitejs.dev
- **TypeScript:** https://www.typescriptlang.org

### Check Logs

If something goes wrong:
1. Look at terminal output where you ran `pnpm dev`
2. Check browser console (F12)
3. Look for error messages

---

## ✅ Verification Checklist

- [ ] Node.js installed (v18+)
- [ ] pnpm installed
- [ ] Project files downloaded/cloned
- [ ] Dependencies installed (`pnpm install`)
- [ ] Dev server running (`pnpm dev`)
- [ ] Browser opens to `http://localhost:3000`
- [ ] Can login with demo credentials
- [ ] Can browse restaurants (as customer)
- [ ] Can view dashboard (as restaurant)

---

## 🎉 Success!

Once you see the ADDIS-EAT login page in your browser, you're all set! 

Enjoy exploring the application and feel free to customize it further.

**Happy coding! 🚀**
