/**
 * @swagger
 * /api/user/create/user:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     description: Create a new user with the provided details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               phonenumber:
 *                 type: string
 *               profilepicture:
 *                 type: string
 *               Utype:
 *                 type: string
 *             required:
 *               - username
 *               - email
 *               - password
 *               - phonenumber
 *               - Utype
 *     responses:
 *       '200':
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Message indicating successful user creation
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 jwttoken:
 *                   type: string
 *                   description: JWT token for authentication
 *       '400':
 *         description: Bad request, user creation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the cause of failure
 */

const { countDocuments } = require("../Modals/User")

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the user
 *         username:
 *           type: string
 *           description: The username of the user
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user
 *         phonenumber:
 *           type: string
 *           description: The phone number of the user
 *         profilepicture:
 *           type: string
 *           description: URL of the user's profile picture
 *         type:
 *           type: string
 *           description: The type of user
 */

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login user
 *     tags: [User]
 *     description: Authenticate user with provided email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Message indicating successful login
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 jwttoken:
 *                   type: string
 *                   description: JWT token for authentication
 *       '400':
 *         description: Bad request, login failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the cause of failure
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the user
 *         username:
 *           type: string
 *           description: The username of the user
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user
 *         phonenumber:
 *           type: string
 *           description: The phone number of the user
 *         profilepicture:
 *           type: string
 *           description: URL of the user's profile picture
 *         type:
 *           type: string
 *           description: The type of user
 */

/**
 * @swagger
 * /follow/{id}:
 *   put:
 *     summary: Follow or unfollow a user
 *     tags: [User]
 *     description: Follow or unfollow a user by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to follow or unfollow
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *             required:
 *               - user
 *     responses:
 *       '200':
 *         description: Operation successful
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Success message indicating whether the user has been followed or unfollowed
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating the cause of failure
 */

/**
 * @swagger
 * /followingposts/{id}:
 *   get:
 *     summary: Get posts from followed users
 *     tags: [User]
 *     description: Retrieve posts from users followed by the specified user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve posts from followed users
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating the cause of failure
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the post
 *         user:
 *           type: string
 *           description: The ID of the user who created the post
 *         content:
 *           type: string
 *           description: The content of the post
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the post was created
 */

/**
 * @swagger
 * /update/{id}:
 *   put:
 *     summary: Update user information
 *     tags: [User]
 *     description: Update user information, including password
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: New password for the user
 *             required:
 *               - password
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Message indicating successful password update
 *                 updateuser:
 *                   $ref: '#/components/schemas/User'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating the cause of failure
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the user
 *         username:
 *           type: string
 *           description: The username of the user
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user
 *         phonenumber:
 *           type: string
 *           description: The phone number of the user
 *         profilepicture:
 *           type: string
 *           description: URL of the user's profile picture
 *         type:
 *           type: string
 *           description: The type of user
 */


/**
 * @swagger
 * /delete/{id}:
 *   delete:
 *     summary: Delete user account
 *     tags: [User]
 *     description: Delete user account by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user account to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Message indicating successful account deletion
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating the cause of failure
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the user
 *         username:
 *           type: string
 *           description: The username of the user
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user
 *         phonenumber:
 *           type: string
 *           description: The phone number of the user
 *         profilepicture:
 *           type: string
 *           description: URL of the user's profile picture
 *         type:
 *           type: string
 *           description: The type of user
 */

/**
 * @swagger
 * /post/user/details/{id}:
 *   get:
 *     summary: Get user details for a post
 *     tags: [User]
 *     description: Retrieve user details excluding sensitive information for a post by user ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve details for a post
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: User details excluding sensitive information
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating the cause of failure
 */

