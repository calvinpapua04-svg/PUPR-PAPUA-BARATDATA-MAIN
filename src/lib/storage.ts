import { toast } from "sonner";

// Keys for localStorage
export const STORAGE_KEYS = {
    NEWS: "site_news",
    GALLERY: "site_gallery",
    PROFILE: "site_profile",
    HERO: "site_hero",
    CONTACT: "site_contact",
};

// Default Data (moved from components)

const DEFAULT_NEWS = [
    {
        id: 7,
        title: "Finalisasi RAD dan Ranpergub Penyandang Disabilitas Papua Barat Daya",
        date: "25 November 2025",
        author: "Admin PUPR",
        excerpt: "Dinas PUPR Papua Barat Daya berperan dalam penyediaan fasilitas dan layanan publik yang ramah disabilitas melalui penyusunan buku saku panduan teknis.",
        image: "/images/news-disabilitas.jpg",
        category: "Cipta Karya"
    },
    {
        id: 1,
        title: "PUPR Papua Barat Daya Percepat Pembangunan Jalan Trans Papua",
        date: "04 Desember 2025",
        author: "Admin PUPR",
        excerpt: "Dinas PUPR Provinsi Papua Barat Daya terus menggenjot pembangunan ruas jalan Trans Papua untuk meningkatkan konektivitas antar daerah.",
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop",
        category: "Bina Marga"
    },
    {
        id: 2,
        title: "Normalisasi Sungai Remu Sorong untuk Cegah Banjir",
        date: "02 Desember 2025",
        author: "Humas",
        excerpt: "Program normalisasi Sungai Remu terus dilakukan sebagai upaya mitigasi banjir di wilayah Kota Sorong dan sekitarnya.",
        image: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?q=80&w=2070&auto=format&fit=crop",
        category: "Sumber Daya Air"
    },
    {
        id: 3,
        title: "Peresmian Perumahan Subsidi bagi Masyarakat Berpenghasilan Rendah",
        date: "28 November 2025",
        author: "Admin PUPR",
        excerpt: "Pemerintah Provinsi melalui Dinas PUPR meresmikan 100 unit rumah subsidi yang diperuntukkan bagi MBR di Kabupaten Sorong.",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop",
        category: "Perumahan"
    },
    {
        id: 4,
        title: "Sosialisasi Tata Ruang Wilayah Provinsi Papua Barat Daya",
        date: "25 November 2025",
        author: "Bidang Tata Ruang",
        excerpt: "Kegiatan sosialisasi RTRW digelar untuk menyamakan persepsi pembangunan berkelanjutan di seluruh kabupaten/kota.",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
        category: "Tata Ruang"
    },
    {
        id: 5,
        title: "Pelatihan Tenaga Kerja Konstruksi Bersertifikat",
        date: "20 November 2025",
        author: "Bina Konstruksi",
        excerpt: "Meningkatkan kompetensi SDM lokal, Dinas PUPR mengadakan pelatihan dan sertifikasi bagi tenaga kerja konstruksi.",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop",
        category: "Bina Konstruksi"
    },
    {
        id: 6,
        title: "Monitoring Proyek Air Bersih di Raja Ampat",
        date: "15 November 2025",
        author: "Cipta Karya",
        excerpt: "Tim Dinas PUPR melakukan monitoring progres pembangunan fasilitas air bersih untuk mendukung pariwisata Raja Ampat.",
        image: "https://images.unsplash.com/photo-1538300342682-cf57afb97285?q=80&w=1974&auto=format&fit=crop",
        category: "Cipta Karya"
    }
];

