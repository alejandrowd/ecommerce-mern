const express = require('express')
const router = express.Router()
const {isAuthenticatedUser, authorizeRoles} = require('../middlewares/authMiddleware')

const {registerUser,
        loginUser,
        logoutUser,
        forgotPassword,
        resetPassword,
        getUserProfile,
        updatePassword,
        updateProfile,
        getAllUsers,
        getUserDetails,
        updateUserByAdmin,
        deleteUserByAdmin} = require('../controllers/authController')


router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)

router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)

router.route('/me').get(isAuthenticatedUser,getUserProfile)
router.route('/password/update').put(isAuthenticatedUser,updatePassword)
router.route('/me/update').put(isAuthenticatedUser,updateProfile)

router.route('/admin/users').get(isAuthenticatedUser,authorizeRoles('admin'),getAllUsers)
router.route('/admin/user/:id')
                            .get(isAuthenticatedUser,authorizeRoles('admin'),getUserDetails)
                            .put(isAuthenticatedUser,authorizeRoles('admin'),updateUserByAdmin)
                            .delete(isAuthenticatedUser,authorizeRoles('admin'),deleteUserByAdmin)

module.exports = router