/**
 * @swagger
 * /user/details/{id}:
 *   get:
 *     summary: Get user details
 *     tags: [User]
 *     description: Retrieve user details excluding sensitive information by user ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve details
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDetails'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating the cause of failure
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserDetails:
 *       type: object
 *       properties:
 *         user:
 *           type: object
 *           description: User details excluding sensitive information
 *           properties:
 *             _id:
 *               type: string
 *               description: The auto-generated ID of the user
 *             username:
 *               type: string
 *               description: The username of the user
 *             profilepicture:
 *               type: string
 *               description: URL of the user's profile picture
 *             type:
 *               type: string
 *               description: The type of user
 */

/**
 * @swagger
 * /all/user/{id}:
 *   get:
 *     summary: Get suggested users for follow
 *     tags: [User]
 *     description: Retrieve a list of users suggested for follow based on the current user's following list
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the current user
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserSuggestion'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserSuggestion:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the user
 *         username:
 *           type: string
 *           description: The username of the user
 *         profilepicture:
 *           type: string
 *           description: URL of the user's profile picture
 *         type:
 *           type: string
 *           description: The type of user
 */

/**
 * @swagger
 * /get/followings/{id}:
 *   get:
 *     summary: Get user followings
 *     tags: [User]
 *     description: Retrieve the list of users followed by the specified user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve followings
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserFollowing'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating the cause of failure
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserFollowing:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the user
 *         username:
 *           type: string
 *           description: The username of the user
 *         profilepicture:
 *           type: string
 *           description: URL of the user's profile picture
 *         type:
 *           type: string
 *           description: The type of user
 */

/**
 * @swagger
 * /get/followers/{id}:
 *   get:
 *     summary: Get followers
 *     tags: [User]
 *     description: Retrieve the list of followers of a user by user ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to get followers
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserDetails'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating the cause of failure
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserDetails:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the user
 *         username:
 *           type: string
 *           description: The username of the user
 *         email:
 *           type: string
 *           description: The email address of the user
 *         phonenumber:
 *           type: string
 *           description: The phone number of the user
 *         profilepicture:
 *           type: string
 *           description: URL of the user's profile picture
 *         type:
 *           type: string
 *           description: The type of user
 */


/**
 * @swagger
 * /likedpost/{id}:
 *   put:
 *     summary: Like or unlike a post
 *     tags: [User]
 *     description: Like or unlike a post by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post to like or unlike
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: ID of the user who is liking or unliking the post
 *             required:
 *               - user
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Success message indicating the like or unlike operation was successful
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating that the user was not found
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating the cause of failure
 */

/**
 * @swagger
 * /get/followings_with_stories/{id}:
 *   get:
 *     summary: Get followings with stories
 *     tags: [User]
 *     description: Retrieve the list of users followed by the specified user who have stories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve followings with stories
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserWithStories'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating the cause of failure
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserWithStories:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the user
 *         username:
 *           type: string
 *           description: The username of the user
 *         profilepicture:
 *           type: string
 *           description: URL of the user's profile picture
 *         type:
 *           type: string
 *           description: The type of user
 *         Stories:
 *           type: array
 *           description: Array of user stories
 *           items:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the story
 *               content:
 *                 type: string
 *                 description: Content of the story
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *                 description: The timestamp when the story was created
 */

/**
 * @swagger
 * /add/story:
 *   post:
 *     summary: Add a story
 *     tags: [User]
 *     description: Add a story for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newstory:
 *                 type: object
 *                 description: New story object to be added
 *               description:
 *                 type: string
 *                 description: Description of the story
 *             required:
 *               - newstory
 *               - description
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Success message indicating the story was added successfully
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating the cause of failure
 */

/**
 * @swagger
 * /viewstory/{id}:
 *   get:
 *     summary: View user story
 *     tags: [User]
 *     description: View the story of a user by user ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to view the story
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Image:
 *                   type: string
 *                   description: URL of the user's story image
 *                 Description:
 *                   type: string
 *                   description: Description of the user's story
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating the cause of failure
 */

