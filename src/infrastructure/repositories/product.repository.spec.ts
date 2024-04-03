import { Sequelize } from "sequelize-typescript";

import ProductRepository from "./product.repository";
import ProductModel from "../database/sequelize/models/product.model";
import Product from "../../domain/entities/product";

describe("Product repository test", () => {
  let sequileze: Sequelize;

  beforeEach(async () => {
    sequileze = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequileze.addModels([ProductModel]);
    await sequileze.sync();
  });

  afterEach(async () => {
    await sequileze.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: "1" } });

    expect(productModel?.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 1",
      price: 100,
    });
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: "1" } });

    expect(productModel?.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 1",
      price: 100,
    });

    product.changeName("Product 2");
    product.changePrice(200);

    await productRepository.update(product);

    const productModel2 = await ProductModel.findOne({ where: { id: "1" } });

    expect(productModel2?.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 2",
      price: 200,
    });
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: "1" } });

    const foundProduct = await productRepository.findById("1");

    expect(productModel?.toJSON()).toStrictEqual({
      id: foundProduct.getId(),
      name: foundProduct.getName(),
      price: foundProduct.getPrice(),
    });
  });

  it("should find all products", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);
    await productRepository.create(product);

    const product2 = new Product("2", "Product 2", 200);
    await productRepository.create(product2);

    const foundProducts = await productRepository.findAll();
    const products = [product, product2];

    expect(products).toEqual(foundProducts);    
  });
  
});
