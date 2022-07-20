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

const checkout = async (req) => {
    console.log('#4')
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
    console.log('#5')
    try {
        const preference = await MercadoPago.preferences.create(purchaseOrder)
        return {
            "url": preference.body.init_point
        }
    } catch (err) {
        return {
            "url": null
        }
    }
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
        console.log('#0')
        console.log(buyer)
        try{
            const createOrderResponse = await Order.create({
                totalPrice: totalPrice.toString(),
                buyer: buyer._id.toString()
            })
        } catch(e) {
            console.log(e)
        }
        console.log('#1')
        const orderId = createOrderResponse._id
        for(let i=0; i<productsList.length; i++) {
            console.log('#2')
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
        console.log('#3')
        const response = await checkout(req);
        console.log('#6')
        if(response.url == null) return res.send({"error": "não foi possível obter a url"})
        return res.send(url);
    },

    async success(req, res) {
        return res.redirect('https://techbuy-client.herokuapp.com/order')
    }
}
