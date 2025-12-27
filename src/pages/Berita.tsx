import { Calendar, User, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { getNews } from "@/lib/storage";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Berita = () => {
    const [newsItems, setNewsItems] = useState<any[]>([]);

    useEffect(() => {
        setNewsItems(getNews());

        // Listen for storage updates
        const handleStorageUpdate = () => {
            setNewsItems(getNews());
        };

        window.addEventListener("storage-update", handleStorageUpdate);
        return () => window.removeEventListener("storage-update", handleStorageUpdate);
    }, []);

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="pt-20">
                {/* Header */}
                <div className="bg-gradient-ocean py-16">
                    <div className="container mx-auto px-4">
                        <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground text-center">
                            Berita Terkini
                        </h1>
                        <p className="text-center text-primary-foreground/90 mt-4 text-lg">
                            Informasi terbaru seputar pembangunan infrastruktur di Papua Barat Daya
                        </p>
                    </div>
                </div>

                {/* News Grid */}
                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {newsItems.map((item) => (
                            <Card key={item.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden border-border bg-card flex flex-col h-full">
                                <div className="relative h-48 overflow-hidden">
                                    <div className="absolute top-4 left-4 z-10">
                                        <span className="px-3 py-1 text-xs font-semibold text-white bg-primary/80 rounded-full backdrop-blur-sm">
                                            {item.category}
                                        </span>
                                    </div>
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <CardHeader className="pb-2">
                                    <div className="flex items-center text-xs text-muted-foreground mb-2 space-x-4">
                                        <div className="flex items-center">
                                            <Calendar className="h-3 w-3 mr-1" />
                                            {item.date}
                                        </div>
                                        <div className="flex items-center">
                                            <User className="h-3 w-3 mr-1" />
                                            {item.author}
                                        </div>
                                    </div>
                                    <CardTitle className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
                                        {item.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="text-muted-foreground text-sm line-clamp-3">
                                        {item.excerpt}
                                    </p>
                                </CardContent>
                                <CardFooter className="pt-0">
                                    <Button variant="ghost" className="p-0 h-auto text-primary hover:text-primary/80 hover:bg-transparent group/btn">
                                        Baca Selengkapnya
                                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Berita;
