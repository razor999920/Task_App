const express = require('express');
const router = new express.Router();
const { getUserByEmail } = require('./user.services');

router.get('/users', async (req, res) => {
    try {
        const users = await db.user.findMany({});
        res.status(200).send(users);
    } catch(err) {
        res.status(500).send();
    }
});

router.get('/user/:id', async (req, res) => {
    const email = req.params.email;

    try {
        const user = await getUserByEmail(email);
        
        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    } catch(err) {        
        res.status(500).send();
    }
});

router.get('/user/:email', async (req, res) => {
    const enail = req.params.enail;

    try {
        const user = await db.user.findUnique({
            where: 
                email
        });
        
        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    } catch(err) {        
        res.status(500).send();
    }
});

router.post('/users', async (req, res) => {
    try {
        const user = await db.user.create({
            data: {
                email: req.body.email,
                password: await bcrypt.hash(req.body.password, 8),
                name: req.body.name,
                age: req.body.age,
                createDate: req.body.createDate
            }
        });

        res.status(201).send(user)
    } catch (err) {
        res.status(400).send(err)
    }
});

router.post('/users/login', async (req, res) => {
    try {
        const user = await db.user.findUnique({
            where: {
                email: req.body.email,
            }
        });
        
        if (!user) {
            return res.status(404).send("Unable to login");
        }

        // Verify if the the password matches
        const correctPassword = await bcrypt.compare(req.body.password, user.password);

        if (!correctPassword) {
            return res.status(404).send("Invalid email/password incorrect");
        }
        
        // If it is a user then create a token'
        const token = jwt.sign({ id: user.id }, process.env.JWT_TOKEN_SECRET);

        res.send({user, token});
    } catch (e) {
        console.log(e)
        res.status(400).send()
    }
});

router.put('/users/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const {email, name, age} = req.body;

        const user = await db.user.update({
            where: {
                userId: parseInt(userId)
            }, data: {
                email,
                name,
                age,
                password: await bcrypt.hash(req.body.password, 8)
            }
        });
                
        if (!user) {
            res.status(404).send();
        }

        res.send(user);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.delete('/users/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await db.user.delete ({
            where: {
                userId: parseInt(userId)
            },
        });

        res.status(200).send(user);
    } catch (err) {
        console.log(err)
        res.status(400).send(err);
    }
});

module.exports = router;