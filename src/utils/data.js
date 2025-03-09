// src/utils/data.js

export const teamMembers = [
  {
    id: 1,
    name: "Syahril Arfian Almazril",
    role: "Front End & UI/UX",
    nim: "103032300013",
    email: "azril4974@gmail.com",
    phone: "+62-81511463282",
    address: "Bandung, Indonesia",
    about: "",
    social: {
      instagram: "https://instagram.com/anggota1",
      linkedin: "https://linkedin.com/in/anggota1",
      github: "https://github.com/anggota1",
    },
    image: "/Azrll2.jpg"
  },
  {
    id: 2,
    name: "Maulana Cahya Magista",
    role: "Front End & UI/UX",
    nim: "1301223240",
    email: "mcmagista03@gmail.com",
    phone: "+62-77374735380",
    address: "Bandung, Indonesia",
    about: "",
    social: {
      instagram: "https://instagram.com/anggota2",
      linkedin: "https://linkedin.com/in/anggota2",
      github: "https://github.com/anggota2",
    },
    image: "/magista.jpg"
  },
  {
    id: 3,
    name: "Stephani Maria Sianturi",
    role: "Front End & UI/UX",
    nim: "103052300083",
    email: "stemarsi2004@gmail.com",
    phone: "+62-73659036561",
    address: "Bandung, Indonesia",
    about: "",
    social: {
      instagram: "https://instagram.com/anggota3",
      linkedin: "https://linkedin.com/in/anggota3",
      github: "https://github.com/anggota3",
    },
    image: "/stephanie.jpg"
  },
  {
    id: 4,
    name: "Rafly Fasha Purnomo Putra",
    role: "Front End & UI/UX",
    nim: "1103223050",
    email: "raflyfasha30@gmail",
    phone: "+62-63739875231",
    address: "Bandung, Indonesia",
    about: "",
    social: {
      instagram: "https://instagram.com/anggota4",
      linkedin: "https://linkedin.com/in/anggota4",
      github: "https://github.com/anggota4",
    },
    image: "/rafly.jpg"
  }
];

export const utbkSubjects = [
  {
    id: 1,
    name: "Matematika",
    icon: "FiActivity",
    description: "Materi matematika untuk UTBK mencakup aljabar, geometri, statistika, dan kalkulus dasar.",
    topics: ["Aljabar", "Geometri", "Statistika", "Kalkulus Dasar"],
    color: "blue"
  },
  {
    id: 2,
    name: "Bahasa Indonesia",
    icon: "FiBook",
    description: "Materi bahasa Indonesia untuk UTBK mencakup pemahaman bacaan, tata bahasa, dan penulisan.",
    topics: ["Pemahaman Bacaan", "Tata Bahasa", "Penulisan", "Sastra"],
    color: "red"
  },
  {
    id: 3,
    name: "Bahasa Inggris",
    icon: "FiGlobe",
    description: "Materi bahasa Inggris untuk UTBK mencakup reading comprehension, grammar, dan vocabulary.",
    topics: ["Reading Comprehension", "Grammar", "Vocabulary", "Structure"],
    color: "green"
  },
  {
    id: 4,
    name: "TPS (Tes Potensi Skolastik)",
    icon: "FiBrain",
    description: "Materi TPS untuk UTBK mencakup penalaran umum, kuantitatif, analitis, dan kemampuan baca.",
    topics: ["Penalaran Umum", "Penalaran Kuantitatif", "Penalaran Analitis", "Kemampuan Memahami Bacaan"],
    color: "purple"
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Ahmad Farhan",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    university: "Universitas Indonesia",
    text: "Berkat UTBK Prep, saya berhasil masuk jurusan Teknik Informatika UI. Materinya lengkap dan mudah dipahami."
  },
  {
    id: 2,
    name: "Dina Amelia",
    avatar: "https://randomuser.me/api/portraits/women/90.jpg",
    university: "Institut Teknologi Bandung",
    text: "Saya sangat terbantu dengan video pembelajaran dan forum diskusi yang interaktif. Kini saya kuliah di ITB!"
  },
  {
    id: 3,
    name: "Budi Santoso",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    university: "Universitas Gadjah Mada",
    text: "Fitur latihan soal dengan pembahasan jelas dan detail. Terima kasih UTBK Prep!"
  }
];

