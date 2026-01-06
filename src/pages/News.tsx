import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Newspaper, BookOpen, TrendingUp, Leaf, Megaphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const categories = [
    { name: 'All', icon: Newspaper },
    { name: 'News', icon: Newspaper },
    { name: 'Blogs', icon: BookOpen },
    { name: 'Market Updates', icon: TrendingUp },
    { name: 'Sustainability', icon: Leaf },
    { name: 'Company Announcements', icon: Megaphone },
];

export default function News() {
    const [articles, setArticles] = useState<any[]>([]);
    const [featuredArticle, setFeaturedArticle] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
        fetchArticles();
    }, [activeCategory]);

    const fetchArticles = async () => {
        setLoading(true);
        try {
            let query = supabase
                .from('news_articles')
                .select('*')
                .eq('status', 'Published')
                .order('published_at', { ascending: false });

            if (activeCategory !== 'All') {
                query = query.eq('category', activeCategory);
            }

            const { data, error } = await query;

            if (error) throw error;

            if (data) {
                // Set featured article (only explicitly marked is_featured)
                const featured = data.find(a => a.is_featured);
                setFeaturedArticle(featured);
                setArticles(data);
            }
        } catch (error) {
            console.error('Error fetching articles:', error);
        } finally {
            setLoading(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />

            <main className="flex-1">
                {/* Hero Section */}
                <div className="bg-[#002b4d] py-12 sm:py-16 md:py-24 text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_#fff_1px,_transparent_1px)] bg-[length:40px_40px]"></div>
                    </div>
                    <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-3xl mx-auto"
                        >
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-2">Lohakart News & Insights</h1>
                            <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed px-4">
                                Stay Updated with the Latest from the Metal Industry. Market trends, expert opinions, and company announcements.
                            </p>
                        </motion.div>
                    </div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 -mt-8 sm:-mt-12 relative z-20 pb-12 sm:pb-16 md:pb-20">
                    {/* Featured Article */}
                    {featuredArticle && activeCategory === 'All' && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="mb-12 sm:mb-16"
                        >
                            <Card className="overflow-hidden border-none shadow-2xl rounded-2xl sm:rounded-3xl bg-white">
                                <div className="grid grid-cols-1 lg:grid-cols-2">
                                    <div className="relative h-56 sm:h-64 lg:h-auto overflow-hidden">
                                        <img
                                            src={featuredArticle.image_url || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80'}
                                            alt={featuredArticle.title}
                                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                        />
                                        <Badge className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-[#be1800] hover:bg-[#be1800] text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold tracking-wide uppercase">
                                            Featured
                                        </Badge>
                                    </div>
                                    <div className="p-6 sm:p-8 md:p-12 flex flex-col justify-center">
                                        <Badge variant="outline" className="w-fit mb-3 sm:mb-4 text-[#005081] border-[#005081]/20 text-xs sm:text-sm">
                                            {featuredArticle.category}
                                        </Badge>
                                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
                                            {featuredArticle.title}
                                        </h2>
                                        <p className="text-slate-600 text-base sm:text-lg mb-6 sm:mb-8 line-clamp-3 leading-relaxed">
                                            {featuredArticle.excerpt}
                                        </p>
                                        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-slate-500 mb-6 sm:mb-8 border-t pt-4 sm:pt-6 border-slate-100">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                <span className="text-xs sm:text-sm">{format(new Date(featuredArticle.published_at || featuredArticle.created_at), 'MMMM dd, yyyy')}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <User className="w-4 h-4" />
                                                <span className="text-xs sm:text-sm">{featuredArticle.author || 'Lohakart Team'}</span>
                                            </div>
                                        </div>
                                        <Link to={`/news/${featuredArticle.slug}`} onClick={scrollToTop}>
                                            <Button className="bg-[#005081] hover:bg-[#003d63] text-white px-6 sm:px-8 py-5 sm:py-6 rounded-xl text-base sm:text-lg group w-full sm:w-fit transition-all shadow-lg hover:shadow-blue-900/20">
                                                Read Full Article
                                                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    )}

                    {/* Filters - Horizontal Scroll on Mobile */}
                    <div className="mb-8 sm:mb-12 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
                        <div className="flex sm:flex-wrap items-center sm:justify-center gap-2 sm:gap-3 min-w-max sm:min-w-0 pb-2 sm:pb-0">
                            {categories.map((cat) => (
                                <Button
                                    key={cat.name}
                                    variant={activeCategory === cat.name ? "default" : "outline"}
                                    onClick={() => setActiveCategory(cat.name)}
                                    className={`rounded-full px-4 sm:px-6 py-2 whitespace-nowrap text-sm sm:text-base transition-all duration-300 flex-shrink-0 ${activeCategory === cat.name
                                        ? "bg-[#005081] hover:bg-[#003d63] shadow-lg shadow-blue-900/10 text-white"
                                        : "bg-white hover:bg-slate-100 border-slate-200 text-slate-600"
                                        }`}
                                >
                                    <cat.icon className="w-4 h-4 mr-2" />
                                    {cat.name}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Listing Grid */}
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="h-[400px] sm:h-[450px] bg-slate-200 animate-pulse rounded-2xl sm:rounded-3xl" />
                            ))}
                        </div>
                    ) : articles.length === 0 ? (
                        <div className="text-center py-16 sm:py-20 bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100">
                            <Newspaper className="w-12 h-12 sm:w-16 sm:h-16 text-slate-300 mx-auto mb-4" />
                            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 px-4">No articles found</h3>
                            <p className="text-slate-500 text-sm sm:text-base px-4">Try selecting a different category or check back later.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
                            {articles.map((article, index) => (
                                <motion.div
                                    key={article.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link to={`/news/${article.slug}`} onClick={scrollToTop} className="group block h-full">
                                        <Card className="h-full overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-500 rounded-2xl sm:rounded-3xl bg-white flex flex-col">
                                            <div className="relative h-48 sm:h-60 overflow-hidden">
                                                <img
                                                    src={article.image_url || 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80'}
                                                    alt={article.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                <Badge className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white/90 backdrop-blur-sm text-slate-900 hover:bg-white border-none shadow-sm text-xs sm:text-sm">
                                                    {article.category}
                                                </Badge>
                                            </div>
                                            <CardContent className="p-5 sm:p-6 md:p-8 flex-1 flex flex-col">
                                                <div className="flex items-center gap-2 sm:gap-3 text-slate-400 text-xs mb-3 sm:mb-4 flex-wrap">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-3 h-3" />
                                                        {format(new Date(article.published_at || article.created_at), 'MMM dd, yyyy')}
                                                    </span>
                                                    <span>•</span>
                                                    <span className="flex items-center gap-1 text-[#be1800]">
                                                        {article.author || 'Lohakart'}
                                                    </span>
                                                </div>
                                                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4 group-hover:text-[#005081] transition-colors leading-tight">
                                                    {article.title}
                                                </h3>
                                                <p className="text-slate-500 text-sm mb-4 sm:mb-6 line-clamp-3 leading-relaxed">
                                                    {article.excerpt}
                                                </p>
                                                <div className="mt-auto pt-3 sm:pt-4 border-t border-slate-50 flex items-center text-[#005081] font-semibold text-sm group-hover:gap-2 transition-all">
                                                    Read More <ArrowRight className="w-4 h-4 ml-1" />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}