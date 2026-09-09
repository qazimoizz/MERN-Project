import { Link } from 'react-router-dom';
import './DressStyle.css';

const styles = [
  {
    title: 'Casual',
    slug: 'Casual',
    image: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=800&q=80',
    className: 'md:col-span-4'
  },
  {
    title: 'Formal',
    slug: 'Formal',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
    className: 'md:col-span-8'
  },
  {
    title: 'Party',
    slug: 'Party',
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1200&q=80',
    className: 'md:col-span-8'
  },
  {
    title: 'Gym',
    slug: 'Gym',
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80',
    className: 'md:col-span-4'
  }
];

const DressStyle = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="dress-style-wrapper p-6 sm:p-10 md:p-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-center text-black uppercase tracking-tight mb-8 md:mb-14 font-integral">
            BROWSE BY DRESS STYLE
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
            {styles.map((style) => (
              <Link
                key={style.title}
                to={`/shop?dressStyle=${style.slug}`}
                className={`dress-card relative overflow-hidden h-48 sm:h-64 md:h-72 block group shadow-sm ${style.className}`}
              >
                <div className="absolute top-6 left-6 z-10">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-black">
                    {style.title}
                  </h3>
                </div>

                <img
                  src={style.image}
                  alt={style.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DressStyle;

