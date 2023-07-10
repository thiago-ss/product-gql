"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductResolver = void 0;
const type_graphql_1 = require("type-graphql");
const ProductInput_1 = require("../dtos/inputs/ProductInput");
const Product_1 = require("../dtos/models/Product");
const uuid_1 = require("uuid");
let products = [];
let ProductResolver = exports.ProductResolver = class ProductResolver {
    createProduct(input) {
        const newProduct = {
            id: (0, uuid_1.v4)(),
            ...input,
            createdAt: new Date(),
        };
        products.push(newProduct);
        return newProduct;
    }
    updateProduct(id, input) {
        const existingProduct = products.find((product) => product.id === id);
        if (!existingProduct) {
            throw new Error(`Product with ID ${id} not found.`);
        }
        const updatedProduct = {
            ...existingProduct,
            ...input,
            createdAt: existingProduct.createdAt,
        };
        products = products.map((product) => product.id === id ? updatedProduct : product);
        return updatedProduct;
    }
    deleteProduct(id) {
        const existingProductIndex = products.findIndex((product) => product.id === id);
        if (existingProductIndex === -1) {
            throw new Error(`Product with ID ${id} not found.`);
        }
        const deletedProductId = products[existingProductIndex].id;
        products.splice(existingProductIndex, 1);
        return deletedProductId;
    }
    products() {
        return products;
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => Product_1.Product),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ProductInput_1.ProductInput]),
    __metadata("design:returntype", Product_1.Product)
], ProductResolver.prototype, "createProduct", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Product_1.Product),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, ProductInput_1.ProductInput]),
    __metadata("design:returntype", Product_1.Product)
], ProductResolver.prototype, "updateProduct", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => String),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", String)
], ProductResolver.prototype, "deleteProduct", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Product_1.Product]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], ProductResolver.prototype, "products", null);
exports.ProductResolver = ProductResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], ProductResolver);
