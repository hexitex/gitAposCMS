module.exports = {
  name: 'ecom-cart',
  alias: 'Cart',
  label: 'Cart',
  extends: 'apostrophe-module',

  construct: function (self, options) {
    self.pushAsset('script', 'user', { when: 'always' });


    // Returns true or false if product is found by id
    const findProduct = function (req, product_id, cb) {
      // Use docs manager
      self.apos.docs.getManager('ecom-product').find(req,
        {
          _id: product_id
        }
      ).sort({ updatedAt: -1 })
        .toArray(function (err, profiles) {
          profiles.length == 0 ? cb(false) : cb(true);
          if (err) { console.log(JSON.stringify(err)); }
        });
    };

    // Return products data
    const getProducts = function (req, cb) {
      // Use docs manager
      self.apos.docs.getManager('ecom-product').find(req,
        {
          _id: { $in: req.session.cart }
        }
      ).toArray(function (err, products) {
        // console.log(products)
        products.length == 0 ? cb(false) : cb(products);
        if (err) { console.log(JSON.stringify(err)); }
      });
    };

    // Add product to cart
    self.apos.app.post('/cart/add', function (req, res, next) {
      console.log('Running add');
      const product_id = req.body.productId;
      const quantity = +req.body.quantity;
      // Return if amount is not a number
      if (isNaN(quantity) || quantity <= 0) {
        res.json(false);
        return;
      }
      if (req.session.cart) {
        findProduct(req, product_id, function (found) {
          if (found) {

            const i = req.session.cart.indexOf(product_id);
            // Element in cart, update
            if (i > -1) {
              req.session.cartTotals[i] += quantity;
            }
            else {
              // If not in cart but we want to add
              req.session.cart.push(product_id);
              req.session.cartTotals.push(quantity);
            }
          }
          res.json(true);
        });
      }
      else {
        req.session.cart = new Array();
        req.session.cartTotals = new Array();
        findProduct(req, product_id, function (found) {
          if (found) {
            req.session.cart.push(product_id);
            req.session.cartTotals.push(quantity);
            res.json(true);
            return;

          }
          res.json(false);
        });
      }
    });

    // Delete product from cart
    self.apos.app.post('/cart/delete', function (req, res, next) {
      // Get product id
      const product_id = req.body.productId;
      console.log('delete cart item', req.body);
      if (req.session.cart) {
        findProduct(req, product_id, function (found) {
          if (found) {
            const i = req.session.cart.indexOf(product_id);
            console.log('item ', i)
            // Element in cart
            if (i > -1) {
              console.log(req.session)
              req.session.cart.splice(i, 1);
              req.session.cartTotals.splice(i, 1);
              console.log(req.session);
                res.json(true);
                next();
             // res.redirect('/cart');
            }

          }
        });
      } else {
        req.session.cart = new Array();
        req.session.cartTotals = new Array();
        res.json(true);
      }

    });

    // Clear cart
    self.apos.app.get('/cart/clear', function (req, res, next) {
      if (req.session.cart) {
        delete req.session.cart;
        delete req.session.cartTotals;
      }
      res.redirect('back');
    });

    // Returns cart for checkout
    self.apos.app.get('/cart', function (req, res, next) {
      if (req.session.cart == null || req.session.cart.length == 0) {
        //Set data to something to show empty
        return self.sendPage(req, self.renderer('cart'));
      } else {
        getProducts(req, function (products) {
          console.log('prods')
          products.reverse();
          const cart = [], items = [];
          let total = 0;
          for (var i = 0; i < products.length; i++) {
            cart.push({ product_id: req.session.cart[i], product_data: products[i], quantity: req.session.cartTotals[i] });
            total += +products[i].total * req.session.cartTotals[i];
          }
          total = total.toFixed(2);
          const pay = {
            total
          };
          req.session.cart.pay = pay;
          req.session.cart.items = items;
          return self.sendPage(req, self.renderer('cart'), { ...req.data, cart, pay });

        });
      }
    });

    self.on('apostrophe-pages:beforeSend', 'cartitems', function (req) {
      if (req.session.cart) {
        try {
          return self.apos.docs.getManager('ecom-product').find(req,
            { _id: { $in: req.session.cart } }).toArray()
            .then(
              function (products) {
                if (products && products.length > 0) {
                  let total = 0;
                  for (var i = 0; i < products.length; i++) {
                    total += req.session.cartTotals[i]
                  }
                  req.data.cartitems = total;
                }
              }
            );
        }
        catch (e) { console.log(e) }
      }
    }
    );
  }
};