const express = require('express');
const user_controller = require('./user_controller');

const router = express.Router();

// router.get('/', user_controller.redir_login);
router.get('/login', user_controller.login_get);
router.post('/login', user_controller.login_post);
router.get('/main_screen', user_controller.main_get);
router.post('/main_screen', user_controller.main_post)
router.get('/register', user_controller.reg_get);
router.post('/register', user_controller.reg_post);
router.get('/exit', user_controller.exit_get);
router.get('/search_game', user_controller.search_game_get);
router.get('/game', user_controller.game_get);
router.use(user_controller.redir_login);
// router.get('/', (req, res) => {
    
// })

module.exports = router;