export const faqItems = [
  {
    id: 1,
    question: "Apa itu UTBK Prep?",
    answer: "UTBK Prep adalah platform e-learning yang dirancang khusus untuk membantu siswa SMA mempersiapkan diri menghadapi UTBK (Ujian Tulis Berbasis Komputer) dengan materi pembelajaran yang komprehensif dan interaktif."
  },
  {
    id: 2,
    question: "Bagaimana cara mendaftar?",
    answer: "Untuk mendaftar, klik tombol 'Daftar Sekarang' di halaman beranda, isi formulir pendaftaran dengan data diri Anda, dan ikuti petunjuk selanjutnya untuk mengaktifkan akun Anda."
  },
  {
    id: 3,
    question: "Apakah semua materi dapat diakses secara gratis?",
    answer: "UTBK Prep menyediakan beberapa materi dasar yang dapat diakses secara gratis. Untuk akses ke semua materi, latihan soal, dan fitur premium lainnya, Anda perlu berlangganan paket premium kami."
  },
  {
    id: 4,
    question: "Bagaimana cara mengakses kelas online?",
    answer: "Setelah login, kunjungi menu 'Kelas Online' untuk melihat semua kelas yang tersedia. Anda dapat mengklik pada kelas yang ingin diikuti untuk mulai belajar."
  },
  {
    id: 5,
    question: "Apakah ada forum diskusi untuk tanya jawab?",
    answer: "Ya, UTBK Prep menyediakan forum diskusi di mana Anda dapat bertanya, berdiskusi, dan mendapatkan jawaban dari pengajar dan sesama siswa."
  }
];

export const courses = [
  {
    id: 1,
    title: "Matematika Dasar UTBK",
    instructor: "Dr. Budi Matematika",
    level: "Dasar",
    duration: "10 minggu",
    lessons: 24,
    students: 1250,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
    category: "Matematika"
  },
  {
    id: 2,
    title: "Bahasa Indonesia untuk UTBK",
    instructor: "Prof. Sinta Bahasa",
    level: "Menengah",
    duration: "8 minggu",
    lessons: 20,
    students: 980,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
    category: "Bahasa Indonesia"
  },
  {
    id: 3,
    title: "Fisika UTBK Komprehensif",
    instructor: "Dr. Andi Fisika",
    level: "Lanjutan",
    duration: "12 minggu",
    lessons: 30,
    students: 850,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
    category: "Fisika"
  },
  {
    id: 4,
    title: "Penalaran TPS UTBK",
    instructor: "Dra. Maya Logika",
    level: "Dasar",
    duration: "6 minggu",
    lessons: 18,
    students: 1500,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
    category: "TPS"
  }
];

