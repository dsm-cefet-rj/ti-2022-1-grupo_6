require('dotenv').config()
const { v4 } = require("uuid");

let products = [
    {
        id: "1",
        title: "titulo",
        imageUrl: "https://img.olx.com.br/images/18/188159697231994.jpg",
        price: "R$ 1500.00",
        state: "Rio de Janeiro",
        quantity: 1,
        createdAt: "2022-04-18T19:41:07.636Z",
    }
]

module.exports = {
    async getAll(req, res) {
        try {
            return res.json(products);
        } catch (error) {
			return res.status(405).json({message: err.message});
        }
    },

    async addProduct(req, res) {
        const product = req.body;
        products.push(product);

        try {
            return res.json(products);
        } catch (error) {
			return res.status(405).json({message: err.message});
        }
    },

    async updateProduct(req, res) {
        const {id} = req.params;
        const {quantity} = req.body;

        try {
            let productIndex = products.findIndex(product => product.id == id);
            
            if (productIndex === -1) {
                throw new Error("id do produto não existe");
            }
            
            if (!quantity) {
                throw new Error("quantidade de produto não definida");
            }

            products[productIndex].quantity = quantity;

            return res.json({message: "produto atualizado com sucesso!"});
        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    },

    async deleteProduct(req, res) {
        const {id} = req.params;
        
        try {
            let productIndex = products.findIndex(product => product.id == id);
            
            if (productIndex === -1) {
                throw new Error("id do produto não existe");
            }
            
            products.splice(productIndex, 1);

            return res.json({message: "produto removido com sucesso!"});
        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    },

    async deleteAll(req, res) {
        try {
            products = [];
            return res.json({message: "produtos removidos com sucesso!"});
        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    }
}
