# 🎓 UTBKIn - Platform Persiapan UTBK 2025
<div align="center">



[![Next.js](https://img.shields.io/badge/Next.js-13.4.19-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.1.6-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)

<p align="center">
  <strong>Platform e-learning #1 di Indonesia untuk persiapan UTBK bagi siswa SMA</strong><br>
  Membantu siswa meraih impian masuk perguruan tinggi negeri terbaik dengan percaya diri dan hasil maksimal
</p>
</div>

---

## 📋 Table of Contents
- [🌟 Overview](#-overview)
- [✨ Key Features](#-key-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Project Structure](#-project-structure)
- [⚙️ Installation & Setup](#️-installation--setup)
- [🔧 Development](#-development)
- [📱 Pages Overview](#-pages-overview)
- [🧩 Components](#-components)
- [🎨 UI Components](#-ui-components)
- [🪝 Custom Hooks](#-custom-hooks)
- [🔄 Effects & Animations](#-effects--animations)
- [📊 Platform Statistics](#-platform-statistics)
- [🔗 API References](#-api-references)
- [🧪 Testing](#-testing)
- [🔒 Environment Variables](#-environment-variables)
- [🚢 Deployment](#-deployment)
- [👥 Team](#-team)
- [📞 Contact](#-contact)
- [📝 License](#-license)

---

## 🌟 Overview
**UTBKIn** adalah platform persiapan UTBK (Ujian Tulis Berbasis Komputer) terpercaya yang dirancang khusus untuk siswa SMA di Indonesia. Platform ini menyediakan ekosistem pembelajaran komprehensif dengan materi berkualitas, latihan soal, forum diskusi, dan fitur-fitur interaktif yang membantu siswa mempersiapkan diri secara optimal untuk UTBK guna melanjutkan pendidikan ke perguruan tinggi negeri impian mereka.

<details>
<summary>📈 Statistik Platform</summary>

- **10,000+** Siswa Aktif
- **85%** Tingkat Kelulusan Siswa
- **98%** Kemiripan Soal dengan SNBT
- **10,000+** Latihan Soal Tersedia
- **4.8/5** Rating Rata-rata
</details>

---

## ✨ Key Features
<table>
  <tr>
    <td>
      <h3>📚 Materi Lengkap</h3>
      <p>Materi pembelajaran komprehensif untuk semua mata pelajaran UTBK dengan format video, PDF, dan dokumen interaktif.</p>
    </td>
    <td>
      <h3>🎥 Video Interaktif</h3>
      <p>Pembelajaran melalui video dengan penjelasan detail dari pengajar berpengalaman yang mudah dipahami.</p>
    </td>
  </tr>
  <tr>
    <td>
      <h3>📝 Latihan Soal</h3>
      <p>Ribuan latihan soal dengan pembahasan detail dan analisis kesalahan untuk membantu meningkatkan kemampuan.</p>
    </td>
    <td>
      <h3>💬 Forum Diskusi</h3>
      <p>Wadah untuk bertanya, berdiskusi, dan mendapatkan jawaban dari pengajar maupun sesama siswa.</p>
    </td>
  </tr>
  <tr>
    <td>
      <h3>📊 Analisis Kemampuan</h3>
      <p>Pantau perkembangan belajar dengan dashboard analisis performa detail dan rekomendasi materi.</p>
    </td>
    <td>
      <h3>🎯 Tryout Berkala</h3>
      <p>Simulasi UTBK secara berkala dengan soal-soal terbaru untuk mengukur kesiapan menghadapi ujian sesungguhnya.</p>
    </td>
  </tr>
  <tr>
    <td>
      <h3>🌙 Dark/Light Mode</h3>
      <p>Fitur tampilan gelap/terang untuk kenyamanan belajar di berbagai kondisi pencahayaan.</p>
    </td>
    <td>
      <h3>📱 Responsive Design</h3>
      <p>Tampilan responsif yang optimal di berbagai perangkat, dari desktop hingga smartphone.</p>
    </td>
  </tr>
</table>

---

## 🛠️ Tech Stack
<details open>
<summary><b>Frontend</b></summary>

- **Framework**: [Next.js](https://nextjs.org/) (v13.4.19)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (v5.1.6)
- **UI Library**: [React](https://reactjs.org/) (v18.2.0)
- **Styling**: 
  - CSS Modules
  - [Tailwind CSS](https://tailwindcss.com/) (inferring from structure)
- **State Management**: React Context API + Custom Hooks
- **Animation Libraries**:
  - Custom CSS Animations
  - [Framer Motion](https://www.framer.com/motion/) (inferred)
- **3D Visualization**: [Three.js](https://threejs.org/) (inferred from ThreeDModel component)
</details>

<details>
<summary><b>Backend (inferred)</b></summary>

- **API Routes**: Next.js API Routes
- **Database**: Not specified (possibly MongoDB or PostgreSQL)
- **Authentication**: Next.js Authentication (inferred from login page)
</details>

<details>
<summary><b>DevOps & Tools</b></summary>

- **Linting**: ESLint (eslint.config.mjs)
- **Code Formatting**: Prettier (inferred)
- **Version Control**: Git
- **Package Manager**: npm
</details>

---

## 🚀 Project Structure
```
UTBKIN/
├── .next/                      # Next.js build output
├── node_modules/               # Dependencies
├── public/                     # Static assets
├── src/                        # Source code
│   ├── components/             # React components
│   │   ├── effects/            # Visual effects components
│   │   │   ├── AnimatedWaveBackground.tsx
│   │   │   ├── DynamicHeroBackground.tsx
│   │   │   ├── FloatingElements.tsx
│   │   │   ├── ParallaxHero.tsx
│   │   │   ├── ParticlesBackground.tsx
│   │   │   └── ThreeDModel.tsx
│   │   ├── home/               # Homepage specific components
│   │   │   ├── CTASection.tsx
│   │   │   ├── FeatureCard.tsx
│   │   │   ├── FeaturesSection.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── TestimonialCard.tsx
│   │   │   └── TestimonialsSection.tsx
│   │   ├── layout/             # Layout components
│   │   │   ├── DarkModeToggle.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Layout.tsx
│   │   │   └── Navbar.tsx
│   │   ├── profile/            # Profile page components
│   │   │   ├── TeamMemberCard.tsx
│   │   │   └── TeamSection.tsx
│   │   └── ui/                 # Reusable UI components
│   │       ├── Alert.tsx
│   │       ├── Badge.tsx
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       └── Modal.tsx
│   ├── hooks/                  # Custom React hooks
│   │   ├── useLocalStorage.js
│   │   ├── useMediaQuery.js
│   │   └── useScrollAnimation.js
│   ├── pages/                  # Next.js pages
│   │   ├── api/                # API routes
│   │   │   └── hello.js
│   │   ├── _app.tsx            # Custom App component
│   │   ├── _document.tsx       # Custom Document
│   │   ├── forum-diskusi.tsx   # Forum diskusi page
│   │   ├── index.tsx           # Homepage
│   │   ├── kelas-online.tsx    # Online classes page
│   │   ├── login.tsx           # Login page
│   │   ├── materi.tsx          # Materials page
│   │   ├── profil-saya.tsx     # User profile page
│   │   └── profil.tsx          # Team profile page
│   ├── styles/                 # Global styles
│   │   ├── animations.css      # Animation styles
│   │   └── globals.css         # Global CSS
│   └── utils/                  # Utility functions
│       └── data.js             # Static data
├── .gitignore                  # Git ignore rules
├── eslint.config.mjs           # ESLint configuration
├── jsconfig.json               # JavaScript configuration
├── LICENSE                     # License file
├── next-env.d.ts               # Next.js TypeScript declarations
├── next.config.js              # Next.js configuration
├── package-lock.json           # Package lock file
├── package.json                # Project dependencies
├── postcss.config.js           # PostCSS configuration
└── README.md                   # Project documentation
```

---

## ⚙️ Installation & Setup
Ikuti langkah-langkah berikut untuk menginstall dan menjalankan UTBKIn secara lokal:

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v14.0.0 or higher)
- [npm](https://www.npmjs.com/) (v6.0.0 or higher)
- [Git](https://git-scm.com/)

### Installation
1. Clone repository
```bash
git clone https://github.com/yourusername/UTBKIn.git
```

2. Pindah ke direktori project
```bash
cd UTBKIn
```

3. Install dependencies
```bash
npm install
```

4. Setup environment variables
```bash
cp .env.example .env.local
# Edit .env.local file with your configurations
```

5. Run development server
```bash
npm run dev
```

6. Buka [http://localhost:3000](http://localhost:3000) di browser Anda

---

## 🔧 Development

### Scripts yang Tersedia
- `npm run dev` - Menjalankan development server
- `npm run build` - Membangun aplikasi untuk production
- `npm start` - Menjalankan aplikasi yang sudah di-build
- `npm run lint` - Menjalankan ESLint untuk memeriksa kode
- `npm run format` - Memformat kode dengan Prettier (inferred)
- `npm run test` - Menjalankan unit tests (inferred)

### Kode Struktur dan Konvensi
- **Components**: Komponen React di-organize berdasarkan fitur/halaman
- **Pages**: Mengikuti routing Next.js berbasis file
- **Hooks**: Custom hooks untuk logic yang dapat digunakan kembali
- **Styling**: CSS Modules untuk styling komponen

---

## 📱 Pages Overview

| Page | Deskripsi | Path |
|------|-----------|------|
| **Homepage** | Landing page utama dengan hero section, fitur, dan testimonial. | `/` |
| **Kelas Online** | Halaman untuk menjelajahi kelas UTBK yang tersedia. | `/kelas-online` |
| **Materi** | Halaman untuk mengakses berbagai materi pembelajaran UTBK. | `/materi` |
| **Forum Diskusi** | Platform diskusi interaktif untuk siswa dan pengajar. | `/forum-diskusi` |
| **Profil Tim** | Informasi tentang tim pengembang UTBKIn. | `/profil` |
| **Login** | Halaman untuk login ke platform. | `/login` |
| **Profil Saya** | Halaman profil pengguna setelah login. | `/profil-saya` |

---

## 🧩 Components
UTBKIn dibangun dengan struktur komponen modular untuk memudahkan pengembangan dan maintenance.

### Components Features
<details>
<summary><b>Home Components</b></summary>

- **HeroSection.tsx**: Section utama di halaman beranda dengan headline, subheadline, dan CTA
- **FeaturesSection.tsx**: Section yang menampilkan fitur-fitur utama platform
- **FeatureCard.tsx**: Card untuk menampilkan fitur individual dengan icon dan deskripsi
- **TestimonialsSection.tsx**: Section yang menampilkan testimoni dari siswa
- **TestimonialCard.tsx**: Card untuk menampilkan testimoni individual dengan foto dan quote
- **CTASection.tsx**: Call-to-Action section untuk mengajak pengguna mendaftar
</details>

<details>
<summary><b>Layout Components</b></summary>

- **Layout.tsx**: Wrapper component untuk layout keseluruhan
- **Navbar.tsx**: Navigation bar responsif dengan logo dan menu links
- **Footer.tsx**: Footer section dengan links, kontak, dan copyright
- **DarkModeToggle.tsx**: Toggle switch untuk beralih antara mode terang dan gelap
</details>

<details>
<summary><b>Profile Components</b></summary>

- **TeamSection.tsx**: Section yang menampilkan anggota tim pengembang
- **TeamMemberCard.tsx**: Card untuk menampilkan profil anggota tim dengan foto dan informasi
</details>

---

## 🎨 UI Components
Komponen UI yang dapat digunakan kembali di seluruh aplikasi.

<details>
<summary><b>UI Building Blocks</b></summary>

- **Button.tsx**: Komponen button dengan variasi style dan ukuran
- **Card.tsx**: Container card universal untuk berbagai konten
- **Alert.tsx**: Komponen notifikasi untuk info, warning, dan error messages
- **Badge.tsx**: Label kecil untuk status, kategori, atau tag
- **Modal.tsx**: Dialog popup untuk konfirmasi atau form input
</details>

---

## 🪝 Custom Hooks
Custom hooks untuk logic yang digunakan kembali di komponen-komponen berbeda.

<details>
<summary><b>Available Hooks</b></summary>

- **useLocalStorage.js**: Hook untuk menyimpan dan mengambil data dari localStorage
- **useMediaQuery.js**: Hook untuk responsive design dan media queries
- **useScrollAnimation.js**: Hook untuk animasi berbasis scroll
</details>

---

## 🔄 Effects & Animations
Komponen visual effects untuk meningkatkan UX dan estetika platform.

<details>
<summary><b>Effects Components</b></summary>

- **AnimatedWaveBackground.tsx**: Latar belakang dengan animasi gelombang
- **DynamicHeroBackground.tsx**: Background yang dinamis untuk hero section
- **FloatingElements.tsx**: Elemen-elemen yang bergerak mengambang
- **ParallaxHero.tsx**: Efek parallax untuk hero section
- **ParticlesBackground.tsx**: Latar belakang dengan efek partikel
- **ThreeDModel.tsx**: Integrasi model 3D dengan Three.js
</details>

---

## 📊 Platform Statistics
Beberapa data tentang platform UTBKIn:

<div align="center">

| Metrik | Nilai |
|--------|-------|
| Siswa Aktif | 10,000+ |
| Tingkat Kelulusan | 85% |
| Kemiripan SNBT | 98% |
| Soal Latihan | 10,000+ |
| Rating | 4.8/5 |
| Mata Pelajaran | 12+ |
| Pengajar Berpengalaman | 50+ |

</div>

---

## 🔗 API References
Dokumentasi API untuk interaksi dengan backend (inferred).

<details>
<summary><b>API Endpoints</b></summary>

- **GET /api/hello**: Endpoint test sederhana
- **GET /api/materi**: Mendapatkan daftar materi pembelajaran
- **GET /api/kelas**: Mendapatkan daftar kelas online
- **GET /api/forum**: Mendapatkan daftar topik diskusi
- **GET /api/user/profile**: Mendapatkan data profil pengguna
- **POST /api/auth/login**: Endpoint untuk login
- **POST /api/auth/register**: Endpoint untuk registrasi
</details>

---

## 🧪 Testing
Strategi dan tools untuk testing aplikasi (inferred).

<details>
<summary><b>Testing Strategy</b></summary>

- **Unit Testing**: Testing komponen individual
- **Integration Testing**: Testing interaksi antar komponen
- **E2E Testing**: Testing pengalaman pengguna secara keseluruhan
</details>

---

## 🔒 Environment Variables
Konfigurasi environment yang dibutuhkan untuk menjalankan aplikasi (inferred).

<details>
<summary><b>Required Environment Variables</b></summary>

```
# API
NEXT_PUBLIC_API_URL=

# Authentication
NEXTAUTH_URL=
NEXTAUTH_SECRET=

# Database
DATABASE_URL=

# Features Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=
```
</details>

---

## 🚢 Deployment
Panduan untuk deployment aplikasi (inferred).

<details>
<summary><b>Deployment Options</b></summary>

- **Vercel**: Deployment terintegrasi dengan GitHub
- **Netlify**: Alternatif deployment dengan continuous integration
- **Self-hosted**: Deployment manual dengan Node.js server
</details>

---

## 👥 Team
Tim pengembang UTBKIn yang berdedikasi:

<div align="center">
<table>
  <tr>
    <td align="center">
      <b>Syahril Arfian Almazril</b><br />
      <small>Front End & UI/UX</small><br />
    </td>
    <td align="center">
      <b>Maulana Cahya Magista</b><br />
      <small>Front End & UI/UX</small><br />
    </td>
    <td align="center">
      <b>Stephani Maria Sianturi</b><br />
      <small>Front End & UI/UX</small><br />
    </td>
    <td align="center">
      <b>Rafiy Fasha Purnomo Putra</b><br />
      <small>Front End & UI/UX</small><br />
    </td>
  </tr>
</table>
</div>

---

## 📞 Contact
<div align="center">

📧 **Email**: info@utbkprep.id  
📞 **Telepon**: +62 812-3456-789  
📍 **Alamat**: Jl. Bandung bubat no 28  

[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/utbkin)
[![YouTube](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtube.com/utbkin)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/utbkin)
[![Facebook](https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white)](https://facebook.com/utbkin)

</div>

---

## 📝 License
<div align="center">

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

© 2025 UTBK Prep. Hak Cipta Dilindungi.

</div>
