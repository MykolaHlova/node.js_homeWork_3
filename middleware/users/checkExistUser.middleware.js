const { provider } = require('../../dataBase');

module.exports  = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const query = `SELECT * FROM user WHERE email = '${email}' AND password = '${password}'`;
        const [ userExist ] = await provider.promise().query(query);

        if (!userExist.length) {
            throw new Error(`User email or password incorrect`)
        }

        req.user = userExist;

        next()
    } catch (e) {
        res.status(400).json(e.message)
    }
};