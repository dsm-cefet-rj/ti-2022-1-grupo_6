const MercadoPago = require('mercadopago');
require('dotenv').config()
const { v4 } = require("uuid");

const orders = [];

const getFullUrl = (req) => {
    const url = req.protocol + '://' + req.get('host')
    console.log(url)
    return url
}

module.exports = {
    async createOrder(req, res) {
        const { user_id, value, seller_id } = req.body
        //checkout()
        const order = {
            user_id,
            value,
            seller_id
        }
        orders.push(order)

        return res.send(order)
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
                    unit_price: parseFloat('550.50')
                }
            ],
            payer: {
                email: 'example@gmail.com'
            },
            auto_return: 'all',
            external_reference: id,
            back_urls: {
                success: getFullUrl(req) + '/payments/success',
                pending: getFullUrl(req) + '/payments/pending',
                failure: getFullUrl(req) + '/payments/failure',
            }
        }

        try {
            const preference = await MercadoPago.preferences.create(purchaseOrder)
            return res.redirect(`${preference.body.init_point}`)
        } catch (err) {
            return res.send(err.message)
        }
    },
}
