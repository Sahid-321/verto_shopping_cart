class Product {
  constructor(id, name, price, imageUrl) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.imageUrl = imageUrl;
  }

  static getAllProducts() {
    return [
      new Product(1, "Wireless Bluetooth Headphones", 79.99, "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop"),
      new Product(2, "Smart Watch", 199.99, "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop"),
      new Product(3, "Laptop Stand", 49.99, "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop"),
      new Product(4, "Wireless Mouse", 29.99, "https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&h=300&fit=crop"),
      new Product(5, "USB-C Hub", 39.99, "https://m.media-amazon.com/images/I/61Bm+9UTP6L._UF1000,1000_QL80_.jpg"),
      new Product(6, "Portable Charger", 24.99, "https://cdn.thewirecutter.com/wp-content/media/2023/08/powerbanks-2048px-1508-2x1-1.jpg?width=2048&quality=75&crop=2:1&auto=webp"),
      new Product(7, "Bluetooth Speaker", 59.99, "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop"),
      new Product(8, "Phone Case", 19.99, "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=300&h=300&fit=crop")
    ];
  }

  static findById(id) {
    const products = this.getAllProducts();
    return products.find(product => product.id === parseInt(id));
  }

  static findByIds(ids) {
    const products = this.getAllProducts();
    return products.filter(product => ids.includes(product.id));
  }
}

module.exports = Product;
