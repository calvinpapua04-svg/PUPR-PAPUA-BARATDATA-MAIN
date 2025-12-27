import { useState, useEffect } from "react";
import { getGallery, saveGallery } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Search, Video, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const ManageGallery = () => {
    const [gallery, setGallery] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState<any>(null);

    // Form state
    const [formData, setFormData] = useState({
        caption: "",
        category: "",
        image: "",
        type: "image", // 'image' or 'video'
    });

    useEffect(() => {
        setGallery(getGallery());
    }, []);

    const handleOpenDialog = (item?: any) => {
        if (item) {
            setCurrentItem(item);
            setFormData({
                caption: item.caption,
                category: item.category,
                image: item.image,
                type: item.type || "image",
            });
        } else {
            setCurrentItem(null);
            setFormData({
                caption: "",
                category: "Umum",
                image: "https://images.unsplash.com/photo-1590642916589-592bcaaa7e55?q=80&w=2070&auto=format&fit=crop",
                type: "image",
            });
        }
        setIsDialogOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        let updatedGallery;
        if (currentItem) {
            // Edit
            updatedGallery = gallery.map((item) =>
                item.id === currentItem.id ? { ...item, ...formData } : item
            );
            toast.success("Item galeri berhasil diperbarui");
        } else {
            // Add
            const newId = Math.max(...gallery.map((n) => n.id), 0) + 1;
            updatedGallery = [{ id: newId, ...formData }, ...gallery];
            toast.success("Item galeri berhasil ditambahkan");
        }

        setGallery(updatedGallery);
        saveGallery(updatedGallery);
        setIsDialogOpen(false);
    };

    const handleDelete = (id: number) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus item ini?")) {
            const updatedGallery = gallery.filter((item) => item.id !== id);
            setGallery(updatedGallery);
            saveGallery(updatedGallery);
            toast.success("Item galeri berhasil dihapus");
        }
    };

    const filteredGallery = gallery.filter((item) =>
        item.caption.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Kelola Galeri</h1>
                <Button onClick={() => handleOpenDialog()}>
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Item
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Daftar Galeri</CardTitle>
                    <div className="flex items-center space-x-2">
                        <Search className="w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Cari caption..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="max-w-sm"
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Media</TableHead>
                                <TableHead>Tipe</TableHead>
                                <TableHead>Caption</TableHead>
                                <TableHead>Kategori</TableHead>
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredGallery.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <div className="h-12 w-20 overflow-hidden rounded bg-muted flex items-center justify-center">
                                            {item.type === 'video' ? (
                                                <Video className="h-6 w-6 text-muted-foreground" />
                                            ) : (
                                                <img
                                                    src={item.image}
                                                    alt={item.caption}
                                                    className="h-full w-full object-cover"
                                                    onError={(e) => (e.currentTarget.style.display = "none")}
                                                />
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {item.type === 'video' ? (
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                Video
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                Foto
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell className="font-medium">{item.caption}</TableCell>
                                    <TableCell>{item.category}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => handleOpenDialog(item)}
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {filteredGallery.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                        Tidak ada item galeri ditemukan
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            {currentItem ? "Edit Item Galeri" : "Tambah Item Galeri"}
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-3">
                            <Label>Tipe Media</Label>
                            <RadioGroup
                                value={formData.type}
                                onValueChange={(value) => setFormData({ ...formData, type: value })}
                                className="flex space-x-4"
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="image" id="type-image" />
                                    <Label htmlFor="type-image" className="flex items-center gap-2 cursor-pointer">
                                        <ImageIcon className="w-4 h-4" /> Foto
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="video" id="type-video" />
                                    <Label htmlFor="type-video" className="flex items-center gap-2 cursor-pointer">
                                        <Video className="w-4 h-4" /> Video
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Caption</label>
                            <Input
                                required
                                value={formData.caption}
                                onChange={(e) =>
                                    setFormData({ ...formData, caption: e.target.value })
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Kategori</label>
                            <Input
                                required
                                value={formData.category}
                                onChange={(e) =>
                                    setFormData({ ...formData, category: e.target.value })
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                {formData.type === 'video' ? "URL Video (Embed/MP4)" : "URL Gambar"}
                            </label>
                            <Input
                                required
                                value={formData.image}
                                onChange={(e) =>
                                    setFormData({ ...formData, image: e.target.value })
                                }
                                placeholder={formData.type === 'video' ? "https://www.youtube.com/embed/..." : "https://example.com/image.jpg"}
                            />
                            {formData.image && (
                                <div className="mt-2 relative h-40 w-full overflow-hidden rounded-md border bg-muted flex items-center justify-center">
                                    {formData.type === 'video' ? (
                                        <iframe
                                            src={formData.image}
                                            className="w-full h-full"
                                            title="Video Preview"
                                            allowFullScreen
                                        />
                                    ) : (
                                        <img
                                            src={formData.image}
                                            alt="Preview"
                                            className="h-full w-full object-cover"
                                            onError={(e) => (e.currentTarget.style.display = "none")}
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="flex justify-end space-x-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsDialogOpen(false)}
                            >
                                Batal
                            </Button>
                            <Button type="submit">Simpan</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ManageGallery;