/**
 * @swagger
 * /get/allusers:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     description: Retrieve a list of all users
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 allUsersList:
 *                   type: array
 *                   description: Array of user objects
 *                   items:
 *                     $ref: '#/components/schemas/UserDetails'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating the cause of failure
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserDetails:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the user
 *         username:
 *           type: string
 *           description: The username of the user
 *         email:
 *           type: string
 *           description: The email address of the user
 *         phonenumber:
 *           type: string
 *           description: The phone number of the user
 *         profilepicture:
 *           type: string
 *           description: URL of the user's profile picture
 *         type:
 *           type: string
 *           description: The type of user
 */

/**
 * @swagger
 * /getstoryviewers:
 *   get:
 *     summary: Get story viewers
 *     tags: [User]
 *     description: Retrieve the list of viewers who have viewed the authenticated user's story
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserDetails'
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating that the user was not found
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating the cause of failure
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserDetails:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the user
 *         username:
 *           type: string
 *           description: The username of the user
 *         email:
 *           type: string
 *           description: The email address of the user
 *         phonenumber:
 *           type: string
 *           description: The phone number of the user
 *         profilepicture:
 *           type: string
 *           description: URL of the user's profile picture
 *         type:
 *           type: string
 *           description: The type of user
 */

/**
 * @swagger
 * /{id}/addviewer:
 *   put:
 *     summary: Add viewer to story
 *     tags: [User]
 *     description: Add the authenticated user as a viewer to the story of the specified user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user whose story viewer list is being updated
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Success message indicating that the viewer was added successfully or the user has already viewed the story
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating the cause of failure
 */

/**
 * @swagger
 * /upload/profilepic:
 *   post:
 *     summary: Upload profile picture
 *     tags: [User]
 *     description: Upload a profile picture for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profilepicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: URL of the uploaded profile picture
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating the cause of failure
 */




//Reels

/**
 * @swagger
 * /addnewreel:
 *   post:
 *     summary: Add new reel
 *     description: Add a new reel for the authenticated user
 *     tags: [Reels]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: Description of the reel
 *               video:
 *                 type: string
 *                 description: URL of the video for the reel
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 newReel:
 *                   $ref: '#/components/schemas/ReelDetails'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating the cause of failure
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ReelDetails:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the reel
 *         description:
 *           type: string
 *           description: Description of the reel
 *         video:
 *           type: string
 *           description: URL of the video for the reel
 *         user:
 *           type: string
 *           description: ID of the user who created the reel
 */

/**
 * @swagger
 * /getAllReels:
 *   get:
 *     summary: Get all reels
 *     description: Retrieve all reels from the database
 *     tags: [Reels]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ReelDetails'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating the cause of failure
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ReelDetails:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the reel
 *         description:
 *           type: string
 *           description: Description of the reel
 *         video:
 *           type: string
 *           description: URL of the video for the reel
 *         user:
 *           type: string
 *           description: ID of the user who created the reel
 */

/**
 * @swagger
 * /get/reels/{id}:
 *   get:
 *     summary: Get user's reels
 *     description: Retrieve all reels of a user by user ID
 *     tags: [Reels]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to get reels
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ReelDetails'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating the cause of failure
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ReelDetails:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the reel
 *         description:
 *           type: string
 *           description: Description of the reel
 *         video:
 *           type: string
 *           description: URL of the video for the reel
 *         user:
 *           type: string
 *           description: ID of the user who created the reel
 */

/**
 * @swagger
 * /{id}/react_5_reel:
 *   put:
 *     summary: React to reel with Reaction 5
 *     description: Add or remove Reaction 5 to a reel by reel ID
 *     tags: [Reels]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the reel to react to
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Message indicating success
 *                 status:
 *                   type: string
 *                   enum: [added, removed]
 *                   description: Status of the reaction (added or removed)
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating the cause of failure
 */

