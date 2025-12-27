import { useState, useEffect } from "react";
import { getHeroSlides, saveHeroSlides } from "@/lib/storage";
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
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ManageHero = () => {
    const [slides, setSlides] = useState<any[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState<any>(null);

    // Form state
    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        image: "",
    });

    useEffect(() => {
        setSlides(getHeroSlides());
    }, []);

    const handleOpenDialog = (item?: any) => {
        if (item) {
            setCurrentSlide(item);
            setFormData({
                title: item.title,
                subtitle: item.subtitle,
                image: item.image,
            });
        } else {
            setCurrentSlide(null);
            setFormData({
                title: "",
                subtitle: "",
                image: "/src/assets/slide-1.jpg",
            });
        }
        setIsDialogOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        let updatedSlides;
        if (currentSlide) {
            // Edit
            updatedSlides = slides.map((item) =>
                item.id === currentSlide.id ? { ...item, ...formData } : item
            );
            toast.success("Slide berhasil diperbarui");
        } else {
            // Add
            const newId = Math.max(...slides.map((n) => n.id), 0) + 1;
            updatedSlides = [...slides, { id: newId, ...formData }];
            toast.success("Slide berhasil ditambahkan");
        }

        setSlides(updatedSlides);
        saveHeroSlides(updatedSlides);
        setIsDialogOpen(false);
    };

    const handleDelete = (id: number) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus slide ini?")) {
            const updatedSlides = slides.filter((item) => item.id !== id);
            setSlides(updatedSlides);
            saveHeroSlides(updatedSlides);
            toast.success("Slide berhasil dihapus");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Kelola Beranda (Hero)</h1>
                <Button onClick={() => handleOpenDialog()}>
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Slide
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Daftar Slide</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Gambar</TableHead>
                                <TableHead>Judul</TableHead>
                                <TableHead>Sub Judul</TableHead>
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {slides.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <div className="h-12 w-20 overflow-hidden rounded bg-muted">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="h-full w-full object-cover"
                                                onError={(e) => (e.currentTarget.style.display = "none")}
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium">{item.title}</TableCell>
                                    <TableCell>{item.subtitle}</TableCell>
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
                            {slides.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                                        Tidak ada slide ditemukan
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
                            {currentSlide ? "Edit Slide" : "Tambah Slide Baru"}
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Judul</label>
                            <Input
                                required
                                value={formData.title}
                                onChange={(e) =>
                                    setFormData({ ...formData, title: e.target.value })
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Sub Judul</label>
                            <Input
                                required
                                value={formData.subtitle}
                                onChange={(e) =>
                                    setFormData({ ...formData, subtitle: e.target.value })
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">URL Gambar</label>
                            <Input
                                required
                                value={formData.image}
                                onChange={(e) =>
                                    setFormData({ ...formData, image: e.target.value })
                                }
                            />
                            <p className="text-xs text-muted-foreground">
                                Bisa menggunakan URL eksternal atau path lokal (misal: /src/assets/slide-1.jpg)
                            </p>
                            {formData.image && (
                                <div className="mt-2 relative h-40 w-full overflow-hidden rounded-md border">
                                    <img
                                        src={formData.image}
                                        alt="Preview"
                                        className="h-full w-full object-cover"
                                        onError={(e) => (e.currentTarget.style.display = "none")}
                                    />
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

export default ManageHero;
