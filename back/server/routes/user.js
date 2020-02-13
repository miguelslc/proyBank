const express = require('express')
const User = require('../model/User')
const auth = require('../controller/auth')
const OpenWeatherMap = require('../weather/weather')
const router = express.Router()

var cfg = {
    APPID: process.env.APPID || 'YOUR_APPID',
    units: "metric"
};


router.post('/users', async(req, res) => {
    // Create a new user
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/users/login', async(req, res) => {
    //Login a registered user
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
        }
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/users/me', auth, async(req, res) => {
    // View logged in user profile
    ///
    /// Current weather by city name (Banska Bystrica)
    ///

    let api = new OpenWeatherMap(cfg);

    ///
    /// Current weather by city ID (Banska Bystrica)
    ///
    /*api.getCurrentWeatherByCityID('3061186', (err, currentWeather) => {
    	if(err) {
    		console.log(err.message);
    	}
    	else {
    		console.log(currentWeather);
    	}
    });*/
    api.getCurrentWeatherByCityName('Buenos Aires', (err, currentWeather) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log(currentWeather);
        }
    });
    res.send(req.user)
})

router.post('/users/me/logout', auth, async(req, res) => {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router