/**
 * @swagger
 * /{id}/commentreel:
 *   put:
 *     summary: Add comment to a reel
 *     description: Add a comment to a reel by reel ID
 *     tags: [Reels]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the reel to add a comment to
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               entered_comment:
 *                 type: string
 *                 description: The comment to be added to the reel
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Message indicating success
 *                 reel:
 *                   $ref: '#/components/schemas/Reel'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating the cause of failure
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ReelComment:
 *       type: object
 *       properties:
 *         comment_user_id:
 *           type: string
 *           description: ID of the user who commented on the reel
 *         username:
 *           type: string
 *           description: Username of the user who commented on the reel
 *         profilepic:
 *           type: string
 *           description: URL of the profile picture of the user who commented on the reel
 *         comment:
 *           type: string
 *           description: The comment content
 *         timestamp:
 *           type: string
 *           description: The timestamp when the comment was added
 */

/**
 * @swagger
 * /getreelcomments/{id}:
 *   get:
 *     summary: Get comments for a reel
 *     description: Retrieve comments for a reel by reel ID
 *     tags: [Reels]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the reel to retrieve comments for
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ReelComment'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating the cause of failure
 */



//Post Swagger 


/**
 * @swagger
 * /createpost:
 *   post:
 *     summary: Create a new post
 *     description: Create a new post with description, image, or video
 *     tags: [Post]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: The description of the post
 *               image:
 *                 type: string
 *                 description: URL of the image associated with the post (optional)
 *               video:
 *                 type: string
 *                 description: URL of the video associated with the post (optional)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 newPost:
 *                   $ref: '#/components/schemas/Post'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating the cause of failure
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the post
 *         description:
 *           type: string
 *           description: The description of the post
 *         image:
 *           type: string
 *           description: URL of the image associated with the post
 *         video:
 *           type: string
 *           description: URL of the video associated with the post
 *         user:
 *           type: string
 *           description: ID of the user who created the post
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the post was created
 *       required:
 *         - description
 *         - user
 */

/**
 * @swagger
 * /get/post:
 *   get:
 *     summary: Get user posts
 *     description: Retrieve posts created by the authenticated user
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 post:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Post'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating the cause of failure
 */

/**
 * @swagger
 * /get/postID/{id}:
 *   get:
 *     summary: Get post by ID
 *     description: Retrieve a post by its ID
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating the cause of failure
 */

/**
 * @swagger
 * /update/post/{id}:
 *   put:
 *     summary: Update a post by ID
 *     description: Update a post by its ID
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post to update
 *         schema:
 *           type: string
 *       - in: body
 *         name: body
 *         description: Updated post object
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/Post'
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating the cause of failure
 */

/**
 * @swagger
 * /get/allpost:
 *   get:
 *     summary: Get all data of a single post
 *     description: Retrieve all posts from the database
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 post:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Post'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating the cause of failure
 */

/**
 * @swagger
 * /get/allposts:
 *   get:
 *     summary: Get all posts
 *     description: Retrieve all posts from the database
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 post:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Post'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating the cause of failure
 */

/**
 * @swagger
 * /get/{key}:
 *   get:
 *     summary: Get posts by search key
 *     description: Retrieve posts from the database based on the search key
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *         description: The search key to filter posts
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 post:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Post'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating the cause of failure
 */

/**
 * @swagger
 * /get/post/{id}:
 *   get:
 *     summary: Get posts by user ID
 *     description: Retrieve posts created by a specific user based on their ID
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose posts are to be retrieved
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating the cause of failure
 */

/**
 * @swagger
 * /update/post/{id}:
 *   put:
 *     summary: Update a post by ID
 *     description: Update an existing post with the specified ID
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to be updated
 *       - in: body
 *         name: post
 *         required: true
 *         description: Updated post object
 *         schema:
 *           $ref: '#/components/schemas/Post'
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating the cause of failure
 */

/**
 * @swagger
 * /{id}/like:
 *   put:
 *     summary: Like or unlike a post
 *     description: Like or unlike a post by its ID
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to like or unlike
 *       - in: body
 *         name: user
 *         required: true
 *         description: ID of the user performing the action
 *         schema:
 *           type: object
 *           properties:
 *             user:
 *               type: string
 *               description: ID of the user
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Confirmation message
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating the cause of failure
 */

