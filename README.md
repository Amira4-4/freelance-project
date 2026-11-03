# MahandesPro (مهندسPro) — Comprehensive Engineering Freelancing Marketplace & SaaS Platform

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Recharts](https://img.shields.io/badge/Recharts-3.1-22c55e)](https://recharts.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

<<<<<<< HEAD
> **MahandesPro (مهندسPro)** هي منصة هندسية متكاملة تربط المطورين العقاريين، الشركات، وأصحاب المشاريع بنخبة من المهندسين والاستشاريين المعتمدين في كافة التخصصات الهندسية (المدنية، المعمارية، الميكانيكية، الكهربائية، الديكور الداخلي، البرمجيات ونظم الـ IoT).
>
> مصممة بمعايير **Premium SaaS**، وبنية برمجية فائقة السرعة مع تقسيم ذكي للأكواد (Code Splitting)، ونظام هوية بصرية حديث مبني بالكامل على **Tailwind CSS** مع دعم كامل للوضعين الداكن والفاتح (Dark / Light Mode) ومطابقة المشاريع عبر الذكاء الاصطناعي (AI Matching Engine).

---

## 📑 فهرس المحتويات
1. [نظرة عامة على المنصة](#-نظرة-عامة-على-المنصة)
2. [الهوية البصرية ونظام التصميم](#-الهوية-البصرية-ونظام-التصميم-design-system)
3. [المميزات الرئيسية](#-المميزات-الرئيسية)
4. [التخصصات الهندسية المدعومة](#-التخصصات-الهندسية-المدعومة)
5. [التقنيات المستخدمة](#-التقنيات-المستخدمة-tech-stack)
6. [بنية وهيكل المشروع](#-بنية-وهيكل-المشروع-architecture)
7. [البيانات ونماذج التخزين](#-البيانات-ونماذج-التخزين-data-models)
8. [التشغيل والتثبيت المحلي](#-التشغيل-والتثبيت-المحلي-quick-start)
9. [بيانات الحسابات التجريبية (Demo Accounts)](#-بيانات-الحسابات-التجريبية-demo-accounts)
10. [سير عمل التحقق الآلي (CI/CD)](#-سير-عمل-التحقق-الآلي-github-actions)

---

## 🌟 نظرة عامة على المنصة

تم بناء المنصة لسد الفجوة في سوق العمل الهندسي بالمنطقة العربية ومصر، حيث يحتاج أصحاب المشاريع وشركات المقاولات إلى استشاريين معتمدين لإعداد ومراجعة المخططات الهندسية، النوت الحسابية، وحصر الكميات مع ضمان الاعتماد النقابي وسرعة التسليم.

### الجمهور المستهدف:
- **المهندسون الاستشاريون والمعماريون:** إدارة الملف الشخصي، عرض المشاريع في Portfolio تفاعلي، وتلقي عروض العمل وتقديم العروض المالية والفنية.
- **العملاء والمطورون العقاريون:** نشر متطلبات المشاريع، الاستفادة من مساعد المشاريع الذكي بالذكاء الاصطناعي، ومقارنة عروض المهندسين وقبولها.
- **إدارة المنصة (SaaS Admin):** مراجعة طلبات الانضمام، فحص الشهادات والسير الذاتية، ومتابعة مؤشرات النمو وإحصائيات التخصصات عبر الرسوم البيانية.

---

## 🎨 الهوية البصرية ونظام التصميم (Design System)

تم بناء الهوية البصرية بنظام تصميم موحد مستوحى من كبرى منصات العمل العالمية (Linear, Stripe, Vercel) مع ألوان تعكس الطابع الهندسي الرصين:

| اللون | القيمة | الاستخدام |
| :--- | :--- | :--- |
| **Deep Navy** | `#101D35` | اللون الرئيسي للخلفيات الداكنة، الهيدر، والنصوص البارزة |
| **Royal Blue** | `#2563EB` | لون التفاعل الرئيسي (Buttons, Active Tabs, Highlights) |
| **Cyan Accent** | `#06B6D4` | لون الإبراز الذكي ولمسات الذكاء الاصطناعي (AI Glow) |
| **Surface Light** | `#FFFFFF` | خلفية البطاقات والنوافذ في الوضع الفاتح |
| **Dark Slate** | `#0B1120` | خلفية المنصة في الوضع الليلي |
| **Success** | `#10B981` | حالات القبول والاعتماد والتواجد المتاح |
| **Warning** | `#F59E0B` | حالات الانتظار والمراجعة المعلقة |
| **Danger** | `#DC2626` | حالات الرفض والحذف |

### مزايا التصميم:
- تباين عالي وخطوط عربية احترافية (`Noto Sans Arabic` و `Google Sans Flex`).
- زوايا ناعمة موحدة (`rounded-2xl`, `rounded-3xl`).
- ظلال دقيقة (`shadow-card`, `shadow-glow`).
- استجابة تامة مع كافة الشاشات (Mobile, Tablet, Laptop, Ultra-wide).
- نظام الوضع الليلي التلقائي مع حفظ تفضيل المستخدم في `localStorage`.

---

## 🚀 المميزات الرئيسية

### 1. الصفحة الرئيسية (Landing Page)
- **Hero Section:** عنوان تسويقي جذاب، بحث فوري يرتبط بصفحة المهندسين، وإحصائيات حية محسوبة من قاعدة البيانات.
- **Specializations Grid:** استعراض التخصصات الهندسية المختلفة مع عدد المهندسين المسجلين بكل تخصص.
- **Featured Engineers:** بطاقات المهندسين المعتمدين مع التقييم، التخصص، وسعر الساعة.
- **Interactive How It Works:** تبديل تفاعلي لخطوات العمل بين وضع العميل ووضع المهندس.
- **Latest Projects Showcase:** عرض أحدث المشاريع المفتوحة للتنافس وتقديم العروض.
- **Real Testimonials:** تقييمات وتجارب واقعية من عملاء وشركات مقاولات.
- **Trust Banner & Footer:** توثيق الاعتمادات النقابية وروابط الصفحات والتخصصات.

### 2. سوق المهندسين والبحث المتقدم (Explore Engineers)
- بحث فوري بالاسم، المهارة، أو التخصص.
- فلترة متقدمة حسب: التخصص الهندسي، سنوات الخبرة، التقييم، والتفرغ للعمل.
- ترتيب النتائج حسب: الأعلى تقييماً، الأكثر خبرة، الأقل والأعلى سعراً.
- ترقيم صفحات متجاوب (Pagination).
- حفظ المهندسين في قائمة المفضلة بنقرة واحدة.

### 3. نظام المشاريع والعروض (Project Management)
- صفحة استعراض المشاريع المفتوحة (`/projects`) مع فلترة حسب التخصص والميزانية.
- صفحة تفاصيل المشروع (`/project/:id`):
  * استعراض متطلبات المخططات والميزانية والمدة وموقع العمل.
  * نموذج تقديم عرض (Proposal) للمهندس يشمل السعر المقترح، مدة التسليم، ورسالة التغطية الفنية.
  * لوحة تحكم صاحب المشروع لمقارنة العروض المقدمة وقبول العرض الأنسب أو رفضه مع تحديث حالة المشروع فورياً.

### 4. مميزات الذكاء الاصطناعي (AI Features)
- **AI Engineer Matching:** خوارزمية ذكية تحلل متطلبات المشروع وترشح أفضل المهندسين مع توضيح نسبة التطابق وأسباب الترشيح الدقيقة.
- **AI Project Assistant:** مساعد مدمج في نموذج نشر المشروع يقوم بصياغة المخرجات الهندسية، اقتراح البرامج المطلوبة، وتقدير مدة العمل المناسبة تلقائياً.
- **AI Profile Assistant:** مساعد للمهندس يساعده على صياغة نبذة مهنية جذابة واقتراح مهارات تسويقية لرفع معدل قبول العروض.

### 5. تجربة المهندس (Engineer Experience)
- ملف شخصي متكامل يشمل صورة الغلاف، شارة الاعتماد، سنوات الخبرة، وسعر الساعة.
- مؤشر اكتمال الملف الشخصي (Profile Completion Indicator).
- إدارة معرض الأعمال (Portfolio Management) لإضافة وتعديل وحذف المشاريع السابقة.
- إمكانية تحميل السيرة الذاتية (CV) للعملاء.
- زر تبديل حالة التفرغ (متاح للعمل / مشغول حالياً).

### 6. تجربة العميل (Client Dashboard)
- لوحة تحكم تعرض المشاريع المنشورة، العروض المستلمة، والمهندسين المحفوظين.
- نموذج نشر مشروع متطور مع التحقق الشامل من المدخلات ومساعد الذكاء الاصطناعي.
- نظام محادثات فورية (Chat System) للتواصل المباشر مع المهندسين.

### 7. لوحة تحكم الإدارة SaaS (Admin Dashboard)
- فحص طلبات تسجيل المهندسين الجدد، مراجعة السير الذاتية والشهادات.
- قبول المهندس مع إرسال إشعار فوري، أو رفض الطلب مع إرسال سبب توضيحي.
- رسوم بيانية تفاعلية باستخدام **Recharts** تعرض:
  * نمو أعداد المهندسين والعملاء والمشاريع شهرياً.
  * توزيع المشاريع حسب التخصص الهندسي.
  * حجم الإنجاز الشهري.
- جدول رقابة لكافة المشاريع المنشورة على المنصة.

### 8. الإشعارات والمحادثات الآنية
- مركز إشعارات متكامل في شريط التنقل (Navbar) يعرض إشعارات العروض الجديدة، قبول العروض، والاعتمادات مع مؤشر غير المقروء.
- نظام محادثات (Messaging Thread) يربط العميل بالمهندس مباشرة لمناقشة التفاصيل الهندسية.

---

## 🏗 التخصصات الهندسية المدعومة

1. **هندسة مدنية وإنشائية (Civil & Structural):** تصميم خرسانة مسلحة، نوت حسابية، برامج ETABS, SAP2000, SAFE, Revit Structure، وحصر كميات.
2. **هندسة معمارية وتخطيط (Architecture & Urban Planning):** تصميم فلل وأبراج، واجهات معمارية، رخص بناء، رندرات 4K عبر Lumion و 3ds Max.
3. **هندسة ميكانيكية وMEP (Mechanical & HVAC):** حساب أحمال حرارية، أنظمة تكييف مركزي، مكافحة حريق طبقاً لكود NFPA، وشبكات صحية.
4. **هندسة كهربائية وتيار خفيف (Electrical & Power):** لوحات توزيع، أنظمة إنذار، كاميرات، ومحطات طاقة شمسية كهروضوئية.
5. **تصميم داخلي وديكور (Interior Design):** مخططات تنفيذية للفرش والإنارة، لوحات Moodboards، وجداول الخامات والتشطيبات.
6. **دراسات تربة وفحص منشآت (Geotechnical & Inspection):** تقارير جسات التربة، تدعيم وترميم المباني القائمة.
7. **هندسة برمجيات ونظم ذكية (Software & IoT):** إنترنت الأشياء الصناعي، منصات التحكم والمراقبة السحابية.
8. **طاقة متجددة وبيئة (Renewable & Environmental):** تقييم الأثر البيئي ودراسات كفاءة الطاقة.

---

## 💻 التقنيات المستخدمة (Tech Stack)

- **Frontend Core:** React 19, React DOM 19
- **Routing:** React Router DOM v7 (HashRouter SPA)
- **Styling:** Tailwind CSS v3.4, PostCSS, Autoprefixer
- **Icons:** Lucide React
- **Charts & Data Visualization:** Recharts
- **Build Tooling:** Vite 8 (with Rolldown engine)
- **Storage Layer:** LocalStorage Service Layer with realistic Egyptian & Arab engineering seed data

---

## 📁 بنية وهيكل المشروع (Architecture)

```
freelanser/
├── .github/
│   └── workflows/
│       └── ci.yml               # GitHub Actions CI for lint, build, test
├── public/                      # Static assets & icons
├── src/
│   ├── assets/                  # Images & vector assets
│   ├── components/
│   │   ├── ui/                  # Reusable Design System components
│   │   │   ├── Button.jsx       # Variants: primary, secondary, outline, ghost, danger
│   │   │   ├── Input.jsx        # Input, Textarea, Select with error validation
│   │   │   ├── Badge.jsx        # Status tags with dot indicators
│   │   │   ├── Avatar.jsx       # Avatar with online/busy indicator
│   │   │   ├── Card.jsx         # Uniform card container
│   │   │   └── Modal.jsx        # Modal, Spinner, Skeleton, EmptyState, StatsCard
│   │   ├── EngineerCard.jsx     # Marketplace engineer card with ratings & pricing
│   │   ├── Footer.jsx           # Comprehensive multi-column engineering footer
│   │   ├── Layout.jsx           # Master page layout with header & footer
│   │   ├── Navbar.jsx           # Dynamic responsive navigation with notif & dark mode
│   │   ├── ScrollToTop.jsx      # Auto scroll reset on route changes
│   │   └── StarRating.jsx       # Interactive rating stars component
│   ├── context/
│   │   ├── AuthContext.jsx      # Role-based auth state (Guest, Client, Engineer, Admin)
│   │   └── ThemeContext.jsx     # Dark & Light mode toggle with system preference
│   ├── pages/
│   │   ├── Home.jsx             # Comprehensive landing page
│   │   ├── ExploreEngineers.jsx # Full-featured marketplace with filters & search
│   │   ├── BrowseProjects.jsx   # Projects marketplace & filters
│   │   ├── ProjectDetails.jsx   # Project page, proposal submission & AI matching
│   │   ├── ClientDashboard.jsx  # Client dashboard, post project modal & chat
│   │   ├── EngineerProfile.jsx  # Engineer profile, portfolio manager & AI bio helper
│   │   ├── AdminDashboard.jsx   # SaaS admin panel with Recharts & verification
│   │   ├── Login.jsx            # Multi-role login page
│   │   ├── RoleSelection.jsx    # Account type selection
│   │   ├── ClientRegister.jsx   # Client registration with validation
│   │   ├── EngineerRegister.jsx # Engineer multi-step application & CV upload
│   │   └── EngineerRegisterSuccess.jsx # Post-registration roadmap screen
│   ├── services/
│   │   └── storage.js           # Full Data Access Layer, Seed Data & AI Helpers
│   ├── App.jsx                  # Main router with React.lazy code splitting
│   ├── index.css                # Tailwind directives & custom design variables
│   └── main.jsx                 # React root render
├── tailwind.config.js           # Custom color palette & design tokens
├── postcss.config.js            # PostCSS configuration
├── vite.config.js               # Vite bundler config
└── package.json                 # Project dependencies & scripts
```

---

## ⚡ التشغيل والتثبيت المحلي (Quick Start)

### المتطلبات الأساسية:
- Node.js إصدار `18.x` أو أحدث (تم الاختبار على Node v24).
- مدير الحزم `npm` أو `pnpm` أو `yarn`.

### خطوات التثبيت:

```bash
# 1. استنساخ المستودع
git clone https://github.com/Amira4-4/freelance-project.git
cd freelance-project

# 2. تثبيت الحزم والمكتبات
npm install

# 3. تشغيل خادم التطوير المحلي
npm run dev
```

افتح المتصفح على: `http://localhost:5173`

### بناء النسخة الإنتاجية (Production Build):
```bash
npm run build
npm run preview
```

---
=======
## مميزات المنصة
>>>>>>> 0584cbe685d4abdfce8b015296921e3111dce92a

## 🔑 بيانات الحسابات التجريبية (Demo Accounts)

تأتي المنصة محملة مسبقاً ببيانات واقعية جاهزة للتجربة الفورية:

### 1. حساب إدارة المنصة (Admin)
- **اسم المستخدم:** `admin`
- **كلمة المرور:** `admin123`
- **الصلاحيات:** فحص واعتماد طلبات المهندسين، الإحصائيات والرسوم البيانية، ومراقبة المشاريع.

<<<<<<< HEAD
### 2. حساب عميل تجريبي (Client)
- **البريد الإلكتروني:** `tarek.baz@elrawda.com`
- **كلمة المرور:** `password123`
- **الشركة:** شركة الروضة للاستثمار العقاري والتطوير.
- **الصلاحيات:** نشر مشاريع جديدة، مقارنة وقبول العروض، المحادثة المباشرة مع المهندسين.

### 3. حساب مهندس استشاري معتمد (Engineer)
- **البريد الإلكتروني:** `ahmed.kamal@example.com`
- **كلمة المرور:** `password123`
- **التخصص:** مهندس مدني وإنشائي (استشاري معتمد).
- **الصلاحيات:** تصفح المشاريع المفتوحة، تقديم العروض، إدارة معرض الأعمال، واستخدام مساعد البروفايل الذكي.

---

## 🔄 سير عمل التحقق الآلي (GitHub Actions)

يتضمن المشروع ملف عمل CI آلي في `.github/workflows/ci.yml` يعمل تلقائياً عند كل `push` أو `pull_request` لتشغيل:
- التحقق من الأكواد (ESLint).
- اختبار التجميع والإنتاج (Vite Build).

---

## 📄 الترخيص (License)
هذا المشروع مرخص تحت رخصة [MIT License](LICENSE).
جميع الحقوق محفوظة لمنصة **مهندسPro** © 2026.
=======

- localStorage للتخزين
>>>>>>> 0584cbe685d4abdfce8b015296921e3111dce92a
