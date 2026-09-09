import { useState, useEffect } from 'react';
import Hero from '../../components/hero/Hero';
import Brands from '../../components/brands/Brands';
import ProductList from '../../components/productlist/ProductList';
import DressStyle from '../../components/dressstyle/DressStyle';
import Testimonials from '../../components/testimonials/Testimonials';
import api from '../../utils/api';
import './Home.css';

const Home = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [topSelling, setTopSelling] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeProducts = async () => {
      try {
        setLoading(true);
        const [arrivalsRes, topRes] = await Promise.all([
          api.get('/products/new-arrivals'),
          api.get('/products/top-selling')
        ]);
        setNewArrivals(arrivalsRes.data);
        setTopSelling(topRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeProducts();
  }, []);

  return (
    <div className="home-page">
      <Hero />
      <Brands />

      <ProductList
        title="NEW ARRIVALS"
        products={newArrivals}
        viewAllLink="/shop?sort=newest"
        showDivider={true}
        loading={loading}
      />

      <ProductList
        title="TOP SELLING"
        products={topSelling}
        viewAllLink="/shop?sort=popular"
        showDivider={false}
        loading={loading}
      />

      <DressStyle />

      <Testimonials />
    </div>
  );
};

export default Home;