/**
 * @swagger
 * /{id}/dislike:
 *   put:
 *     summary: Dislike or remove dislike from a post
 *     description: Dislike or remove dislike from a post by its ID
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to dislike or remove dislike
 *       - in: body
 *         name: user
 *         required: true
 *         description: ID of the user performing the action
 *         schema:
 *           type: object
 *           properties:
 *             user:
 *               type: string
 *               description: ID of the user
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Confirmation message
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating the cause of failure
 */

/**
 * @swagger
 * /comment/post:
 *   put:
 *     summary: Add a comment to a post
 *     description: Add a comment to a post identified by its ID
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 description: The comment text
 *               postId:
 *                 type: string
 *                 description: The ID of the post to which the comment will be added
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Confirmation message
 *                 post:
 *                   type: object
 *                   description: Updated post object with the new comment
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating the cause of failure
 */

/**
 * @swagger
 * /delete/post/{id}:
 *   delete:
 *     summary: Delete a post
 *     description: Delete a post by its ID
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post to be deleted
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Confirmation message
 *                 deletedPost:
 *                   type: object
 *                   description: Deleted post object
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating the cause of failure
 */

/**
 * @swagger
 * /msg:
 *   post:
 *     summary: Create a new message
 *     description: Create a new message between two users
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               from:
 *                 type: string
 *                 description: ID of the sender
 *               to:
 *                 type: string
 *                 description: ID of the recipient
 *               message:
 *                 type: string
 *                 description: Message content
 *             required:
 *               - from
 *               - to
 *               - message
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The message content
 *                 Chatusers:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Array containing the IDs of the users involved in the chat
 *                 Sender:
 *                   type: string
 *                   description: The ID of the message sender
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating the cause of failure
 */

/**
 * @swagger
 * /get/chat/msg/{user1Id}/{user2Id}:
 *   get:
 *     summary: Get chat messages between two users
 *     description: Retrieve chat messages between two specified users
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: user1Id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the first user
 *       - in: path
 *         name: user2Id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the second user
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   myself:
 *                     type: boolean
 *                     description: Indicates if the message is sent by the authenticated user
 *                   message:
 *                     type: string
 *                     description: The message content
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating the cause of failure
 */

/**
 * @swagger
 * /get_all_liked_posts:
 *   get:
 *     summary: Get all liked posts by the authenticated user
 *     description: Retrieves all posts that the authenticated user has liked
 *     tags: [Post]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       '400':
 *         description: Error response
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating the cause of failure
 */


//Organization Swagger code



/**
 * @swagger
 * /create/user:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user account.
 *     tags: [Organization]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phonenumber:
 *                 type: string
 *               profilepicture:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Message indicating success
 *                 user:
 *                   $ref: '#/components/schemas/Organization'
 *                 jwttoken:
 *                   type: string
 *                   description: JWT token for the newly created user
 *       '400':
 *         description: Error response
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating the cause of failure
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login user
 *     description: Logs in a user with email and password.
 *     tags: [Organization]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Message indicating success
 *                 user:
 *                   $ref: '#/components/schemas/Organization'
 *                 jwttoken:
 *                   type: string
 *                   description: JWT token for the logged-in user
 *       '400':
 *         description: Error response
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating the cause of failure
 */

/**
 * @swagger
 * /follow/{id}:
 *   put:
 *     summary: Follow or Unfollow a user
 *     description: Allows a user to follow or unfollow another user.
 *     tags: [Organization]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to follow or unfollow
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: The ID of the user performing the action
 *     responses:
 *       '200':
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Success message indicating the action taken
 *       '400':
 *         description: Error response
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating the cause of failure
 */

