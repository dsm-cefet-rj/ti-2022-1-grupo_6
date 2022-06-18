const MercadoPago = require('mercadopago');
require('dotenv').config()
const { v4 } = require("uuid");

const getFullUrl = (req) => {
    const url = req.protocol + '://' + req.get('host')
    console.log(url)
    return url
  }

module.exports = {
    async checkout(req, res) {
        MercadoPago.configure({
            sandbox: true,
            access_token: process.env.MP_ACCESS_TOKEN
        })

        const { items, payer } = req.body
        const id = v4()

        const purchaseOrder = {
            items,
            payer,
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
