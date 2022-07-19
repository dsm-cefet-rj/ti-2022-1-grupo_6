const MercadoPago = require('mercadopago');
require('dotenv').config()
const { v4 } = require("uuid");

const orders = [];

const Order = require('../models/OrderSchema');
const OrderItems = require('../models/OrderItems')

const getFullUrl = (req) => {
    const url = req.protocol + '://' + req.get('host')
    console.log(url)
    return url
}

module.exports = {
    async getOrdersItems(req,res) {
        const {buyer} = req.body;
        const orders = await OrderItems.find({
            buyer
        }).populate('order').populate('product')

        return res.send({
            "orders": orders
        })
    },

    async createOrder(req, res) {
        const {totalPrice, buyer, discount, productsList} = req.body

        const createOrderResponse = await Order.create({
            totalPrice: totalPrice.toString(),
            buyer: buyer._id.toString()
        })

        const orderId = createOrderResponse._id

        for(let i=0; i<productsList.length; i++) {
            await OrderItems.create({
                "order": orderId.toString(),
                "product": productsList[i].id,
                "quantity": productsList[i].quantity,
                "unit_price": productsList[i].unit_price,
                "title": productsList[i].title,
                "description": productsList[i].description,
                "buyer": buyer._id.toString()
            })
        }
        await this.checkout(req);
        //return res.send('criado com sucesso');
    },

    async checkout(req, res) {
        console.log('cheguei no checkout')
        const { buyer, productsList} = req.body

        MercadoPago.configure({
            sandbox: true,
            access_token: process.env.MP_ACCESS_TOKEN
        })

        const id = v4()

        const purchaseOrder = {
            items: productsList,
            payer: {
                email: buyer.email
            },
            auto_return: 'all',
            external_reference: id,
            back_urls: {
                success: getFullUrl(req) + '/order/success',
                pending: getFullUrl(req) + '/payments/pending',
                failure: getFullUrl(req) + '/payments/failure',
            }
        }

        try {
            const preference = await MercadoPago.preferences.create(purchaseOrder)
            return res.send({
                "url": preference.body.init_point
            })
        } catch (err) {
            return res.send(err.message)
        }
    },

    async success(req, res) {
        return res.redirect('https://techbuy-client.herokuapp.com/order')
    }
}