const DEFAULT_GALLERY = [
    {
        id: 1,
        image: "/images/gallery-1.jpg",
        caption: "Perayaan Budaya Papua Barat Daya",
        category: "Kegiatan"
    },
    {
        id: 2,
        image: "/images/gallery-2.jpg",
        caption: "Foto Bersama Masyarakat Adat",
        category: "Kegiatan"
    },
    {
        id: 3,
        image: "/images/gallery-3.jpg",
        caption: "Upacara Adat Papua Barat Daya",
        category: "Kegiatan"
    },
    {
        id: 4,
        image: "/images/gallery-4.jpg",
        caption: "Kegiatan Masyarakat Papua",
        category: "Kegiatan"
    },
    {
        id: 5,
        image: "/images/gallery-5.jpg",
        caption: "Acara Budaya Lokal",
        category: "Kegiatan"
    },
    {
        id: 6,
        image: "/src/assets/slide-1.jpg",
        caption: "Pemandangan Raja Ampat",
        category: "Pariwisata"
    },
    {
        id: 7,
        image: "/src/assets/slide-2.jpg",
        caption: "Pembangunan Jalan Trans Papua",
        category: "Bina Marga"
    },
    {
        id: 8,
        image: "/src/assets/slide-3.jpg",
        caption: "Perumahan Subsidi Sorong",
        category: "Perumahan"
    },
    {
        id: 9,
        image: "/src/assets/slide-4.jpg",
        caption: "Kawasan Hutan Lindung",
        category: "Lingkungan"
    },
    {
        id: 10,
        image: "https://images.unsplash.com/photo-1590642916589-592bcaaa7e55?q=80&w=2070&auto=format&fit=crop",
        caption: "Jembatan Merah Putih (Ilustrasi)",
        category: "Bina Marga"
    },
    {
        id: 11,
        image: "https://images.unsplash.com/photo-1535401991798-27d2f20db17b?q=80&w=2070&auto=format&fit=crop",
        caption: "Bendungan Irigasi",
        category: "Sumber Daya Air"
    },
    {
        id: 12,
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
        caption: "Gedung Perkantoran Modern",
        category: "Cipta Karya"
    },
    {
        id: 13,
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2031&auto=format&fit=crop",
        caption: "Arsitektur Bangunan",
        category: "Tata Ruang"
    },
    {
        id: 14,
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop",
        caption: "Pekerjaan Konstruksi Jalan",
        category: "Bina Konstruksi"
    }
];

const DEFAULT_HERO = [
    {
        id: 1,
        image: "/src/assets/slide-1.jpg",
        title: "Membangun Papua Barat Daya",
        subtitle: "Dengan keindahan alam Raja Ampat sebagai inspirasi pembangunan berkelanjutan",
    },
    {
        id: 2,
        image: "/src/assets/slide-2.jpg",
        title: "Infrastruktur Berkualitas",
        subtitle: "Membangun jalan dan jembatan untuk konektivitas yang lebih baik",
    },
    {
        id: 3,
        image: "/src/assets/slide-3.jpg",
        title: "Perumahan Rakyat",
        subtitle: "Mewujudkan hunian layak bagi masyarakat Papua Barat Daya",
    },
    {
        id: 4,
        image: "/src/assets/slide-4.jpg",
        title: "Pembangunan Berkelanjutan",
        subtitle: "Menjaga keseimbangan antara pembangunan infrastruktur dan kelestarian alam",
    },
    {
        id: 5,
        image: "/src/assets/hero-infrastructure-growth.jpg",
        title: "Pembangunan infrastruktur adalah fondasi vital yang sangat efektif dalam mendukung dan mempercepat pertumbuhan ekonomi",
        subtitle: "Mewujudkan percepatan pertumbuhan ekonomi melalui pembangunan infrastruktur yang merata",
    },
];