// Data materi lengkap UTBK
export const utbkMaterials = {
  penalaranUmum: {
    title: "Penalaran Umum",
    description: "Materi untuk melatih kemampuan penalaran logis dan analitis",
    icon: "FiActivity",
    color: "blue",
    subtopics: [
      {
        title: "Penalaran Induktif",
        items: ["Sebab Akibat", "Kesesuaian Pernyataan"]
      },
      {
        title: "Penalaran Deduktif",
        items: ["Penalaran Analitik", "Simpulan Logis"]
      },
      {
        title: "Penalaran Kuantitatif",
        items: ["Kuantitas", "Hubungan matematika sederhana", "Operasi aritmatika dasar"]
      }
    ]
  },
  pengetahuanPemahamanUmum: {
    title: "Pengetahuan dan Pemahaman Umum",
    description: "Materi untuk meningkatkan pemahaman bahasa dan logika verbal",
    icon: "FiBook",
    color: "red",
    subtopics: [
      {
        title: "Pemahaman Bahasa",
        items: ["Kalimat yang Tidak Logis", "Asosiasi Makna", "Makna Bertingkat (Hiponim-Hipernim)", "Sinonim"]
      },
      {
        title: "Struktur Kalimat",
        items: ["Hubungan Kalimat", "Perumpamaan", "Menyusun Paragraf", "Makna Imbuhan yang Sama"]
      },
      {
        title: "Penggunaan Bahasa",
        items: ["Frasa yang Sejajar", "Kelompok Kata Berpasangan Tetap", "Melengkapi Kalimat Rumpang", "Kata Konotatif dan Denotatif", "Bahasa Panda"]
      }
    ]
  },
  pemahamanBacaanMenulis: {
    title: "Pemahaman Bacaan dan Menulis",
    description: "Materi untuk mengembangkan kemampuan membaca dan menulis efektif",
    icon: "FiFileText",
    color: "green",
    subtopics: [
      {
        title: "Struktur Kalimat",
        items: ["Menyempurnakan Kalimat", "Menghilangkan Kata", "Melengkapi Kalimat"]
      },
      {
        title: "Penggunaan Kata",
        items: ["Kata Baku", "Kata Hubung/Konjungsi", "Penulisan Kata", "Sinonim"]
      },
      {
        title: "Struktur Paragraf",
        items: ["Kalimat Inti", "Penggabungan Kalimat", "Penggunaan Tanda Baca"]
      }
    ]
  },
  pengetahuanKuantitatif: {
    title: "Pengetahuan Kuantitatif",
    description: "Materi matematika untuk memecahkan masalah kuantitatif",
    icon: "FiBarChart",
    color: "purple",
    subtopics: [
      {
        title: "Aljabar",
        items: ["Persamaan linier 3 variabel (SPLTV)", "Persamaan kuadrat", "Fungsi kuadrat", "Fungsi dan invers", "Komposisi fungsi", "Persamaan garis lurus"]
      },
      {
        title: "Aritmatika",
        items: ["Aritmatika dan operasi hitung", "FPB dan KPK"]
      },
      {
        title: "Geometri",
        items: ["Bangun datar dan ruang"]
      },
      {
        title: "Statistika dan Probabilitas",
        items: ["Statistika", "Kaidah Pencacahan"]
      }
    ]
  },
  literasiBahasa: {
    title: "Literasi dalam Bahasa Indonesia",
    description: "Materi untuk mengembangkan kemampuan memahami dan menganalisis teks bahasa Indonesia",
    icon: "FiBookOpen",
    color: "yellow",
    subtopics: [
      {
        title: "Pemahaman Teks",
        items: ["Pernyataan benar salah", "Pernyataan yang mendukung opini penulis", "Simpulan", "Makna kata dan ungkapan kalimat"]
      },
      {
        title: "Analisis Teks",
        items: ["Pernyataan penjelas", "Tema, topik, judul", "Penokohan", "Informasi berdasarkan teks"]
      },
      {
        title: "Struktur Teks",
        items: ["Gagasan pokok", "Ilustrasi bacaan"]
      }
    ]
  },
  literasiBahasaInggris: {
    title: "Literasi dalam Bahasa Inggris",
    description: "Materi untuk mengembangkan kemampuan memahami dan menganalisis teks bahasa Inggris",
    icon: "FiGlobe",
    color: "indigo",
    subtopics: [
      {
        title: "Reading Strategies",
        items: ["Skimming and scanning", "General information", "Specific information"]
      },
      {
        title: "Comprehension Skills",
        items: ["Synonym and referent", "Paraphrase", "Inference"]
      },
      {
        title: "Critical Reading",
        items: ["Hypothesis and assumption", "Tone and attitude"]
      }
    ]
  },
  penalaranMatematika: {
    title: "Penalaran Matematika",
    description: "Materi untuk mengembangkan kemampuan penalaran matematis",
    icon: "FiPieChart",
    color: "teal",
    subtopics: [
      {
        title: "Aritmatika",
        items: ["Perbandingan Senilai dan Tidak Senilai", "Aritmetika Sosial"]
      },
      {
        title: "Aljabar",
        items: ["Pertidaksamaan Linear", "Sistem Persamaan Linear", "Fungsi", "Turunan Fungsi Aljabar"]
      },
      {
        title: "Geometri",
        items: ["Phytagoras & Kesebangunan Segitiga", "Keliling, Luas, & Volume Bangun"]
      },
      {
        title: "Statistika dan Probabilitas",
        items: ["Statistika (mean, modus, median)", "Kaidah Pencacahan & Peluang"]
      }
    ]
  }
};
