import { Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/logo-pbd.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <img src={logo} alt="Logo Papua Barat Daya" className="h-16 w-auto" />
            <h3 className="font-bold text-lg">Dinas PUPR</h3>
            <p className="text-primary-foreground/80 text-sm">
              Dinas Pekerjaan Umum dan Perumahan Rakyat Provinsi Papua Barat Daya
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Kontak Kami</h3>
            <div className="space-y-3 text-sm text-primary-foreground/80">
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>Sorong, Papua Barat Daya</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span>-</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span>-</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Tautan Penting</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <a href="https://papuabaratdayaprov.go.id" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                  Website Provinsi Papua Barat Daya
                </a>
              </li>
              <li>
                <a href="https://papua-gis-hub.lovable.app/?utm_source=lovable-editor" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                  Web GIS Papua
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} Dinas Pekerjaan Umum dan Perumahan Rakyat Provinsi Papua Barat Daya. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
