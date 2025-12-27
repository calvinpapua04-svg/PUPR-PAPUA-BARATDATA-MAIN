import { Building2, Users, TreePine, Waves } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSlideshow from "@/components/HeroSlideshow";

const Index = () => {
  const services = [
    {
      icon: Building2,
      title: "Bina Marga",
      description: "Pembangunan dan pemeliharaan jalan serta jembatan",
    },
    {
      icon: Waves,
      title: "Sumber Daya Air",
      description: "Pengelolaan sumber daya air dan irigasi",
    },
    {
      icon: TreePine,
      title: "Cipta Karya & Tata Ruang",
      description: "Penataan bangunan dan pengembangan kawasan",
    },
    {
      icon: Users,
      title: "Perumahan & Bina Konstruksi",
      description: "Pengembangan perumahan rakyat dan pembinaan konstruksi",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20">
        <HeroSlideshow />

        {/* Welcome Section */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Selamat Datang di Dinas PUPR Papua Barat Daya
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Dinas Pekerjaan Umum dan Perumahan Rakyat Provinsi Papua Barat Daya berkomitmen 
                untuk membangun infrastruktur berkualitas dan menyediakan hunian layak bagi masyarakat, 
                dengan tetap menjaga kelestarian alam Papua yang indah.
              </p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
              Bidang Layanan Kami
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <Card 
                  key={index} 
                  className="group hover:shadow-ocean transition-all duration-300 hover:-translate-y-1 border-border bg-card"
                >
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-ocean group-hover:scale-110 transition-transform">
                      <service.icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h3 className="font-bold text-lg text-card-foreground">{service.title}</h3>
                    <p className="text-muted-foreground text-sm">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Motto Section */}
        <section className="py-16 bg-gradient-ocean">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              "Bersatu Membangun Negeri"
            </h3>
            <p className="text-xl text-primary-foreground/90">
              Semboyan Provinsi Papua Barat Daya
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
