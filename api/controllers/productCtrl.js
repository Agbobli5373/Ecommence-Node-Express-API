const Product = require("../models/ProductModel");

//Controller for getting all product
exports.getAllProducts = (req, res, next) => {
  Product.find({})
    .exec()
    .then((result) => {
      const resporn = {
        count: result.length,
        product: result.map((data) => {
          return {
            name: data.name,
            price: data.price,
            _id: data._id,
            request: {
              type: "GET",
              url: `http://localhost:5000/product/${data._id}`,
            },
          };
        }),
      };

      res.status(200).json(resporn);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//Controller for creating a product
exports.addProduct = (req, res, next) => {
  console.log(req.body.file)
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
  });
  product
    .save()
    .then((result) => {
      const resporn = {
        message: "Product is created successfully",
        createdProduct: {
          name: result.name,
          price: result.price,
          _id: result._id,
          request: {
            type: "GET",
            url: `http://localhost:5000/product/${result._id}`,
          },
        },
      };
      res.status(201).json(resporn);
    })
    .catch((err) => {
      console.log(err);
    });
}

//Controller for getting single product
exports.getProduct = (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .exec()
    .then((result) => {
      const resporn = {
        _id: result._id,
        name: result.name,
        price: result.price,
        type: "GET",
        url: `http://localhost:5000/product/${result._id}`,
      };
      result
        ? res.status(200).json(resporn)
        : res.status(404).json({ message: "ID Not Found" });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//controller for upadating product
exports.updateProduct = (req, res, next) => {
  const id = req.params.productId;
  Product.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    useFindmodify: false,
  })
    .exec()
    .then((result) => {
      const resporn = {
        message: "Updated product",
        product: {
          name: result.name,
          price: result.price,
          _id: result._id,
        },
        request: {
          Type: "GET",
          url: `http://localhost:5000/product ${result._id}`,
        },
      };
      res.status(200).json(resporn);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//Controller for delleing a product
exports.deleteProduct = (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then((result) => {
      const resporn = {
        message: `Product with ${id} is deleted`,
        request: {
          Type: "POST",
          url: `http://localhost:5000/product`,
        },
        body: {
          name: "String",
          price: "Number",
        },
      };
      res.status(200).json(resporn);
    })
    .catch((err) => {
      res.status(500).json(err);
    });

};