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
    async createOrder(req, res) {
        const {totalPrice, buyer, discount, productsList} = req.body
        const createOrderResponse = await Order.create({
            totalPrice: totalPrice.toString(),
            buyer: buyer.toString()
        })
        const orderId = createOrderResponse._id
        for(let i=0; i<=productsList.length; i++) {
            console.log(productsList[i])
            await OrderItems.create({
                "order": orderId.toString(),
                "product": productsList[i].id.toString(),
                "quantity": productsList[i].quantity,
                "unit_price": productsList[i].unit_price
            })
        }
        return res.send('criado com sucesso');
    },

    async checkout(req, res) {
        MercadoPago.configure({
            sandbox: true,
            access_token: process.env.MP_ACCESS_TOKEN
        })

        const id = v4()

        const purchaseOrder = {
            items: [
                {
                    id,
                    title: 'Ryzen 3200g',
                    description: 'Esse ta baratin',
                    quantity: 1,
                    currency_id: 'BRL',
                    unit_price: parseFloat('0.50')
                }
            ],
            payer: {
                email: 'example@gmail.com'
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
        return res.redirect('https://techbuy-client.herokuapp.com/')
    }
}
