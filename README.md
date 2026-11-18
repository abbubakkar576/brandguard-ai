# BrandGuard AI 🛡️ — Enterprise Brand Governance & Content Compliance

> An AI-powered brand governance and content compliance platform to ensure external communications adhere strictly to organizational tone, verified facts, approved terminology, and marketing claims before publishing.

---

## 🌟 Overview

**BrandGuard AI** acts as an automated editorial gatekeeper and compliance reviewer for marketing, communications, and product teams. It inspects submitted copy (social posts, emails, ads, articles, press releases) against corporate guidelines to identify:
1. **Tone Inconsistencies** (over-hyped claims, excessive informality, condescending language)
2. **Deprecated & Prohibited Vocabulary** (banned clichés, non-inclusive phrases, competitor terminology)
3. **Fact Inconsistencies & Knowledge Conflicts** (dates, customer metrics, SLA commitments, pricing)
4. **Unsupported Superlative Claims** (unbacked guarantees, legally risky absolutes)
5. **Accessibility & Editorial Rules** (run-on sentences, emoji limits, reading levels)

---

## 🚀 Key Features

### 1. Modern Executive Dashboard
- **Aggregate Governance Score**: Real-time compliance benchmarking.
- **Approval Pipeline**: Track drafts across *Draft*, *Needs Revision*, *Pending Approval*, and *Approved*.
- **Pre-Flight Scanner**: One-click quick check widget.
- **Recent Checks Archive**: Quick access to recent content drafts and their compliance scores.

### 2. Comprehensive Brand Guidelines Management
Full interactive CRUD management across the **6 pillars of corporate governance**:
- **Brand Tone & Voice**: Tone sliders (Formality, Energy, Depth), core attributes, and voice rules.
- **Approved Terminology**: Matrix of deprecated terms vs approved replacements with context.
- **Prohibited Buzzwords (Blacklist)**: Strict and warning-level banned words with rationale and alternative phrasing.
- **Brand Facts Repository**: Single source of truth for corporate facts (Founding year, audited user scale, SLA uptime, certifications, trials).
- **Approved Marketing Claims**: Certified promotional claims with verified citations and caveats.
- **Writing Guidelines & Accessibility**: Sentence length limits, emoji policies, and reading grade standards.
- **JSON Import & Export**: Backup and share guideline profiles across workspaces.

### 3. Interactive Content Checker & Issue Overlay
- Supports 6 content formats: **Social Post**, **Email/Newsletter**, **Advertisement Copy**, **Blog/Article**, **Press Release**, and **Product Docs**.
- **Live Editorial Metrics**: Word count, character count, sentence count, and estimated reading time.
- **1-Click Realistic Demo Presets**:
  - 🔴 **High-Risk Promotional Copy**: Multiple buzzwords, false founding year, exaggerated user scale, and SLA breach.
  - 🟡 **Subtle Tone Mismatch**: Excess emojis, deprecated support terms, non-inclusive phrasing.
  - 🟢 **Compliant Press Release**: Pristine, fact-accurate, certified copy with exemplary score.
- **Dual Visual Modes**:
  - **Issue Overlay Mode**: Visual highlights in text corresponding to flagged issues.
  - **Direct Editor Mode**: Real-time writing and text adjustments.

### 4. Dual AI & Heuristic Governance Engines
- **Google Gemini API Integration**: Connects with `gemini-1.5-flash`, `gemini-1.5-pro`, or `gemini-2.0-flash-exp` for deep semantic reasoning.
- **Intelligent Deterministic Rule Engine (Offline/Fallback)**: Works 100% out-of-the-box with zero API key needed. Guarantees that all user-configured rules, facts, and prohibited words are evaluated instantly.

### 5. Individual Correction System
- **Never silently changes content**: Users can review and apply suggested corrections one by one.
- **Apply All Safe Corrections**: 1-click remediation of all flagged issues.
- **Instant Undo**: Toast notifications provide an instant Undo action.
- **Dynamic Score Updating**: Governance score recalculates immediately as corrections are applied.

### 6. Mathematical Brand Governance Score
- 0–100 weighted compliance score with clear severity deductions (Critical: -20, Warning: -10, Suggestion: -4).
- Category alignment bars: Tone, Terminology, Claims, Facts, and Accessibility.
- Transparent disclaimer: *"Estimated internal governance benchmark based on configured guidelines. Not an objective legal guarantee."*

### 7. Dual-Role Review Workflow
- Role switcher: **Author Mode** vs **Compliance Reviewer Mode**.
- Status transitions: `Draft` ➔ `Pending Approval` ➔ `Approved` or `Needs Revision`.
- Reviewer feedback notes and tamper-evident audit history log.

### 8. History & Compliance Archive
- Full local persistence via `localStorage`.
- Search, filter by status or content type, re-open any draft, and export compliance reports as Markdown or printable reports.

---

## 🛠️ Tech Stack

