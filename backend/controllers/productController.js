const Product = require('../models/Product');

const getProducts = async (req, res) => {
  try {
    const pageSize = Number(req.query.limit) || 9;
    const page = Number(req.query.page) || 1;

    const query = {};

    if (req.query.search) {
      query.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    if (req.query.category) {
      const categories = req.query.category.split(',').map((c) => c.trim());
      query.category = { $in: categories.map((c) => new RegExp(`^${c}$`, 'i')) };
    }

    if (req.query.dressStyle) {
      const styles = req.query.dressStyle.split(',').map((s) => s.trim());
      query.dressStyle = { $in: styles.map((s) => new RegExp(`^${s}$`, 'i')) };
    }

    if (req.query.size) {
      const sizes = req.query.size.split(',').map((s) => s.trim());
      query.sizes = { $in: sizes };
    }

    if (req.query.color) {
      const colors = req.query.color.split(',').map((c) => c.trim());
      query['colors.name'] = { $in: colors.map((c) => new RegExp(`^${c}$`, 'i')) };
    }

    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) {
        query.price.$gte = Number(req.query.minPrice);
      }
      if (req.query.maxPrice) {
        query.price.$lte = Number(req.query.maxPrice);
      }
    }

    let sort = { createdAt: -1 };
    if (req.query.sort === 'price-asc') {
      sort = { price: 1 };
    } else if (req.query.sort === 'price-desc') {
      sort = { price: -1 };
    } else if (req.query.sort === 'popular') {
      sort = { ratingCount: -1 };
    } else if (req.query.sort === 'rating') {
      sort = { rating: -1 };
    } else if (req.query.sort === 'newest') {
      sort = { createdAt: -1 };
    }

    const count = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort(sort)
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize) || 1,
      total: count
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getNewArrivals = async (req, res) => {
  try {
    const products = await Product.find({ isNewArrival: true }).limit(4);
    if (products.length < 4) {
      const moreProducts = await Product.find({}).sort({ createdAt: -1 }).limit(4);
      return res.json(moreProducts);
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTopSelling = async (req, res) => {
  try {
    const products = await Product.find({ isTopSelling: true }).limit(4);
    if (products.length < 4) {
      const moreProducts = await Product.find({}).sort({ rating: -1, ratingCount: -1 }).limit(4);
      return res.json(moreProducts);
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      discountPercentage,
      category,
      dressStyle,
      stock,
      isNewArrival,
      isTopSelling
    } = req.body;

    let sizes = req.body.sizes;
    if (typeof sizes === 'string') {
      try {
        sizes = JSON.parse(sizes);
      } catch (e) {
        sizes = sizes.split(',').map((s) => s.trim());
      }
    }

    let colors = req.body.colors;
    if (typeof colors === 'string') {
      try {
        colors = JSON.parse(colors);
      } catch (e) {
        colors = colors.split(',').map((c) => ({ name: c.trim(), hex: '#000000' }));
      }
    }

    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map((file) => `/uploads/${file.filename}`);
    } else if (req.body.images) {
      if (Array.isArray(req.body.images)) {
        images = req.body.images;
      } else if (typeof req.body.images === 'string') {
        try {
          images = JSON.parse(req.body.images);
        } catch (e) {
          images = [req.body.images];
        }
      }
    }

    if (!images.length) {
      images = ['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80'];
    }

    const product = new Product({
      title,
      description,
      price: Number(price),
      discountPercentage: Number(discountPercentage) || 0,
      category,
      dressStyle: dressStyle || 'Casual',
      sizes: sizes || ['Small', 'Medium', 'Large', 'X-Large'],
      colors: colors || [{ name: 'Black', hex: '#000000' }],
      stock: Number(stock) || 10,
      isNewArrival: isNewArrival === 'true' || isNewArrival === true,
      isTopSelling: isTopSelling === 'true' || isTopSelling === true,
      images,
      rating: 4.5,
      ratingCount: 10
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const {
      title,
      description,
      price,
      discountPercentage,
      category,
      dressStyle,
      stock,
      isNewArrival,
      isTopSelling
    } = req.body;

    if (title) product.title = title;
    if (description) product.description = description;
    if (price !== undefined) product.price = Number(price);
    if (discountPercentage !== undefined) product.discountPercentage = Number(discountPercentage);
    if (category) product.category = category;
    if (dressStyle) product.dressStyle = dressStyle;
    if (stock !== undefined) product.stock = Number(stock);
    if (isNewArrival !== undefined) product.isNewArrival = isNewArrival === 'true' || isNewArrival === true;
    if (isTopSelling !== undefined) product.isTopSelling = isTopSelling === 'true' || isTopSelling === true;

    if (req.body.sizes) {
      let sizes = req.body.sizes;
      if (typeof sizes === 'string') {
        try {
          sizes = JSON.parse(sizes);
        } catch (e) {
          sizes = sizes.split(',').map((s) => s.trim());
        }
      }
      product.sizes = sizes;
    }

    if (req.body.colors) {
      let colors = req.body.colors;
      if (typeof colors === 'string') {
        try {
          colors = JSON.parse(colors);
        } catch (e) {
          colors = colors.split(',').map((c) => ({ name: c.trim(), hex: '#000000' }));
        }
      }
      product.colors = colors;
    }

    if (req.files && req.files.length > 0) {
      const newImages = req.files.map((file) => `/uploads/${file.filename}`);
      product.images = newImages;
    } else if (req.body.images) {
      let images = req.body.images;
      if (typeof images === 'string') {
        try {
          images = JSON.parse(images);
        } catch (e) {
          images = [images];
        }
      }
      if (Array.isArray(images) && images.length > 0) {
        product.images = images;
      }
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
      verified: true
    };

    product.reviews.push(review);
    product.ratingCount = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added successfully', product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  getNewArrivals,
  getTopSelling,
  createProduct,
  updateProduct,
  deleteProduct,
  addProductReview
};

