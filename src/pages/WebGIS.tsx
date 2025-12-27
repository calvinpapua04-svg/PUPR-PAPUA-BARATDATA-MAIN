import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const WebGIS = () => {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-1 pt-20">
                <div className="h-[calc(100vh-5rem)]">
                    <iframe
                        src="/webgis/index.html"
                        className="w-full h-full border-0"
                        title="WebGIS Papua Barat Daya"
                        allow="geolocation"
                    />
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default WebGIS;
