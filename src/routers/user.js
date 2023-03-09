const express = require('express')
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const router = new express.Router();

router.get('/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany({});
        res.status(200).send(users);
    } catch(err) {
        res.status(500).send();
    }
});

router.get('/user/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await prisma.user.findUnique({
            where: {
                userId: parseInt(userId)
            }
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
        const user = await prisma.user.create({
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
        const user = await prisma.user.findUnique({
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

        res.send(user);
    } catch (e) {
        res.status(400).send()
    }
});

router.put('/users/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const {email, name, age} = req.body;

        const user = await prisma.user.update({
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
        const user = await prisma.user.delete ({
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