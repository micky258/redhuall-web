import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import GalleryPage from "./pages/GalleryPage";
import { Footer, WhatsAppFloat } from "./components/Contact";

// Admin
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import {
  HeroAdmin,
  CategoriasAdmin,
  ProductosAdmin,
  ServiciosAdmin,
  TrabajosAdmin,
  ConfigAdmin,
} from "./pages/admin/AdminRoutes";

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Páginas públicas */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/productos" element={<PublicLayout><ProductsPage /></PublicLayout>} />
        <Route path="/trabajos" element={<PublicLayout><GalleryPage /></PublicLayout>} />

        {/* Panel de administración */}
        <Route path="/admin" element={<AdminLayout><Dashboard /></AdminLayout>} />
        <Route path="/admin/hero" element={<AdminLayout><HeroAdmin /></AdminLayout>} />
        <Route path="/admin/categorias" element={<AdminLayout><CategoriasAdmin /></AdminLayout>} />
        <Route path="/admin/productos" element={<AdminLayout><ProductosAdmin /></AdminLayout>} />
        <Route path="/admin/servicios" element={<AdminLayout><ServiciosAdmin /></AdminLayout>} />
        <Route path="/admin/trabajos" element={<AdminLayout><TrabajosAdmin /></AdminLayout>} />
        <Route path="/admin/config" element={<AdminLayout><ConfigAdmin /></AdminLayout>} />
      </Routes>
    </BrowserRouter>
  );
}
