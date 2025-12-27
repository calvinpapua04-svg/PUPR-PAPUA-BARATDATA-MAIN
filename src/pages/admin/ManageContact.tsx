import { useState, useEffect } from "react";
import { getContact, saveContact } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Clock, Map } from "lucide-react";

const ManageContact = () => {
    const [contact, setContact] = useState<any>(null);

    useEffect(() => {
        setContact(getContact());
    }, []);

    const handleSave = () => {
        saveContact(contact);
        toast.success("Informasi kontak berhasil diperbarui");
    };

    const updateField = (field: string, value: string) => {
        setContact({ ...contact, [field]: value });
    };

    if (!contact) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Kelola Kontak</h1>
                <Button onClick={handleSave}>Simpan Perubahan</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MapPin className="w-5 h-5" />
                            Alamat
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Textarea
                            value={contact.address}
                            onChange={(e) => updateField("address", e.target.value)}
                            rows={3}
                            placeholder="Alamat lengkap kantor"
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Phone className="w-5 h-5" />
                            Telepon & Fax
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Nomor Telepon</label>
                            <Input
                                value={contact.phone}
                                onChange={(e) => updateField("phone", e.target.value)}
                                placeholder="Contoh: (0951) 123456"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Fax</label>
                            <Input
                                value={contact.fax}
                                onChange={(e) => updateField("fax", e.target.value)}
                                placeholder="Contoh: (0951) 123457"
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Mail className="w-5 h-5" />
                            Email
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Input
                            value={contact.email}
                            onChange={(e) => updateField("email", e.target.value)}
                            placeholder="Contoh: dinaspupr@papuabaratdayaprov.go.id"
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Clock className="w-5 h-5" />
                            Jam Operasional
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Textarea
                            value={contact.hours}
                            onChange={(e) => updateField("hours", e.target.value)}
                            rows={3}
                            placeholder="Contoh: Senin - Jumat: 08.00 - 16.00 WIT"
                        />
                    </CardContent>
                </Card>

                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Map className="w-5 h-5" />
                            URL Peta (Google Maps Embed)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Input
                            value={contact.mapUrl}
                            onChange={(e) => updateField("mapUrl", e.target.value)}
                            placeholder="Masukkan URL src dari iframe Google Maps"
                        />
                        <p className="text-sm text-muted-foreground">
                            Cara mendapatkan URL: Buka Google Maps {'>'} Bagikan {'>'} Sematkan Peta {'>'} Salin isi atribut src="..."
                        </p>
                        {contact.mapUrl && (
                            <div className="aspect-video w-full rounded-lg overflow-hidden border bg-muted">
                                <iframe
                                    src={contact.mapUrl}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ManageContact;
