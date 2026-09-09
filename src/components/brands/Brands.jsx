import './Brands.css';

const Brands = () => {
  return (
    <section id="brands" className="brands-bar py-8 md:py-10 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-6 md:gap-12">
          <div className="font-serif font-black text-2xl md:text-3xl brand-text tracking-widest text-center flex-1 sm:flex-initial">
            VERSACE
          </div>
          <div className="font-sans font-black text-2xl md:text-3xl brand-text text-center flex-1 sm:flex-initial">
            ZARA
          </div>
          <div className="font-serif font-bold text-2xl md:text-3xl brand-text tracking-wider text-center flex-1 sm:flex-initial">
            GUCCI
          </div>
          <div className="font-sans font-extrabold text-2xl md:text-3xl brand-text text-center flex-1 sm:flex-initial">
            PRADA
          </div>
          <div className="font-sans font-light text-xl md:text-2xl brand-text text-center flex-1 sm:flex-initial">
            Calvin Klein
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;

