const pool = require('./db');

class UserModel {
    constructor(login, password) {
        this.id = 0;
        this.login = login;
        this.password = password;
        this.has_avatar = false;
        this.is_searching = false;
    }
    async find(login) {
        const query_res = await pool
            .promise()
            .query('SELECT * FROM `users` WHERE `login` = ?', login);
        if (!query_res[0][0])
            return;
        this.id = query_res[0][0].id_user;
        this.login = query_res[0][0].login;
        this.password = query_res[0][0].password;
        this.has_avatar = query_res[0][0].has_avatar;
        this.is_searching = query_res[0][0].is_searching;
    }
    async save() {
        await pool
            .promise()
            .query(
                'INSERT INTO `users` (`login`, `password`) VALUES (?, ?)',
                [this.login, this.password]
            );
        const query_res = await pool
            .promise()
            .query('SELECT `id_user` FROM `users` WHERE LOGIN = ?', this.login);
        this.id = query_res[0][0].id;
        console.log(`User ${this.login} saved`);
    }
    delete() {
        pool.query('DELETE FROM `users` WHERE id = ?)', this.id, (err) => {
            if (err) {
                console.log(err);
                return;
            }
            else {
                console.log(`User ${this.login} (id:${this.id}) deleted`);
            }
        });
    }
    setAvatar() {
        pool.query('UPDATE `users` SET `has_avatar` = 1 WHERE `id_user` = ?', this.id);
        this.has_avatar = true;
    }
}

module.exports = UserModel;
