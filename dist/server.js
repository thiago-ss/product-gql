"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const node_path_1 = __importDefault(require("node:path"));
const type_graphql_1 = require("type-graphql");
const apollo_server_1 = require("apollo-server");
const ProductResolver_1 = require("./resolvers/ProductResolver");
async function bootstrap() {
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: [ProductResolver_1.ProductResolver],
        emitSchemaFile: node_path_1.default.resolve(__dirname, "schema.gql"),
    });
    const server = new apollo_server_1.ApolloServer({
        schema,
    });
    const { url } = await server.listen(4000);
    console.log(`🚀 HTTP server running on ${url}`);
}
bootstrap();
