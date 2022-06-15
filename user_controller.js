const session = require('express-session');
const pool = require('./db');
const GameState = require('./game_state');
const UserModel = require('./models');

const GAMES = {
    game_states: [],
    find_game: function (user) {
        for (let i = this.game_states.length - 1; i >= 0; i--) {
            if (this.game_states[i].is_in_search && this.game_states[i].user1.login != user.login) {
                this.game_states[i].user2 = user;
                this.game_states[i].is_in_search = false;
                return this.game_states[i];
            }
            if (!this.game_states[i].is_in_search && (this.game_states[i].user1.login == user.login || this.game_states[i].user2.login == user.login)) {
                return this.game_states[i];
            }
        }
        return undefined;
    },
    del_game: function (login) {
        for (let i = 0; i < this.game_states.length; i++) {
            if (!this.game_states[i].user2.login == login || this.game_states[i].user1.login == login) {
                this.game_states.splice(i);
            }
        }
    }
};

const login_get = (req, res) => {
    if (req.session.user) {
        res.redirect('/main_screen');
        return;
    }
    res.render('login');
}

const login_post = (req, res) => {
    const user = new UserModel();
    user.find(req.body.login).then(() => {
        if (req.body.password == user.password) {
            req.session.user = user;
            res.redirect('/main_screen');
        }
        else {
            res.sendStatus(401);
            // res.status(401).send('<h1>Wrong password, blyat\'</h1>');
        }
    });
}

const main_get = (req, res) => {
    if (!req.session.user)
        res.redirect('/login');
    else
        res.render('main_screen', { login: req.session.user.login, has_avatar: req.session.user.has_avatar });
}

const main_post = (req, res) => {
    req.files.file.mv(`public/user_avatars/${req.session.user.login}.jpg`);
    var user = new UserModel();
    user.find(req.session.user.login).then(()=>{
        user.setAvatar();
    });
    res.render('main_screen', { login: req.session.user.login, has_avatar: true });
}

const reg_get = (req, res) => {
    if (req.session.user) {
        res.redirect('/main_screen');
        return;
    }
    res.render('reg');
}

const reg_post = (req, res) => {
    const user = new UserModel(req.body.login, req.body.password);
    user.save().then(() => {
        req.session.user = user;
        res.redirect('/main_screen');
    });
}

const redir_login = (req, res) => {
    if (!req.session.user)
        res.redirect('/login');
    else
        res.redirect('/main_screen');
}

const exit_get = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
}

const search_game_get = (req, res) => {
    if (!req.session.user) {
        res.redirect('/login');
        return;
    }

    var game = GAMES.find_game(req.session.user);
    if (!req.session.user.is_searching) {
        // console.log("12341234123412341234");
        // console.log(req.session);
        req.session.user.is_searching = true;
        if (!game)
            GAMES.game_states.push(new GameState(req.session.user));
    }
    
    if (game) {
        req.session.game = game;
        res.redirect('/game');
        return;
    }
    res.render('search_game');
}

const game_get = (req, res) => {
    if (!req.session.user) {
        res.redirect('/login');
        return;
    }
    if (!req.session.game) {
        res.redirect('/main_screen');
        return;
    }
    res.render('game.ejs', {
        has_avatar1: req.session.game.user1.has_avatar,
        has_avatar2: req.session.game.user2.has_avatar,
        login1: req.session.game.user1.login,
        login2: req.session.game.user2.login
    });
}

module.exports = { login_get, login_post, game_get, main_get, reg_get, redir_login, reg_post, exit_get, main_post, search_game_get }
