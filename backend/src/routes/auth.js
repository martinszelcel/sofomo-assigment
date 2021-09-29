const express = require('express');
const RefreshToken = require('../models/RefreshTokenModel');
const User = require('../models/UserModel');
const { createAccessAndRefreshToken, verifyRefreshToken} = require('../services/jsonWebTokenService');
const logger = require('../utils/logger');

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Validate data send by client
    if (!email) {
        res.status(422).json({
            type: "error",
            message: "Email is required"
        });
    }

    if (!password) {
        res.status(422).json({
            type: "error",
            message: "Password is required"
        });
    }

    // Find user and validate password
    const user = await User.findOne({email});

    if (user && await user.validatePassword(password)) {
        // Generate tokens
        const { accessToken, refreshToken } = await createAccessAndRefreshToken(user.id, user.email);

        // Create and save refresh token model
        await new RefreshToken({
            user: user,
            refreshToken: refreshToken
        }).save();

        // Send tokens to client
        res.json({
            accessToken,
            refreshToken
        })

    } else {
        return res.status(401).json({
            type: "error",
            message: "Wrong email or password"
        });
    }
});

router.post('/register', async (req, res) => {
    const { email, password} = req.body;

    // Validate data send by client
    if (!email) {
        res.status(422).json({
            type: "error",
            message: "Email is required"
        });
    }

    if (!password) {
        res.status(422).json({
            type: "error",
            message: "Password is required"
        });
    }

    // Check if email is not taken
    if (await User.findOne({email})) {
        return res.status(422).json({
            type: "error",
            message: "Account with this email adress already exists"
        });
    }

    // Create and save new user
    const user = new User({
        email
    });
    await user.setPassword(password);
    await user.save();

    // Generate tokens
    const { accessToken, refreshToken } = await createAccessAndRefreshToken(user.id, user.email);

    // Create and save refresh token model
    await new RefreshToken({
        user: user,
        refreshToken: refreshToken
    }).save();

    // Send tokens to client
    res.json({
        accessToken,
        refreshToken
    })
});

router.post('/refreshToken', async (req, res) => {
    const { refreshToken } = req.body;

    // Verify refresh token
    let tokenData = null;
    try {
        tokenData = await verifyRefreshToken(refreshToken)
    } catch (error) {
        logger.error(error.stack);
        res.status(422).json({
            type: "error",
            message: "Please provide vaild refresh token"
        });
        return;
    }

    // Find refresh token object
    const refreshTokenObject = await RefreshToken.findOne({user: tokenData.userId, refreshToken});
    
    if (!refreshTokenObject) {
        res.status(422).json({
            type: "error",
            message: "Refresh token doesn't exist in database. Please login again"
        });
        return;
    }

    // Create new tokens
    const newTokens = await createAccessAndRefreshToken(tokenData.userId, tokenData.email);

    // Update refresh token object
    refreshTokenObject.refreshToken = newTokens.refreshToken;
    await refreshTokenObject.save();

    // Send new tokens to client
    res.json(newTokens);
});

module.exports = router;