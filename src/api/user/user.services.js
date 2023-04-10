const {db} = require('../../utils/db');
const bcrypt = require('bcryptjs');

function getAllUsers() {
    return db.user.findMany({});
}

function getUserById(userId) {
    return db.user.findUnique({
        where: {
            userId: parseInt(userId)
        }
    });
}

function getUserByEmail(email) {
    return db.user.findUnique({
        where: {
            email
        }
    });
}

function createUser(user) {
    // Hash password
    user.password = bcrypt.hashSync(user.password, 12);

    return db.user.create({
        data: user
    });
}

function updateUser(user) {
    const {email, name, age} = user;

    return db.user.update({
        where: {
            userId: parseInt(user.userId)
        }, data: {
            email,
            name,
            age
        }
    });
}

function deleteUser(userId) {
    return db.user.delete ({
        where: {
            userId: parseInt(userId)
        },
    });
}

// router.post('/users/login', async (req, res) => {
//     try {
//         const user = await db.user.findUnique({
//             where: {
//                 email: user.email,
//             }
//         });
        
//         if (!user) {
//             return res.status(404).send("Unable to login");
//         }

//         // Verify if the the password matches
//         const correctPassword = await bcrypt.compare(user.password, user.password);

//         if (!correctPassword) {
//             return res.status(404).send("Invalid email/password incorrect");
//         }
        
//         // If it is a user then create a token'
//         const token = jwt.sign({ id: user.id }, process.env.JWT_TOKEN_SECRET);

//         res.send({user, token});
//     } catch (e) {
//         console.log(e)
//         res.status(400).send()
//     }
// });


module.exports = {
    getAllUsers,
    getUserById,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser
}