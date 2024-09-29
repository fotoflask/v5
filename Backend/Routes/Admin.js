// const fs = require('fs');
// const express = require('express');
// const router = express.Router();
// require('dotenv').config();
// const cookieParser = require('cookie-parser');
// const csrf = require('csurf');
// const User = require('../Modals/User');
// const { verifytoken } = require('../middleware/verifytoken');
// const Post = require('../Modals/Post');

// const csrfProtection = csrf({ cookie: true });
// router.use(cookieParser());
// router.use(csrfProtection);


// router.get('/Allusers', verifytoken, async (req, res) => {
//     try {
//         const users = await User.find();
//         res.json(users);
//     }
//     catch (err) { 
//         res.json({ message: err });
//     }
// }
// );

// router.get('/Allposts',verifytoken, async (req, res) => {
//     try {
//         const posts = await Post.find();
//         res.json(posts);
//     }
//     catch (err) {
//         res.json({ message: err });
//     }
// }
// );

// router.get('/user/:id', verifytoken,async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id);
//         res.json(user);
//     }
//     catch (err) {
//         res.json({ message: err });
//     }
// }
// );

// router.get('/post/:id', verifytoken,async (req, res) => {
//     try {
//         const post = await Post.findById(req.params.id);
//         res.json(post);
//     }
//     catch (err) {
//         res.json({ message: err });
//     }
// }
// );

// router.get('/log',verifytoken, async (req, res) => {
    
//     const logFilePath = 'traffic.json';  // Assuming you changed the file format to JSON

//     try {
//         const logData = fs.readFileSync(logFilePath, 'utf8');
//         const logLines = logData.split('\n').filter(line => line.trim() !== '');

//         // Parse each line of JSON and create an array of objects
//         const parsedLog = logLines.map(line => JSON.parse(line));

//         // send only 200 most recent requests
        
        
//         const numberOfRequests = parsedLog.length;
//         parsedLog.splice(200);

//         res.json({ numberOfRequests, logData: parsedLog });
//     } catch (err) {
//         console.error('Error reading log file:', err);
//         res.status(500).json({ error: 'Error reading log file' });
//     }
// });


// module.exports = router;


const fs = require('fs');
const express = require('express');
const router = express.Router();
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
const SECRETKEY = process.env.SECRET_KEY;
const csrf = require('csurf');

const { body, validationResult } = require('express-validator');
const User = require('../Modals/User');
const { verifytoken } = require('../middleware/verifytoken');
const Post = require('../Modals/Post');

const redis = require("redis");

// Create a Redis client
const redisClient = redis.createClient({
    host: '127.0.0.1',
    port: 6379,
});

redisClient.on("error", function(error) {
    console.error("Error connecting to Redis:", error);
});


redisClient.on("connect", function() {
    console.log("Connected to Redis server");
});



const csrfProtection = csrf({ cookie: true });
router.use(cookieParser());
router.use(csrfProtection);


// Middleware to handle caching logic
const cacheMiddleware = (req, res, next) => {
    const cacheKey = 'allUsers';

    // Check if data exists in cache
    redisClient.get(cacheKey, (err, data) => {
        if (err) throw err;

        if (data !== null) {
            console.log('Data retrieved from cache');
            res.json(JSON.parse(data));
        } else {
            next();
        }
    });
};

//ROUTE -1 :- GET ALL USERS

router.get('/Allusers', verifytoken, async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    }
    catch (err) { 
        res.json({ message: err });
    }
}
);


router.get('/Redis/Allusers', verifytoken, cacheMiddleware, async (req, res) => {
    try {
        // Fetch data from your database
        const users = await User.find();

        // Cache data using Redis
        redisClient.setex('allUsers', 3600, JSON.stringify(users)); // Cache for 1 hour

        // Return the data as a response
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ROUTE - 2 :- GET ALL Users

router.get('/user/:id', verifytoken,async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    }
    catch (err) {
        res.json({ message: err });
    }
}
);

// ROUTE -3 :- GET ALL POSTS

router.get('/post/:id', verifytoken,async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.json(post);
    }
    catch (err) {
        res.json({ message: err });
    }
}
);

// ROUTE - 4 :- GET Logs

router.get('/log',verifytoken, async (req, res) => {
    
    const logFilePath = 'traffic.json';  // Assuming you changed the file format to JSON

    try {
        const logData = fs.readFileSync(logFilePath, 'utf8');
        const logLines = logData.split('\n').filter(line => line.trim() !== '');

        // Parse each line of JSON and create an array of objects
        const parsedLog = logLines.map(line => JSON.parse(line));

        // send only 200 most recent requests
        
        
        const numberOfRequests = parsedLog.length;
        parsedLog.splice(200);

        res.json({ numberOfRequests, logData: parsedLog });
    } catch (err) {
        console.error('Error reading log file:', err);
        res.status(500).json({ error: 'Error reading log file' });
    }
});

router.get('/delete/user/:id', verifytoken, async (req, res) => {
    console.log("delete user route hit " , req.params.id)
    try {
        const posts = await Post.find({ user: req.params.id });
        posts.forEach(async post => {
            await Post.findByIdAndDelete(post._id);
        });
        const user = await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err });
    }
}
);



module.exports = router;