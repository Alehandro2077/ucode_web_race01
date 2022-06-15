const UserModel = require("./models");

class GameState {
    constructor(user) {
        this.is_in_search = true;
        this.turn = true;
        this.user1 = user;
        this.user2 = undefined;
        this.health1 = 20;
        this.health2 = 20;
        this.field = [[], []];
        this.hand1 = [];
        this.hand2 = [];
        this.deck1 = [];
        this.deck2 = [];
    }
}

module.exports = GameState;
