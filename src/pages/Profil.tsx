import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { getProfile } from "@/lib/storage";

const Profil = () => {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    setProfile(getProfile());

    const handleStorageUpdate = () => {
      setProfile(getProfile());
    };

    window.addEventListener("storage-update", handleStorageUpdate);
    return () => window.removeEventListener("storage-update", handleStorageUpdate);
  }, []);

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20">
        {/* Header */}
        <div className="bg-gradient-ocean py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground text-center">
              Profil Dinas PUPR
            </h1>
            <p className="text-center text-primary-foreground/90 mt-4 text-lg">
              Provinsi Papua Barat Daya
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <Tabs defaultValue="visi-misi" className="w-full">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto gap-2 bg-secondary/50 p-2">
              <TabsTrigger value="visi-misi" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Visi & Misi
              </TabsTrigger>
              <TabsTrigger value="struktur" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Struktur Organisasi
              </TabsTrigger>
              <TabsTrigger value="tupoksi" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Tugas Pokok & Fungsi
              </TabsTrigger>
            </TabsList>

            <TabsContent value="visi-misi" className="mt-8">
              <div className="grid gap-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="text-2xl text-primary">Visi</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-card-foreground leading-relaxed">
                      "{profile.visi}"
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="text-2xl text-primary">Misi</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="list-decimal list-inside space-y-3 text-card-foreground">
                      {profile.misi.map((item: string, index: number) => (
                        <li key={index} className="leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="struktur" className="mt-8">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">Struktur Organisasi</CardTitle>
                  <p className="text-sm text-muted-foreground mt-2">
                    Bagan Struktur Organisasi Perangkat Daerah (OPD) Dinas Pekerjaan Umum dan Perumahan Rakyat Provinsi Papua Barat Daya
                  </p>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Kepala Dinas */}
                  <div className="text-center space-y-2 p-6 bg-gradient-ocean rounded-lg shadow-md">
                    <h3 className="font-bold text-lg text-primary-foreground">KEPALA DINAS</h3>
                    <p className="text-primary-foreground/90 font-medium">{profile.kepalaDinas}</p>
                  </div>

                  {/* Sekretaris */}
                  <div className="text-center space-y-2 p-6 bg-accent/30 rounded-lg shadow-sm border-2 border-primary/20">
                    <h3 className="font-bold text-lg text-foreground">SEKRETARIS</h3>
                    <p className="text-muted-foreground font-medium">{profile.sekretaris}</p>
                  </div>

                  {/* Sub Bagian Sekretariat */}
                  <div className="bg-secondary/10 p-6 rounded-lg">
                    <h4 className="font-bold text-center mb-4 text-foreground text-lg">SUB BAGIAN</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-white border-2 border-secondary rounded-lg text-center shadow-sm hover:shadow-md transition-shadow">
                        <p className="font-semibold text-sm text-foreground mb-2">Kepala Sub Bagian Perencanaan dan Keuangan</p>
                        <p className="text-xs text-muted-foreground">{profile.subBagian?.perencanaan}</p>
                      </div>
                      <div className="p-4 bg-white border-2 border-secondary rounded-lg text-center shadow-sm hover:shadow-md transition-shadow">
                        <p className="font-semibold text-sm text-foreground mb-2">Kepala Sub Bagian Umum dan Kepegawaian</p>
                        <p className="text-xs text-muted-foreground">{profile.subBagian?.umum}</p>
                      </div>
                      <div className="p-4 bg-white border-2 border-secondary rounded-lg text-center shadow-sm hover:shadow-md transition-shadow">
                        <p className="font-semibold text-sm text-foreground mb-2">Kepala Sub Bagian Data dan Informasi Publik</p>
                        <p className="text-xs text-muted-foreground">{profile.subBagian?.data}</p>
                      </div>
                    </div>
                  </div>

                  {/* Pejabat Fungsional */}
                  <div className="text-center space-y-2 p-4 bg-amber-50 border-2 border-amber-200 rounded-lg">
                    <h3 className="font-bold text-base text-foreground">PEJABAT FUNGSIONAL</h3>
                  </div>

                  {/* Kepala Bidang */}
                  <div className="bg-primary/5 p-6 rounded-lg">
                    <h4 className="font-bold text-center mb-6 text-foreground text-lg">KEPALA BIDANG</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow">
                        <p className="font-semibold text-sm text-foreground mb-2">Sumber Daya Air</p>
                        <p className="text-xs text-muted-foreground">{profile.kabid?.sda}</p>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow">
                        <p className="font-semibold text-sm text-foreground mb-2">Bina Marga</p>
                        <p className="text-xs text-muted-foreground">{profile.kabid?.binamarga}</p>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-300 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow">
                        <p className="font-semibold text-sm text-foreground mb-2">Cipta Karya & Tata Ruang</p>
                        <p className="text-xs text-muted-foreground">{profile.kabid?.ciptakarya}</p>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-300 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow">
                        <p className="font-semibold text-sm text-foreground mb-2">Perumahan & Bina Konstruksi</p>
                        <p className="text-xs text-muted-foreground">{profile.kabid?.perumahan}</p>
                      </div>
                    </div>

                    {/* Seksi per Bidang */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {/* Bidang Sumber Daya Air - Seksi */}
                      <div className="space-y-3">
                        <h5 className="font-semibold text-xs text-center text-blue-700 mb-3">Seksi Bidang SDA</h5>
                        <div className="p-3 bg-blue-50/50 border border-blue-200 rounded text-center">
                          <p className="font-medium text-xs text-foreground mb-1">Kepala Seksi Perencanaan</p>
                          <p className="text-xs text-muted-foreground">{profile.seksiSda?.perencanaan}</p>
                        </div>
                        <div className="p-3 bg-blue-50/50 border border-blue-200 rounded text-center">
                          <p className="font-medium text-xs text-foreground mb-1">Kepala Seksi Pelaksanaan Sumber Daya Air</p>
                          <p className="text-xs text-muted-foreground">{profile.seksiSda?.pelaksanaan}</p>
                        </div>
                        <div className="p-3 bg-blue-50/50 border border-blue-200 rounded text-center">
                          <p className="font-medium text-xs text-foreground mb-1">Kepala Seksi Operasi dan Pemeliharaan</p>
                          <p className="text-xs text-muted-foreground">{profile.seksiSda?.operasi}</p>
                        </div>
                      </div>

                      {/* Bidang Bina Marga - Seksi */}
                      <div className="space-y-3">
                        <h5 className="font-semibold text-xs text-center text-green-700 mb-3">Seksi Bidang Bina Marga</h5>
                        <div className="p-3 bg-green-50/50 border border-green-200 rounded text-center">
                          <p className="font-medium text-xs text-foreground mb-1">Kepala Seksi Perencanaan Teknik dan Evaluasi</p>
                          <p className="text-xs text-muted-foreground">{profile.seksiBinamarga?.perencanaan}</p>
                        </div>
                        <div className="p-3 bg-green-50/50 border border-green-200 rounded text-center">
                          <p className="font-medium text-xs text-foreground mb-1">Kepala Seksi Pembangunan Jalan dan Jembatan</p>
                          <p className="text-xs text-muted-foreground">{profile.seksiBinamarga?.pembangunan}</p>
                        </div>
                        <div className="p-3 bg-green-50/50 border border-green-200 rounded text-center">
                          <p className="font-medium text-xs text-foreground mb-1">Kepala Seksi Reservasi Jalan dan Jembatan</p>
                          <p className="text-xs text-muted-foreground">{profile.seksiBinamarga?.reservasi}</p>
                        </div>
                      </div>

                      {/* Bidang Cipta Karya - Seksi */}
                      <div className="space-y-3">
                        <h5 className="font-semibold text-xs text-center text-purple-700 mb-3">Seksi Bidang Cipta Karya</h5>
                        <div className="p-3 bg-purple-50/50 border border-purple-200 rounded text-center">
                          <p className="font-medium text-xs text-foreground mb-1">Kepala Seksi Penyehatan Lingkungan Permukiman dan Air Minum</p>
                          <p className="text-xs text-muted-foreground">{profile.seksiCiptakarya?.penyehatan}</p>
                        </div>
                        <div className="p-3 bg-purple-50/50 border border-purple-200 rounded text-center">
                          <p className="font-medium text-xs text-foreground mb-1">Kepala Seksi Penataan Bangunan dan Pengembangan Permukiman</p>
                          <p className="text-xs text-muted-foreground">{profile.seksiCiptakarya?.penataan}</p>
                        </div>
                        <div className="p-3 bg-purple-50/50 border border-purple-200 rounded text-center">
                          <p className="font-medium text-xs text-foreground mb-1">Kepala Seksi Tata Ruang</p>
                          <p className="text-xs text-muted-foreground">{profile.seksiCiptakarya?.tataruang}</p>
                        </div>
                      </div>

                      {/* Bidang Perumahan - Seksi */}
                      <div className="space-y-3">
                        <h5 className="font-semibold text-xs text-center text-orange-700 mb-3">Seksi Bidang Perumahan</h5>
                        <div className="p-3 bg-orange-50/50 border border-orange-200 rounded text-center">
                          <p className="font-medium text-xs text-foreground mb-1">Kepala Seksi Perumahan dan Kawasan Permukiman</p>
                          <p className="text-xs text-muted-foreground">{profile.seksiPerumahan?.perumahan}</p>
                        </div>
                        <div className="p-3 bg-orange-50/50 border border-orange-200 rounded text-center">
                          <p className="font-medium text-xs text-foreground mb-1">Kepala Seksi Prasarana, Sarana dan Utilitas</p>
                          <p className="text-xs text-muted-foreground">{profile.seksiPerumahan?.prasarana}</p>
                        </div>
                        <div className="p-3 bg-orange-50/50 border border-orange-200 rounded text-center">
                          <p className="font-medium text-xs text-foreground mb-1">Kepala Seksi Bina Konstruksi</p>
                          <p className="text-xs text-muted-foreground">{profile.seksiPerumahan?.binakonstruksi}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Kepala UPTD */}
                  <div className="text-center space-y-2 p-4 bg-slate-100 border-2 border-slate-300 rounded-lg">
                    <h3 className="font-bold text-base text-foreground">KEPALA UPTD</h3>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tupoksi" className="mt-8">
              <div className="grid gap-6">
                {/* Sekretariat */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="text-xl text-primary">Sekretariat</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-card-foreground mb-4">
                      Melakukan perencanaan umum dan anggaran, pemantauan dan evaluasi, ketatausahaan,
                      kepegawaian, keuangan, kearsipan, penataan organisasi dan tata laksana, koordinasi
                      penyusunan perundangan, pengelolaan barang milik negara, dan kerumahtanggaan kantor.
                    </p>
                  </CardContent>
                </Card>

                {/* Bidang Sumber Daya Air */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="text-xl text-primary">Bidang Sumber Daya Air</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold mb-2 text-foreground">Tugas Pokok:</h4>
                    <ul className="list-disc list-inside space-y-2 text-card-foreground">
                      <li>Melaksanakan pengelolaan sumber daya air di wilayah sungai</li>
                      <li>Penyusunan rencana pengelolaan sumber daya air</li>
                      <li>Pelaksanaan operasi dan pemeliharaan sumber daya air</li>
                      <li>Memberikan pelayanan dalam pemanfaatan irigasi, sungai, danau, rawa dan pantai</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Bidang Bina Marga */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="text-xl text-primary">Bidang Bina Marga</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold mb-2 text-foreground">Tugas Pokok:</h4>
                    <ul className="list-disc list-inside space-y-2 text-card-foreground">
                      <li>Melaksanakan penyusunan perencanaan dan pemrograman</li>
                      <li>Pelaksanaan pembangunan dan preservasi jalan dan jembatan</li>
                      <li>Pengamanan pemanfaatan bagian-bagian jalan dan penerangan jalan umum</li>
                      <li>Pengendalian mutu dan hasil pelaksanaan pekerjaan</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Bidang Cipta Karya */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="text-xl text-primary">Bidang Cipta Karya dan Tata Ruang</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold mb-2 text-foreground">Tugas Pokok:</h4>
                    <ul className="list-disc list-inside space-y-2 text-card-foreground">
                      <li>Penyehatan lingkungan permukiman dan air minum</li>
                      <li>Penataan bangunan dan pengembangan permukiman</li>
                      <li>Pengelolaan prasarana, sarana dan utilitas kawasan</li>
                      <li>Perencanaan dan pengembangan tata ruang</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Bidang Perumahan */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="text-xl text-primary">Bidang Perumahan dan Bina Konstruksi</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold mb-2 text-foreground">Tugas Pokok:</h4>
                    <ul className="list-disc list-inside space-y-2 text-card-foreground">
                      <li>Pengembangan perumahan dan kawasan permukiman</li>
                      <li>Pembinaan jasa konstruksi</li>
                      <li>Penyelenggaraan sertifikasi dan perizinan konstruksi</li>
                      <li>Pengawasan pelaksanaan konstruksi</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profil;
