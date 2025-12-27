import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
    LayoutDashboard,
    Newspaper,
    Image as ImageIcon,
    User,
    Home,
    Phone,
    LogOut,
    Menu,
    X
} from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const AdminLayout = () => {
    const { logout } = useAuth();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        { path: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { path: "/admin/berita", label: "Berita", icon: Newspaper },
        { path: "/admin/galeri", label: "Galeri", icon: ImageIcon },
        { path: "/admin/profil", label: "Profil", icon: User },
        { path: "/admin/hero", label: "Beranda (Hero)", icon: Home },
        { path: "/admin/kontak", label: "Kontak", icon: Phone },
    ];

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            <div className="p-6 border-b">
                <h1 className="text-xl font-bold text-primary">Admin Panel</h1>
                <p className="text-sm text-muted-foreground">PUPR Papua Barat Daya</p>
            </div>
            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                    ? "bg-primary text-primary-foreground"
                                    : "hover:bg-secondary text-foreground"
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
            <div className="p-4 border-t">
                <Button
                    variant="destructive"
                    className="w-full flex items-center gap-2"
                    onClick={logout}
                >
                    <LogOut className="w-4 h-4" />
                    Logout
                </Button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Desktop Sidebar */}
            <aside className="hidden md:block w-64 bg-white border-r shadow-sm fixed h-full z-10">
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar */}
            <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b p-4 z-20 flex items-center justify-between shadow-sm">
                <h1 className="font-bold text-lg">Admin Panel</h1>
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className="w-6 h-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-64">
                        <SidebarContent />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-4 md:p-8 mt-16 md:mt-0 overflow-auto">
                <div className="max-w-6xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
