const express = require('express');
const router = new express.Router();
const { getUserById, getUserByEmail, createUser, updateUser, deleteUser } = require('./user.services');
const {serializedUsers, serializedUser} = require('../../utils/userUtil');
const {isAuthenticated} = require('../../middleware');

router.get('/profile', isAuthenticated, async (req, res) => {
    try {
        const { userId } = req.payload;
        const user = await getUserById(userId);
        delete user.password;
        res.status(200).send(serializedUser(user));
    } catch (err) {
        res.status(400).send(err);
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
        const user = await getUserByEmail(email);
        
        if (!user) {
            return res.status(404).send();
        }

        res.send(serializedUser(user));
    } catch(err) {        
        res.status(500).send();
    }
});

router.post('/create', async (req, res) => {
    try {
        const user = await createUser(req.body);

        res.status(201).send(serializedUser(user))
    } catch (err) {
        res.status(400).send(err)
    }
});

router.put('/update/:id', isAuthenticated, async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await updateUser(req.body);
                
        if (!user) {
            res.status(404).send();
        }

        res.send(serializedUser(user));
    } catch (err) {
        res.status(400).send(err);
    }
});

router.delete('/:id', isAuthenticated, async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await deleteUser(userId);

        res.status(200).send(serializedUser(user));
    } catch (err) {
        console.log(err)
        res.status(400).send(err);
    }
});

module.exports = router;