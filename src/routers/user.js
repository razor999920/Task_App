const express = require('express')
const {PrismaClient, Prisma} = require('@prisma/client')
const prisma = new PrismaClient();
const router = new express.Router()

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
        const user = await prisma.user.create({data: req.body})
        res.status(201).send(user)
    } catch (err) {
        res.status(400).send(err)
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
                age
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