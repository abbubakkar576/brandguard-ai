// BrandGuard AI - Bundle generator for standalone file:// and localhost:3000 compatibility
const fs = require('fs');
const path = require('path');

const filesToBundle = [
  // 1. Data
  'js/data/defaultGuidelines.js',
  'js/data/demoSamples.js',
  // 2. Services
  'js/services/storageService.js',
  'js/services/ruleEngine.js',
  'js/services/geminiService.js',
  // 3. Components
  'js/components/BrandScoreDisplay.jsx',
  'js/components/IssueCard.jsx',
  'js/components/Navbar.jsx',
  'js/components/Sidebar.jsx',
  'js/components/DashboardView.jsx',
  'js/components/ContentChecker.jsx',
  'js/components/GuidelinesView.jsx',
  'js/components/ReviewWorkflowView.jsx',
  'js/components/HistoryView.jsx',
  'js/components/SettingsModal.jsx',
  // 4. Root App
  'js/app.jsx'
];

let bundleCode = '';
filesToBundle.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    bundleCode += `\n/* ==================== FILE: ${file} ==================== */\n`;
    bundleCode += fs.readFileSync(fullPath, 'utf8') + '\n';
  } else {
    console.error(`Missing file: ${file}`);
  }
});

fs.writeFileSync(path.join(__dirname, 'js/bundle.jsx'), bundleCode, 'utf8');
console.log('Successfully created js/bundle.jsx (' + (bundleCode.length / 1024).toFixed(1) + ' KB)');

// Read custom.css to inline or link
const customCss = fs.readFileSync(path.join(__dirname, 'css/custom.css'), 'utf8');

// Now create an index.html that inlines the bundle into a <script type="text/babel"> block!
// Why? Because inline <script type="text/babel"> works on BOTH file:// AND http://localhost:3000
// without ANY CORS restrictions!
const htmlTemplate = `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>BrandGuard AI — Enterprise Brand Governance & Content Compliance</title>
  <meta name="description" content="AI-powered corporate brand governance platform to verify facts, approved terminology, claims, and tone consistency before publication." />
  
  <!-- Favicon SVG -->
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%236366F1'><path d='M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z'/></svg>" />

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />

  <!-- Tailwind CSS Play CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            sans: ['"Plus Jakarta Sans"', 'sans-serif'],
            mono: ['"JetBrains Mono"', 'monospace'],
          },
          colors: {
            brand: {
              50: '#EEF2FF',
              100: '#E0E7FF',
              400: '#818CF8',
              500: '#6366F1',
              600: '#4F46E5',
              700: '#4338CA',
            },
            surface: {
              base: '#0A0F1D',
              navy: '#0F172A',
              card: '#1E293B',
              border: '#334155',
            }
          },
          keyframes: {
            slideUp: {
              '0%': { transform: 'translateY(12px)', opacity: '0' },
              '100%': { transform: 'translateY(0)', opacity: '1' },
            },
            fadeIn: {
              '0%': { opacity: '0' },
              '100%': { opacity: '1' },
            }
          },
          animation: {
            slideUp: 'slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            fadeIn: 'fadeIn 0.2s ease-out',
          }
        }
      }
    }
  </script>

  <!-- Custom CSS -->
  <style>
${customCss}
  </style>

  <!-- React 18 & ReactDOM 18 UMD -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js" crossorigin></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js" crossorigin></script>

  <!-- Babel Standalone for JSX transformation -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.10/babel.min.js" crossorigin></script>

  <!-- Startup Watchdog & Error Recovery Script -->
  <script>
    (function() {
      setTimeout(function() {
        var root = document.getElementById('root');
        if (root && root.querySelector('.animate-pulse')) {
          var recoveryBox = document.getElementById('loading-recovery-box');
          if (recoveryBox) {
            recoveryBox.style.display = 'block';
          }
        }
      }, 3500);

      window.resetAndReloadBrandGuard = function() {
        try {
          localStorage.removeItem('brandguard_guidelines');
          localStorage.removeItem('brandguard_history');
          localStorage.removeItem('brandguard_settings');
          localStorage.removeItem('brandguard_active_draft');
        } catch(e) {}
        window.location.reload();
      };
    })();
  </script>
</head>
<body class="bg-[#0A0F1D] text-slate-100 min-h-screen">
  <!-- React App Root Container -->
  <div id="root">
    <div class="min-h-screen flex items-center justify-center bg-[#0A0F1D] p-4">
      <div class="flex flex-col items-center gap-4 text-center max-w-md">
        <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-400 animate-pulse flex items-center justify-center shadow-lg shadow-indigo-500/25">
          <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <div class="text-sm font-bold text-white tracking-tight">Initializing BrandGuard AI...</div>
        <div class="text-xs text-slate-400">Loading brand governance rules and local storage</div>

        <!-- Failsafe Recovery Box (only shown if loading exceeds threshold) -->
        <div id="loading-recovery-box" style="display:none;" class="mt-4 p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-3">
          <p>Initialization is taking longer than expected.</p>
          <button onclick="window.resetAndReloadBrandGuard()" class="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors shadow-sm">
            Reset Corrupted Data & Reload
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Inlined Bundle (Runs smoothly on both file:// and http://localhost:3000) -->
  <script type="text/babel">
${bundleCode}
  </script>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'index.html'), htmlTemplate, 'utf8');
console.log('Successfully updated index.html with inlined bundle for 100% universal browser compatibility!');
