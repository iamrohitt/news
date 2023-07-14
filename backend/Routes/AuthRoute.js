const { Signup, Login, Logout, Home, Profile, UserInfo } = require('../Controllers/AuthController')
const { authMiddleware } = require('../Middlewares/AuthMiddleware')
const router = require('express').Router()

router.post('/signup', Signup)
router.post('/login', Login)
router.post('/', authMiddleware, Home) // this is just a test route
router.post('/logout', Logout)
router.get('/likedNews', authMiddleware, Profile)
router.get('/api/user', authMiddleware, UserInfo)


module.exports = router