import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Target, Users, TrendingUp, Building2, Globe, Truck, Shield } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-slate-900 py-24 md:py-32">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/60" />

          <div className="container relative mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-6 backdrop-blur-sm">
                <Building2 className="h-4 w-4" />
                <span>Established 2024</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight leading-tight">
                Building India's <span className="text-blue-500">Steel Future</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                We are India's leading B2B digital marketplace for steel procurement, connecting visionary builders with quality manufacturers.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 -mt-20 relative z-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <div className="h-full bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
                  <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                    <Target className="h-8 w-8 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4 text-slate-900">Our Mission</h2>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    To democratize steel procurement by building a transparent, efficient, and technology-driven ecosystem that empowers every business to build better.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="h-full bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
                  <div className="bg-amber-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                    <TrendingUp className="h-8 w-8 text-amber-600" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4 text-slate-900">Our Vision</h2>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    To be the backbone of India's infrastructure growth, creating a seamless digital highway for steel trade across 500+ cities.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Core Values / Why Choose Us */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Why Leaders Choose Lohakart</h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                We deliver more than just products; we deliver reliability, transparency, and excellence.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: 'Uncompromised Quality',
                  description: 'Every product is ISI certified and rigorously tested for industrial standards.',
                  color: 'text-blue-600',
                  bg: 'bg-blue-50'
                },
                {
                  icon: Users,
                  title: 'Customer Obsession',
                  description: 'Dedicated account managers and 24/7 support for all your project needs.',
                  color: 'text-green-600',
                  bg: 'bg-green-50'
                },
                {
                  icon: Globe,
                  title: 'Nationwide Network',
                  description: 'Seamless logistics covering every corner of India with real-time tracking.',
                  color: 'text-purple-600',
                  bg: 'bg-purple-50'
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full border-slate-100 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-8">
                      <div className={`${item.bg} w-14 h-14 rounded-xl flex items-center justify-center mb-6`}>
                        <item.icon className={`h-7 w-7 ${item.color}`} />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-slate-900">{item.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 bg-slate-900 border-t border-slate-800">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
              {[
                { value: '10,000+', label: 'Happy Customers' },
                { value: '50,000+', label: 'Tons Delivered' },
                { value: '500+', label: 'Cities Covered' },
                { value: '24/7', label: 'Expert Support' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-4xl md:text-5xl font-bold mb-2 text-white">{stat.value}</div>
                  <div className="text-sm md:text-base font-medium text-slate-400 uppercase tracking-wide">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
