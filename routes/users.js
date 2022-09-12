const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

//Update user
router.put('/:id', async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (error) {
                return res.status(500).json(error);
            }
        }
        try {
            await User.findByIdAndUpdate(req.params.id, { $set: req.body });
            res.status(200).json('Update finish');
        } catch (error) {
            return res.status(500).json(error);
        }
    } else {
        return res.status(403).json("Can't update");
    }
});

//Delete user
router.delete('/:id', async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json('Delete finish');
        } catch (error) {
            return res.status(500).json(error);
        }
    } else {
        console.log(typeof req.params.id);
        console.log(typeof req.body.userId);
        console.log(req.body.userId === req.params.id);
        return res.status(403).json("Can't delete");
    }
});

//Get user
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, updatedAt, ...orther } = user._doc;
        res.status(200).json(orther);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/', (req, res) => {
    res.send('user Router');
});

module.exports = router;
