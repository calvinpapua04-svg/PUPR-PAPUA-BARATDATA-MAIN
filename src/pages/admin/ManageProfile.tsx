import { useState, useEffect } from "react";
import { getProfile, saveProfile } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";

const ManageProfile = () => {
    const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
        setProfile(getProfile());
    }, []);

    const handleSave = () => {
        saveProfile(profile);
        toast.success("Profil berhasil diperbarui");
    };

    const updateField = (field: string, value: any) => {
        setProfile({ ...profile, [field]: value });
    };

    const updateNestedField = (parent: string, field: string, value: any) => {
        setProfile({
            ...profile,
            [parent]: {
                ...profile[parent],
                [field]: value,
            },
        });
    };

    const addMisi = () => {
        setProfile({ ...profile, misi: [...profile.misi, ""] });
    };

    const removeMisi = (index: number) => {
        const newMisi = profile.misi.filter((_: any, i: number) => i !== index);
        setProfile({ ...profile, misi: newMisi });
    };

    const updateMisi = (index: number, value: string) => {
        const newMisi = [...profile.misi];
        newMisi[index] = value;
        setProfile({ ...profile, misi: newMisi });
    };

    if (!profile) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Kelola Profil</h1>
                <Button onClick={handleSave}>Simpan Perubahan</Button>
            </div>

            <Tabs defaultValue="visi-misi" className="w-full">
                <TabsList>
                    <TabsTrigger value="visi-misi">Visi & Misi</TabsTrigger>
                    <TabsTrigger value="pimpinan">Pimpinan Utama</TabsTrigger>
                    <TabsTrigger value="sub-bagian">Sub Bagian</TabsTrigger>
                    <TabsTrigger value="kabid">Kepala Bidang</TabsTrigger>
                    <TabsTrigger value="seksi">Kepala Seksi</TabsTrigger>
                </TabsList>

                <TabsContent value="visi-misi" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Visi</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Textarea
                                value={profile.visi}
                                onChange={(e) => updateField("visi", e.target.value)}
                                rows={3}
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Misi</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {profile.misi.map((item: string, index: number) => (
                                <div key={index} className="flex gap-2">
                                    <Input
                                        value={item}
                                        onChange={(e) => updateMisi(index, e.target.value)}
                                    />
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => removeMisi(index)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}
                            <Button variant="outline" onClick={addMisi}>
                                <Plus className="w-4 h-4 mr-2" />
                                Tambah Misi
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="pimpinan" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Pimpinan Utama</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Kepala Dinas</label>
                                <Input
                                    value={profile.kepalaDinas}
                                    onChange={(e) => updateField("kepalaDinas", e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Sekretaris</label>
                                <Input
                                    value={profile.sekretaris}
                                    onChange={(e) => updateField("sekretaris", e.target.value)}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="sub-bagian" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Sub Bagian Sekretariat</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Perencanaan dan Keuangan</label>
                                <Input
                                    value={profile.subBagian?.perencanaan || ""}
                                    onChange={(e) => updateNestedField("subBagian", "perencanaan", e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Umum dan Kepegawaian</label>
                                <Input
                                    value={profile.subBagian?.umum || ""}
                                    onChange={(e) => updateNestedField("subBagian", "umum", e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Data dan Informasi Publik</label>
                                <Input
                                    value={profile.subBagian?.data || ""}
                                    onChange={(e) => updateNestedField("subBagian", "data", e.target.value)}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="kabid" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Kepala Bidang</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Sumber Daya Air</label>
                                <Input
                                    value={profile.kabid?.sda || ""}
                                    onChange={(e) => updateNestedField("kabid", "sda", e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Bina Marga</label>
                                <Input
                                    value={profile.kabid?.binamarga || ""}
                                    onChange={(e) => updateNestedField("kabid", "binamarga", e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Cipta Karya & Tata Ruang</label>
                                <Input
                                    value={profile.kabid?.ciptakarya || ""}
                                    onChange={(e) => updateNestedField("kabid", "ciptakarya", e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Perumahan & Bina Konstruksi</label>
                                <Input
                                    value={profile.kabid?.perumahan || ""}
                                    onChange={(e) => updateNestedField("kabid", "perumahan", e.target.value)}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="seksi" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Seksi Sumber Daya Air</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Perencanaan</label>
                                    <Input
                                        value={profile.seksiSda?.perencanaan || ""}
                                        onChange={(e) => updateNestedField("seksiSda", "perencanaan", e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Pelaksanaan</label>
                                    <Input
                                        value={profile.seksiSda?.pelaksanaan || ""}
                                        onChange={(e) => updateNestedField("seksiSda", "pelaksanaan", e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Operasi & Pemeliharaan</label>
                                    <Input
                                        value={profile.seksiSda?.operasi || ""}
                                        onChange={(e) => updateNestedField("seksiSda", "operasi", e.target.value)}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Seksi Bina Marga</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Perencanaan Teknik</label>
                                    <Input
                                        value={profile.seksiBinamarga?.perencanaan || ""}
                                        onChange={(e) => updateNestedField("seksiBinamarga", "perencanaan", e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Pembangunan</label>
                                    <Input
                                        value={profile.seksiBinamarga?.pembangunan || ""}
                                        onChange={(e) => updateNestedField("seksiBinamarga", "pembangunan", e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Reservasi</label>
                                    <Input
                                        value={profile.seksiBinamarga?.reservasi || ""}
                                        onChange={(e) => updateNestedField("seksiBinamarga", "reservasi", e.target.value)}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Seksi Cipta Karya</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Penyehatan Lingkungan</label>
                                    <Input
                                        value={profile.seksiCiptakarya?.penyehatan || ""}
                                        onChange={(e) => updateNestedField("seksiCiptakarya", "penyehatan", e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Penataan Bangunan</label>
                                    <Input
                                        value={profile.seksiCiptakarya?.penataan || ""}
                                        onChange={(e) => updateNestedField("seksiCiptakarya", "penataan", e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Tata Ruang</label>
                                    <Input
                                        value={profile.seksiCiptakarya?.tataruang || ""}
                                        onChange={(e) => updateNestedField("seksiCiptakarya", "tataruang", e.target.value)}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Seksi Perumahan</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Perumahan & Kawasan</label>
                                    <Input
                                        value={profile.seksiPerumahan?.perumahan || ""}
                                        onChange={(e) => updateNestedField("seksiPerumahan", "perumahan", e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Prasarana & Utilitas</label>
                                    <Input
                                        value={profile.seksiPerumahan?.prasarana || ""}
                                        onChange={(e) => updateNestedField("seksiPerumahan", "prasarana", e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Bina Konstruksi</label>
                                    <Input
                                        value={profile.seksiPerumahan?.binakonstruksi || ""}
                                        onChange={(e) => updateNestedField("seksiPerumahan", "binakonstruksi", e.target.value)}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default ManageProfile;