/**
 * @swagger
 * /followingposts/{id}:
 *   get:
 *     summary: Get posts from users that the specified user is following
 *     description: Retrieves posts from users that the specified user is following, including their own posts.
 *     tags: [Organization]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose following posts to retrieve
 *     responses:
 *       '200':
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       '400':
 *         description: Error response
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating the cause of failure
 */

/**
 * @swagger
 * /update/{id}:
 *   put:
 *     summary: Update user profile
 *     description: Update user profile details, such as password
 *     tags: [Organization]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to update
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Bearer token to authenticate the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: New password for the user
 *     responses:
 *       '200':
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Success message
 *                 updateuser:
 *                   $ref: '#/components/schemas/Organization'
 *       '400':
 *         description: Error response
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating the cause of failure
 */

/**
 * @swagger
 * /delete/{id}:
 *   delete:
 *     summary: Delete user account
 *     description: Delete user account based on the provided user ID
 *     tags: [Organization]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to delete
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Bearer token to authenticate the user
 *     responses:
 *       '200':
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Success message
 *                 user:
 *                   $ref: '#/components/schemas/Organization'
 *       '400':
 *         description: Error response
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating the cause of failure
 */

/**
 * @swagger
 * /post/user/details/{id}:
 *   get:
 *     summary: Get user details for a post
 *     description: Retrieve user details for a specific post based on the provided user ID
 *     tags: [Organization]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user associated with the post
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Bearer token to authenticate the user
 *     responses:
 *       '200':
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   description: The username of the user associated with the post
 *                 profilepicture:
 *                   type: string
 *                   format: uri
 *                   description: The URL of the profile picture of the user associated with the post
 *       '400':
 *         description: Error response
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating the cause of failure
 */

/**
 * @swagger
 * /user/details/{id}:
 *   get:
 *     summary: Get user details by ID
 *     description: Retrieve user details based on the provided user ID
 *     tags: [Organization]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Bearer token to authenticate the user
 *     responses:
 *       '200':
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 User:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                       description: The username of the user
 *                     profilepicture:
 *                       type: string
 *                       format: uri
 *                       description: The URL of the profile picture of the user
 *       '400':
 *         description: Error response
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating the cause of failure
 */

/**
 * @swagger
 * /all/user/{id}:
 *   get:
 *     summary: Get suggested users for the current user
 *     description: Retrieve a list of users that are not followed by the current user, excluding the current user itself.
 *     tags: [Organization]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the current user
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Bearer token to authenticate the user
 *     responses:
 *       '200':
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   username:
 *                     type: string
 *                     description: The username of the suggested user
 *                   profilepicture:
 *                     type: string
 *                     format: uri
 *                     description: The URL of the profile picture of the suggested user
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating the cause of failure
 */

/**
 * @swagger
 * /get/followings/{id}:
 *   get:
 *     summary: Get the list of users followed by a specific user
 *     description: Retrieve the list of users followed by a specific user identified by their ID.
 *     tags: [Organization]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose followings are to be retrieved
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Bearer token to authenticate the user
 *     responses:
 *       '200':
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   username:
 *                     type: string
 *                     description: The username of the user being followed
 *                   profilepicture:
 *                     type: string
 *                     format: uri
 *                     description: The URL of the profile picture of the user being followed
 *       '400':
 *         description: Error response
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating the cause of failure
 */

/**
 * @swagger
 * /get/followers/{id}:
 *   get:
 *     summary: Get the list of followers for a user
 *     description: Retrieve the list of followers for a user identified by their ID.
 *     tags: [Organization]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose followers are to be retrieved
 *     responses:
 *       '200':
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   username:
 *                     type: string
 *                     description: The username of the follower
 *                   profilepicture:
 *                     type: string
 *                     format: uri
 *                     description: The URL of the profile picture of the follower
 *       '400':
 *         description: Error response
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating the cause of failure
 */

