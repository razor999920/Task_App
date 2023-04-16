const express = require('express');
const router = new express.Router();
const {db} = require('../../utils/db');
const { getAllUsers, getUserById, getUserByEmail } = require('./user.services');
const {serializedUsers, serializedUser} = require('../../utils/ userUtil');

router.get('/all', async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).send(serializedUsers(users));
    } catch(err) {
        console.log(err)
        res.status(500).send(err);
    }
});

router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await getUserById(userId);
        
        if (!user) {
            return res.status(404).send();
        }

        res.send(serializedUser(user));
    } catch(err) {        
        res.status(500).send();
    }
});

router.get('/:email', async (req, res) => {
    const email = req.params.email;

    try {
        const user = await db.user.findUnique({
            where: 
                email
        });
        
        if (!user) {
            return res.status(404).send();
        }

        res.send(serializedUser(user));
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

        res.status(201).send(serializedUser(user))
    } catch (err) {
        res.status(400).send(err)
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

        res.send(serializedUser(user));
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

        res.status(200).send(serializedUser(user));
    } catch (err) {
        console.log(err)
        res.status(400).send(err);
    }
});

module.exports = router;