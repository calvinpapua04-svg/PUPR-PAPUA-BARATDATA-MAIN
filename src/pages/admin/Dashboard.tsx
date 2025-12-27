import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Newspaper, Image as ImageIcon, User, Home, Phone } from "lucide-react";
import { getNews, getGallery, getHeroSlides } from "@/lib/storage";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const newsCount = getNews().length;
    const galleryCount = getGallery().length;
    const heroCount = getHeroSlides().length;

    const stats = [
        {
            label: "Berita",
            count: newsCount,
            icon: Newspaper,
            color: "text-blue-600",
            bg: "bg-blue-100",
            link: "/admin/berita"
        },
        {
            label: "Galeri",
            count: galleryCount,
            icon: ImageIcon,
            color: "text-purple-600",
            bg: "bg-purple-100",
            link: "/admin/galeri"
        },
        {
            label: "Slide Beranda",
            count: heroCount,
            icon: Home,
            color: "text-green-600",
            bg: "bg-green-100",
            link: "/admin/hero"
        },
        {
            label: "Profil",
            count: "Aktif",
            icon: User,
            color: "text-orange-600",
            bg: "bg-orange-100",
            link: "/admin/profil"
        },
        {
            label: "Kontak",
            count: "Aktif",
            icon: Phone,
            color: "text-red-600",
            bg: "bg-red-100",
            link: "/admin/kontak"
        }
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-muted-foreground mt-2">
                    Selamat datang di panel admin. Kelola konten website dari sini.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Link key={stat.label} to={stat.link}>
                            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4" style={{ borderLeftColor: stat.color.replace('text-', 'bg-').replace('600', '500') }}>
                                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">
                                        {stat.label}
                                    </CardTitle>
                                    <div className={`p-2 rounded-full ${stat.bg}`}>
                                        <Icon className={`w-4 h-4 ${stat.color}`} />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stat.count}</div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Klik untuk mengelola
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default Dashboard;
