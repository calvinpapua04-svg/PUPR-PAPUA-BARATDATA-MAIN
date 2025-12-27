import { Mail, MapPin, Phone, Clock, Send } from "lucide-react";
import { useState, useEffect } from "react";
import { getContact } from "@/lib/storage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Kontak = () => {
  const [contact, setContact] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  useEffect(() => {
    setContact(getContact());

    const handleStorageUpdate = () => {
      setContact(getContact());
    };

    window.addEventListener("storage-update", handleStorageUpdate);
    return () => window.removeEventListener("storage-update", handleStorageUpdate);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    console.log("Form submitted:", formData);
    toast.success("Saran dan pengaduan Anda telah terkirim. Terima kasih!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  if (!contact) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20">
        {/* Header */}
        <div className="bg-gradient-ocean py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground text-center">
              Hubungi Kami
            </h1>
            <p className="text-center text-primary-foreground/90 mt-4 text-lg">
              Dinas Pekerjaan Umum dan Perumahan Rakyat Provinsi Papua Barat Daya
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
            {/* Contact Cards */}
            <div className="space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-primary">
                    <MapPin className="h-6 w-6" />
                    Alamat Kantor
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-card-foreground whitespace-pre-line">
                    {contact.address}
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-primary">
                    <Phone className="h-6 w-6" />
                    Telepon
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-card-foreground">
                    Telepon: {contact.phone}<br />
                    Fax: {contact.fax}
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-primary">
                    <Mail className="h-6 w-6" />
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-card-foreground">
                    Email: {contact.email}
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-primary">
                    <Clock className="h-6 w-6" />
                    Jam Operasional
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-card-foreground whitespace-pre-line">
                    {contact.hours}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Map or Additional Info */}
            <div className="space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-primary">Peta Lokasi</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-secondary/30 rounded-lg flex items-center justify-center overflow-hidden">
                    {contact.mapUrl ? (
                      <iframe
                        src={contact.mapUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    ) : (
                      <p className="text-muted-foreground">
                        Peta lokasi belum diatur
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-primary">Informasi Tambahan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Layanan Pengaduan</h4>
                    <p className="text-sm text-muted-foreground">
                      Untuk pengaduan masyarakat terkait infrastruktur dan perumahan,
                      silakan hubungi kantor kami pada jam operasional atau gunakan formulir di bawah ini.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Tautan Terkait</h4>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <a
                          href="https://papuabaratdayaprov.go.id"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:underline"
                        >
                          Website Provinsi Papua Barat Daya
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://papua-gis-hub.lovable.app/?utm_source=lovable-editor"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:underline"
                        >
                          Web GIS Papua
                        </a>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Suggestions and Complaints Form */}
          <div className="max-w-3xl mx-auto">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-primary text-2xl">
                  <Send className="h-6 w-6" />
                  Saran dan Pengaduan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Nama Lengkap</label>
                      <Input
                        id="name"
                        placeholder="Masukkan nama lengkap"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email</label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Masukkan alamat email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">Subjek</label>
                    <Input
                      id="subject"
                      placeholder="Judul saran atau pengaduan"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Pesan</label>
                    <Textarea
                      id="message"
                      placeholder="Tuliskan saran atau pengaduan Anda secara detail..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full md:w-auto">
                    Kirim Pesan
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Kontak;