/**
 * @swagger
 * /likedpost/{id}:
 *   put:
 *     summary: Like or unlike a post
 *     description: Like or unlike a post identified by its ID.
 *     tags: [Organization]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to like or unlike
 *       - in: body
 *         name: user
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             user:
 *               type: string
 *         description: The ID of the user performing the action
 *     responses:
 *       '200':
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Confirmation message indicating the update was successful
 *       '400':
 *         description: Error response
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating the cause of failure
 */

/**
 * @swagger
 * /get/followings_with_stories/{id}:
 *   get:
 *     summary: Get followings with stories
 *     description: Retrieve a list of users that the specified user is following, along with their stories.
 *     tags: [Organization]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose followings with stories are to be retrieved
 *     responses:
 *       '200':
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   User:
 *                     type: object
 *                     properties:
 *                       username:
 *                         type: string
 *                         description: The username of the user
 *                       email:
 *                         type: string
 *                         description: The email of the user
 *                       phonenumber:
 *                         type: string
 *                         description: The phone number of the user
 *                       profilepicture:
 *                         type: string
 *                         description: The URL of the user's profile picture
 *                       Stories:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             story:
 *                               type: string
 *                               description: The story content
 *                             timestamp:
 *                               type: string
 *                               description: The timestamp when the story was posted
 *       '400':
 *         description: Error response
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating the cause of failure
 */

/**
 * @swagger
 * /add/story:
 *   post:
 *     summary: Add story
 *     description: Add a new story for the authenticated user.
 *     tags: [Organization]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newstory:
 *                 type: string
 *                 description: The content of the new story.
 *               description:
 *                 type: string
 *                 description: Description of the story.
 *     responses:
 *       '200':
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Message indicating the success of the operation.
 *       '400':
 *         description: Error response
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating the cause of failure.
 */

/**
 * @swagger
 * /viewstory/{id}:
 *   get:
 *     summary: View story
 *     description: View the story of a user by their ID.
 *     tags: [Organization]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: ObjectId
 *         description: The ID of the user whose story is to be viewed.
 *     responses:
 *       '200':
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Image:
 *                   type: string
 *                   description: The image of the user's story.
 *                 Description:
 *                   type: string
 *                   description: Description of the user's story.
 *       '400':
 *         description: Error response
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating the cause of failure.
 */

/**
 * @swagger
 * /get/allusers:
 *   get:
 *     summary: Get all users
 *     description: Retrieve details of all users.
 *     tags: [Organization]
 *     responses:
 *       '200':
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 allUsersList:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The unique identifier of the user.
 *                       username:
 *                         type: string
 *                         description: The username of the user.
 *                       email:
 *                         type: string
 *                         description: The email address of the user.
 *                       phonenumber:
 *                         type: string
 *                         description: The phone number of the user.
 *                       followers:
 *                         type: array
 *                         items:
 *                           type: string
 *                           description: The IDs of users who follow this user.
 *                       following:
 *                         type: array
 *                         items:
 *                           type: string
 *                           description: The IDs of users whom this user follows.
 *                       profilepicture:
 *                         type: string
 *                         description: The profile picture URL of the user.
 *       '400':
 *         description: Error response
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating the cause of failure.
 */




//Admin Swagger countDocuments


/**
 * @swagger
 * /Allusers:
 *   get:
 *     summary: Get all users
 *     description: Retrieve details of all users.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the cause of failure.
 */

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve details of a user by their ID.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the cause of failure.
 */

/**
 * @swagger
 * /post/{id}:
 *   get:
 *     summary: Get post by ID
 *     description: Retrieve details of a post by its ID.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the post to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Post not found
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the cause of failure.
 */

/**
 * @swagger
 * /log:
 *   get:
 *     summary: Get recent request logs
 *     description: Retrieve logs of recent requests, limited to the 200 most recent entries.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 numberOfRequests:
 *                   type: integer
 *                   description: Number of requests in the log.
 *                 logData:
 *                   type: array
 *                   description: Array of log entries.
 *                   items:
 *                     $ref: '#/components/schemas/LogEntry'
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating the cause of failure.
 */