- **Frontend**: React 18 (Production UMD), JavaScript (ES6+)
- **Styling**: Tailwind CSS (Play CDN with custom dark navy palette), Google Fonts (*Plus Jakarta Sans*, *JetBrains Mono*)
- **AI Engine**: Google Gemini API (`@google/genai` REST endpoint) + Intelligent Local Heuristic Analyzer
- **Persistence**: Browser LocalStorage with automatic schema validation and fallback seeding
- **Local Server**: Zero-dependency Node.js HTTP server (`server.js`)

---

## 📂 Project Structure

```
brandguard-ai/
│
├── index.html                   # Main Single Page Application shell
├── server.js                    # Zero-dependency local Node.js static server
├── start.bat                    # Windows 1-click launcher
├── package.json                 # Project configuration
├── README.md                    # Documentation & setup guide
│
├── css/
│   └── custom.css               # Highlight markers, animations, scrollbars
│
└── js/
    ├── app.jsx                  # Main React App root and toast notifications
    │
    ├── data/
    │   ├── defaultGuidelines.js # Baseline brand guidelines (6 pillars)
    │   └── demoSamples.js       # 3 realistic demo content samples
    │
    ├── services/
    │   ├── storageService.js    # LocalStorage persistence & history seeding
    │   ├── ruleEngine.js        # Deterministic heuristic brand analyzer
    │   └── geminiService.js     # Gemini API integration & fallback handler
    │
    └── components/
        ├── Navbar.jsx           # Top navigation, role toggle, API status
        ├── Sidebar.jsx          # Sidebar navigation with queue badges
        ├── DashboardView.jsx    # Metrics, charts, quick scan, recent checks
        ├── ContentChecker.jsx   # Text editor, AI scan, in-text highlights, corrections
        ├── IssueCard.jsx        # Individual issue inspector with apply button
        ├── BrandScoreDisplay.jsx# Radial gauge, category bars, governance disclaimer
        ├── GuidelinesView.jsx   # 6-pillar guideline CRUD, search, JSON import/export
        ├── ReviewWorkflowView.jsx# Review queue, sign-off actions, feedback notes
        ├── HistoryView.jsx      # Archive of checks, Markdown report export
        └── SettingsModal.jsx    # Gemini API key setup, model picker, connection test
```

---

## ⚡ Quick Start & Running Instructions

### Method 1: Using the Built-in Server (Recommended)
1. Open PowerShell or Terminal in the project directory:
   ```powershell
   cd "C:\Users\MOHAMMAD ABUBAKKAR\.gemini\antigravity\scratch\brandguard-ai"
   node server.js
   ```
2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

### Method 2: Windows 1-Click Batch File
- Double-click `start.bat` in the `brandguard-ai` folder. It will launch the local server and open your default browser automatically.

### Method 3: Direct File Opening
- You can also open `index.html` directly in modern web browsers (Chrome, Edge, Firefox, Safari).

---

## 🔑 Configuring the Gemini API (Optional)

BrandGuard AI works **100% out of the box** using its intelligent deterministic rule engine. To activate Gemini AI deep semantic reasoning:
1. Click the **Settings** (gear icon) in the top-right navigation bar.
2. Enter your **Google Gemini API Key**.
3. Select your model (e.g., `gemini-1.5-flash`).
4. Click **Test Gemini Connection** to verify your key.
5. Click **Save Settings**.

---

## 🧪 Testing the Complete Workflow (Step-by-Step)

1. **Open the Content Checker**: Click "Content Checker" in the sidebar or "Check New Content" on the Dashboard.
2. **Load High-Risk Sample**: Click the **"🔴 High-Risk Sample"** button. This loads realistic marketing copy containing:
   - Prohibited buzzwords (*"crazy cheap"*, *"rockstar"*, *"ninja"*)
   - Deprecated terminology (*"APM tool"*)
   - Factual contradictions (*"Founded in 2018"* instead of 2021; *"50M users"* instead of 12,000 enterprise orgs)
   - Legal/SLA violations (*"100% unhackable"*, *"zero downtime"*)
3. **Run AI Analysis**: Click **"Analyze with BrandGuard AI"**. Observe the progress steps as each rule category is evaluated.
4. **Inspect Detected Issues**:
   - Filter issues by severity (*Critical*, *Warning*, *Suggestion*) or category (*Tone*, *Terminology*, *Claims*, *Facts*, *Accessibility*).
   - In the text viewer, click any highlighted phrase to jump directly to its issue card.
5. **Apply Individual Corrections**: Click **"Apply Correction"** on any issue. Watch the editor update the exact text cleanly and observe the Governance Score recalculate in real-time.
6. **Submit for Approval**: In Author mode, click **"Submit for Review"**.
7. **Switch to Reviewer Mode**: Click the **"⚖️ Reviewer"** toggle in the top navbar. Navigate to the **Review Queue**, add sign-off notes, and click **"Approve Content"**.
8. **View History & Export**: Navigate to **History & Library** to view the saved audit record and download a compliance Markdown report.

---

## 📄 License
MIT License. Built with ❤️ for enterprise content governance and brand protection.
