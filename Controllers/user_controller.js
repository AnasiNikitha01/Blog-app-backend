import bcrypt from 'bcryptjs';
import Users from '../Models/user_model';




//bcrypt defination random code
const salt = bcrypt.genSaltSync(10)


function user_cont(req, res) {

    const { Name, Email, password } = req.body;
    // res.json('hello')
    try {
        let userProfile = Users.create({
            Name: Name,
            Email: Email,
            // password:password
            password: bcrypt.hashSync(password,salt)  //password hashing
        });
        res.status(200)
        res.json(userProfile);
    } catch (error) {
        res.status(400).json(error)
    }
}

//export default user_cont;  //you can use as register route technique or can make an addition folder as controllers and write all the route part in controllers as defined