const DEFAULT_PROFILE = {
    visi: "Terwujudnya Infrastruktur Pekerjaan Umum dan Perumahan Rakyat yang Berkelanjutan untuk Papua Barat Daya yang Maju dan Sejahtera",
    misi: [
        "Meningkatkan kualitas infrastruktur jalan dan jembatan untuk mendukung konektivitas wilayah",
        "Mengembangkan dan mengelola sumber daya air secara optimal dan berkelanjutan",
        "Mewujudkan penataan ruang dan bangunan yang terencana dan ramah lingkungan",
        "Menyediakan hunian layak dan terjangkau bagi masyarakat Papua Barat Daya",
        "Meningkatkan kapasitas dan profesionalisme SDM dalam bidang konstruksi"
    ],
    kepalaDinas: "YAKOBUS T. PABIMBIN, S.T., M.T.",
    sekretaris: "ISMAT HI MUHD NUR, SE",
    subBagian: {
        perencanaan: "SARATI KONJOL, S.T.",
        umum: "MESAK HOWAY, S.Sos.",
        data: "CALVIN ASMURUF, S.T."
    },
    kabid: {
        sda: "IZAKH KAMBUAYA, S.T., M.T.",
        binamarga: "ORIGENES ANTOH, S.T., M.T.",
        ciptakarya: "ELIEZER NELSON HOMER, S.T., M.T.",
        perumahan: "ALI PAUS PAUS, S.T., M.A.P"
    },
    seksiSda: {
        perencanaan: "HABEL, IEK, S.T.",
        pelaksanaan: "Ir. KORNELIUS F. SAGRIM, S.T",
        operasi: "NIKOLAS KEHEK, S.T., M.T."
    },
    seksiBinamarga: {
        perencanaan: "DEDY JUNAIDY ARIYANTO, S.T.",
        pembangunan: "-",
        reservasi: "ISHAK SAPAN RUMAPAR, S.T., M.T."
    },
    seksiCiptakarya: {
        penyehatan: "MAYKEL FILEMON FRASAWI, S.T.",
        penataan: "ZAINURI ICHWAN, S.T.",
        tataruang: "ELIEZER NELSON HOMER, S.T., M.T."
    },
    seksiPerumahan: {
        perumahan: "MARTHINUS IEK, S.T.",
        prasarana: "ANGKY J. MANUPUTTY, S.T., M.T.",
        binakonstruksi: "ANDI FAROLAND, S.T., M.T."
    }
};

const DEFAULT_CONTACT = {
    address: "Jalan Pendidikan Nomor 02, Kilometer 8, Kelurahan Klabulu, Distrik Malaimsimsa, Kota Sorong, Provinsi Papua Barat Daya",
    phone: "-",
    fax: "-",
    email: "-",
    hours: "Senin - Jumat: 08.00 - 16.00 WIT",
    mapUrl: ""
};

// Helper to get data
export const getStorageData = (key: string, defaultData: any) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultData;
    } catch (error) {
        console.error(`Error reading ${key} from localStorage`, error);
        return defaultData;
    }
};

// Helper to set data
export const setStorageData = (key: string, data: any) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        // Dispatch a custom event so components can listen for updates
        window.dispatchEvent(new Event("storage-update"));
        toast.success("Data berhasil disimpan");
    } catch (error) {
        console.error(`Error writing ${key} to localStorage`, error);
        toast.error("Gagal menyimpan data");
    }
};

// Specific getters
export const getNews = () => getStorageData(STORAGE_KEYS.NEWS, DEFAULT_NEWS);
export const getGallery = () => getStorageData(STORAGE_KEYS.GALLERY, DEFAULT_GALLERY);
export const getProfile = () => getStorageData(STORAGE_KEYS.PROFILE, DEFAULT_PROFILE);
export const getHeroSlides = () => getStorageData(STORAGE_KEYS.HERO, DEFAULT_HERO);
export const getContact = () => getStorageData(STORAGE_KEYS.CONTACT, DEFAULT_CONTACT);

// Specific setters
export const saveNews = (data: any) => setStorageData(STORAGE_KEYS.NEWS, data);
export const saveGallery = (data: any) => setStorageData(STORAGE_KEYS.GALLERY, data);
export const saveProfile = (data: any) => setStorageData(STORAGE_KEYS.PROFILE, data);
export const saveHeroSlides = (data: any) => setStorageData(STORAGE_KEYS.HERO, data);
export const saveContact = (data: any) => setStorageData(STORAGE_KEYS.CONTACT, data);
