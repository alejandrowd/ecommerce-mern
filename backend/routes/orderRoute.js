const express = require('express')
const router = express.Router()

const {newOrder,getSingleOrder,getMyOrders,getAllOrdersByAdmin,processOrderByAdmin,DeleteOrder} = require('../controllers/orderController')

const {isAuthenticatedUser, authorizeRoles} = require('../middlewares/authMiddleware')


router.route('/order/new').post(isAuthenticatedUser, newOrder)
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder)
router.route('/orders/me').get(isAuthenticatedUser, getMyOrders)

router.route('/admin/orders').get(isAuthenticatedUser,authorizeRoles('admin'), getAllOrdersByAdmin)
router.route('/admin/order/:id')
                            .put(isAuthenticatedUser,authorizeRoles('admin'), processOrderByAdmin)
                            .delete(isAuthenticatedUser,authorizeRoles('admin'), DeleteOrder)


module.exports = router