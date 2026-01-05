import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, ArrowLeft, Search, Filter, ShoppingCart, Info, CheckCircle2 } from 'lucide-react';

interface Product {
  id: string;
  sku: string | null;
  name: string;
  slug: string | null;
  category_id: string | null;
  metal_type: string | null;
  grade: string | null;
  specs?: any | null;
  images: string[] | null;
  stock_qty: number | null;
  min_order: number | null;
  active: boolean;
  featured: boolean;
  description: string | null;
  price: number;
  unit: string;
}

interface Category {
  id: string;
  name: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const { addToCart } = useCart();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('id, name')
      .order('name');

    if (!error && data) setCategories(data);
  };

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('active', true)
      .order('name');

    if (!error && data) {
      setProducts(data);
    } else {
      console.error('Error fetching products:', error);
    }
    setLoading(false);
  };

  const getCategoryName = (categoryId: string | null) => {
    if (!categoryId) return 'Uncategorized';
    const category = categories.find(c => c.id === categoryId);
    return category?.name || 'Unknown';
  };

  let filteredProducts = filter === 'all'
    ? products
    : products.filter(p => p.category_id === filter);

  if (searchQuery) {
    filteredProducts = filteredProducts.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      getCategoryName(p.category_id).toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.metal_type?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price || 0,
      unit: product.unit || 'unit'
    }, product.min_order || 1);
    toast.success(`${product.name} added to cart`, {
      icon: <CheckCircle2 className="h-4 w-4 text-green-500" />
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="relative">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-slate-100 border-t-[#be1800]"></div>
            <div className="absolute inset-0 flex items-center justify-center font-black text-[10px] text-slate-400 uppercase tracking-tighter">Loha</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-outfit relative overflow-hidden">
      <Navbar />

      {/* Subtle Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-50 rounded-full blur-[140px] -mr-96 -mt-96 opacity-60" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[120px] -ml-64 -mb-64 opacity-40" />
      </div>

      <main className="flex-1 py-12 px-4 relative z-10">
        <div className="container mx-auto max-w-7xl">
          {/* Breadcrumbs & Navigation */}
          <div className="mb-8">
            <Link to="/">
              <Button variant="ghost" className="text-slate-500 hover:text-slate-900 hover:bg-slate-200/50 group gap-2 px-0 transition-all">
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to Marketplace
              </Button>
            </Link>
          </div>

          {/* Hero Section */}
          <section className="mb-16">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="max-w-2xl"
              >
                <Badge className="bg-[#be1800]/10 text-[#be1800] border-[#be1800]/20 hover:bg-[#be1800]/20 mb-4 font-black uppercase tracking-widest px-4 py-1">Industrial Inventory</Badge>
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-6">
                  Premium <span className="relative">
                    <span className="relative z-10 text-[#be1800]">Metal</span>
                    <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#be1800]/10 fill-current" viewBox="0 0 100 20" preserveAspectRatio="none">
                      <path d="M0 10 Q 25 20 50 10 T 100 10" />
                    </svg>
                  </span> Solutions
                </h1>
                <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed">
                  Browse our high-grade, certified steel and aluminum components precision-engineered for professional industrial applications.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full md:w-auto flex flex-col sm:flex-row gap-4"
              >
                <div className="relative group min-w-[300px]">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-[#be1800] transition-colors" />
                  <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger className="w-full h-14 bg-white border-slate-200 pl-11 rounded-2xl shadow-sm focus:border-[#be1800] focus:ring-[#be1800]/10 transition-all font-bold text-slate-700">
                      <SelectValue placeholder="Category Selection" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-slate-200 shadow-xl">
                      <SelectItem value="all" className="font-bold py-3">All Strategic Metals</SelectItem>
                      {categories.map(cat => (
                        <SelectItem key={cat.id} value={cat.id} className="font-bold py-3 capitalize">
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>
            </div>

            <div className="h-px bg-gradient-to-r from-slate-200 via-slate-100 to-transparent mt-12 w-full" />
          </section>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Card className="h-full flex flex-col bg-white border-slate-200 hover:border-[#be1800]/40 transition-all duration-500 overflow-hidden group shadow-sm hover:shadow-2xl hover:-translate-y-2 rounded-[2rem]">
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-50">
                      {product.images && product.images.length > 0 ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="h-20 w-20 text-slate-100 group-hover:text-red-50 transition-colors" />
                        </div>
                      )}

                      {/* Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                        <Badge
                          variant={(product.stock_qty || 0) > 0 ? "default" : "secondary"}
                          className={`
                            ${(product.stock_qty || 0) > 0 ? "bg-[#be1800]/90" : "bg-slate-200 text-slate-600"} 
                            backdrop-blur-md font-black uppercase text-[10px] tracking-widest px-3 py-1 border-none shadow-lg
                          `}
                        >
                          {(product.stock_qty || 0) > 0 ? 'Verified Stock' : 'Out of Logistics'}
                        </Badge>
                        {product.featured && (
                          <Badge className="bg-amber-400 text-amber-950 font-black uppercase text-[10px] tracking-widest px-3 py-1 border-none shadow-lg">Premium Tier</Badge>
                        )}
                      </div>

                      <div className="absolute bottom-4 left-4 z-10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/20">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                          <span className="text-[10px] font-black uppercase tracking-tighter text-slate-700">Real-time Pricing</span>
                        </div>
                      </div>
                    </div>

                    <CardContent className="flex-1 p-8">
                      <div className="flex flex-col h-full">
                        <div className="mb-6">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[10px] font-black text-[#be1800] uppercase tracking-[0.2em]">{getCategoryName(product.category_id)}</span>
                            {product.grade && <span className="text-[10px] font-bold text-slate-400 uppercase">Grade: {product.grade}</span>}
                          </div>
                          <Link to={`/products/${product.id}`} className="block">
                            <h3 className="text-2xl font-black text-slate-900 leading-tight mb-3 group-hover:text-[#be1800] transition-colors">{product.name}</h3>
                          </Link>
                          <p className="text-slate-500 font-medium text-sm line-clamp-2 leading-relaxed h-10">
                            {product.description || 'Professional-grade industrial component with verified technical specifications.'}
                          </p>
                        </div>

                        <div className="mt-auto pt-6 border-t border-slate-100 flex items-end justify-between">
                          <div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Market Quotation</span>
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-3xl font-black text-slate-900 tracking-tighter">₹{product.price?.toLocaleString() || '---'}</span>
                              <span className="text-sm font-bold text-slate-400">/{product.unit}</span>
                            </div>
                          </div>

                          {product.min_order && (
                            <div className="text-right">
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">M.O.Q</span>
                              <span className="text-sm font-black text-slate-700">{product.min_order} {product.unit}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="p-8 pt-0 flex gap-4">
                      <Link to={`/products/${product.id}`} className="flex-1">
                        <Button variant="outline" className="w-full h-14 border-slate-200 hover:border-slate-800 hover:bg-slate-50 font-black uppercase tracking-widest rounded-2xl transition-all text-xs">
                          <Info className="h-4 w-4 mr-2" />
                          Details
                        </Button>
                      </Link>
                      <Button
                        onClick={() => handleAddToCart(product)}
                        disabled={(product.stock_qty || 0) <= 0}
                        className="flex-1 h-14 bg-[#be1800] hover:bg-[#a01500] text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-red-900/20 active:scale-[0.98] transition-all text-xs"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Procure
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-slate-200 mt-8 shadow-sm"
            >
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="h-10 w-10 text-slate-200" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">Inventory Ledger Clear</h3>
              <p className="text-slate-500 font-medium max-w-sm mx-auto mb-8">
                {searchQuery ? `No industrial components matched your query: "${searchQuery}"` : 'We are currently updating our strategic inventory. Check back soon.'}
              </p>
              <Button
                variant="outline"
                onClick={() => setFilter('all')}
                className="font-black uppercase tracking-widest border-slate-200 rounded-xl"
              >
                Reset Diagnostics
              </Button>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
