import { Link } from "wouter";
import { 
  Twitter, 
  Linkedin, 
  Instagram, 
  Facebook, 
  ShoppingBag, 
  Mail, 
  Phone, 
  MapPin 
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/">
              <a className="flex items-center">
                <ShoppingBag className="h-8 w-8 text-primary" />
                <span className="ml-2 text-xl font-semibold text-white">ShopMart</span>
              </a>
            </Link>
            <p className="mt-2 text-sm text-gray-400">
              Temukan berbagai produk berkualitas dengan harga terbaik untuk kebutuhan Anda.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Kategori</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/products?category=Electronics"><a className="text-base text-gray-400 hover:text-white">Elektronik</a></Link></li>
              <li><Link href="/products?category=Clothing"><a className="text-base text-gray-400 hover:text-white">Pakaian</a></Link></li>
              <li><Link href="/products?category=Home & Kitchen"><a className="text-base text-gray-400 hover:text-white">Rumah & Dapur</a></Link></li>
              <li><Link href="/products?category=Beauty"><a className="text-base text-gray-400 hover:text-white">Kecantikan</a></Link></li>
              <li><Link href="/products?category=Sports"><a className="text-base text-gray-400 hover:text-white">Olahraga</a></Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Akun Saya</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/cart"><a className="text-base text-gray-400 hover:text-white">Keranjang</a></Link></li>
              <li><Link href="/wishlist"><a className="text-base text-gray-400 hover:text-white">Wishlist</a></Link></li>
              <li><Link href="/products"><a className="text-base text-gray-400 hover:text-white">Produk</a></Link></li>
              <li><Link href="/categories"><a className="text-base text-gray-400 hover:text-white">Kategori</a></Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Hubungi Kami</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                  <span className="text-gray-400">
                    Jl. Kemang Raya No. 10<br />
                    Jakarta Selatan, 12730
                  </span>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-400">+62 21 1234 5678</span>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-400">info@shopmart.com</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} ShopMart. Hak Cipta Dilindungi.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
