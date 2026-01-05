import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface PriceIndex {
  id: string;
  product_name: string;
  price: number;
  change_percent: number | null;
  date: string;
}

export default function PricingIndex() {
  const [prices, setPrices] = useState<PriceIndex[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    const { data, error } = await supabase
      .from('pricing_index')
      .select('*')
      .order('product_name');
    
    if (!error && data) {
      setPrices(data);
    }
    setLoading(false);
  };

  const getTrendIcon = (change: number | null) => {
    if (!change) return <Minus className="h-5 w-5" />;
    if (change > 0) return <TrendingUp className="h-5 w-5 text-success" />;
    return <TrendingDown className="h-5 w-5 text-destructive" />;
  };

  const getTrendColor = (change: number | null) => {
    if (!change) return 'default';
    return change > 0 ? 'default' : 'destructive';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12 bg-gradient-steel">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold mb-4">Daily Pricing Index</h1>
            <p className="text-muted-foreground text-lg">
              Real-time steel prices updated daily based on market conditions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prices.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="hover:shadow-steel transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{item.product_name}</CardTitle>
                      {getTrendIcon(item.change_percent)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-3xl font-bold text-primary">
                        ₹{item.price.toLocaleString()}
                        <span className="text-sm font-normal text-muted-foreground">/ton</span>
                      </div>
                      {item.change_percent !== null && (
                        <div className="flex items-center gap-2">
                          <Badge variant={getTrendColor(item.change_percent)}>
                            {item.change_percent > 0 && '+'}
                            {item.change_percent}%
                          </Badge>
                          <span className="text-sm text-muted-foreground">vs. previous day</span>
                        </div>
                      )}
                      <div className="text-xs text-muted-foreground">
                        Last updated: {new Date(item.date).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 p-6 bg-muted rounded-lg"
          >
            <h2 className="text-xl font-semibold mb-2">About Our Pricing</h2>
            <p className="text-muted-foreground">
              Our pricing index is updated daily based on market conditions, raw material costs, and industry demand. 
              Prices are indicative and may vary based on order quantity and delivery location. Contact us for bulk orders and special pricing.
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
