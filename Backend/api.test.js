const request = require('supertest');
const app = require('./index'); // Assuming your Express app is in app.js
const User = require('./Modals/User');
const Post = require('./Modals/Post'); // Import your User model or relevant setup

describe('GET /api/admin/Allusers', () => {
    it('responds with JSON containing users', async () => {
      // Move the declaration of jwttoken inside the test
      const jwttoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MzMxNmU4MDhiZjA1NjlhMzYxMjAxYSIsInVzZXJuYW1lIjoiQWRtaW4iLCJpYXQiOjE3MTQ2MzYxODF9.dQmeHzObq-YDvfTwUrdfT5x3Iie5VHDoFD4FNedoRpc";
  
      const response = await request(app)
        .get('/api/admin/Allusers')
        .set('jwttoken', `${jwttoken}`);
  

       // console.log(response);
      expect(response.status).toBe(200);
      expect(response.type).toBe('application/json');
      // Add more assertions as needed
  
      // For example, you can test if the response body contains an array of users
      expect(Array.isArray(response.body)).toBe(true);
    },10000);
  
    // Add more test cases for error handling, authentication, etc.
  });
  


  describe('GET /api/admin/user/:id', () => {
    it('responds with JSON containing user data for a valid id', async () => {
        // Move the declaration of jwttoken inside the test
        const jwttoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTEwNTYxYjBiNDcyNDZmNzQ2OWE2YyIsInVzZXJuYW1lIjoiQWRtaW4iLCJpYXQiOjE3MTQ0NTgxNzB9.ZaTf2ld8vNsNoetwUKdE94iznV99V92IXvCCtf0Ccgo";

        // Assuming you have a valid user id for testing
        const userId = '66335bf22c0dd6d5575a1131';

        const response = await request(app)
            .get(`/api/admin/user/${userId}`)
            .set('jwttoken', `${jwttoken}`);

        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        // Add more assertions as needed

        // For example, you can test if the response body contains the expected user data
        expect(response.body).toHaveProperty('_id', userId);
    });

});



describe('GET /api/admin/post/:id', () => {
    it('responds with JSON containing post data for a valid id', async () => {
        // Move the declaration of jwttoken inside the test
        const jwttoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTEwNTYxYjBiNDcyNDZmNzQ2OWE2YyIsInVzZXJuYW1lIjoiQWRtaW4iLCJpYXQiOjE3MTQ0NTgxNzB9.ZaTf2ld8vNsNoetwUKdE94iznV99V92IXvCCtf0Ccgo";

        // Assuming you have a valid post id for testing
        const postId = '66335c632c0dd6d5575a1186';

        const response = await request(app)
            .get(`/api/admin/post/${postId}`)
            .set('jwttoken', `${jwttoken}`);

        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        // Add more assertions as needed

        // For example, you can test if the response body contains the expected post data
        expect(response.body).toHaveProperty('_id', postId);
    });
});



// describe('DELETE /api/user/delete/:id', () => {
//     it('responds with success message and deleted user data for a valid id and matching user', async () => {
//         // Move the declaration of jwttoken inside the test
//         const jwttoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTEwNTYxYjBiNDcyNDZmNzQ2OWE2YyIsInVzZXJuYW1lIjoiQWRtaW4iLCJpYXQiOjE3MTQ0NTgxNzB9.ZaTf2ld8vNsNoetwUKdE94iznV99V92IXvCCtf0Ccgo";

//         // Assuming you have a valid user id for testing
//         const userId = '65a10561b0b47246f7469a6c';

//         const response = await request(app)
//             .delete(`/api/user/delete/${userId}`)
//             .set('jwttoken', `${jwttoken}`);

//         expect(response.status).toBe(200);
//         expect(response.type).toBe('application/json');
//         // Add more assertions as needed

//         // For example, you can test if the response body contains the expected success message and deleted user data
//         expect(response.body).toHaveProperty('msg', 'ACCOUNT DELETED SUCCESSFULLY');
//         expect(response.body).toHaveProperty('user');
//     });
// });

describe('PUT /api/user/:id/addviewer', () => {
    it('adds viewer to story and responds with success message', async () => {
        // Move the declaration of jwttoken inside the test
        const jwttoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTEwNTYxYjBiNDcyNDZmNzQ2OWE2YyIsInVzZXJuYW1lIjoiQWRtaW4iLCJpYXQiOjE3MTQ0NTgxNzB9.ZaTf2ld8vNsNoetwUKdE94iznV99V92IXvCCtf0Ccgo";
        
        // Assuming you have a valid user id for testing
        const userId = '663316e808bf0569a361201a';
        
        const response = await request(app)
            .put(`/api/user/${userId}/addviewer`)
            .set('jwttoken', `${jwttoken}`);
        
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        
    });
});


// describe('POST /api/user/add/story', () => {
//     it('adds a story and responds with success message', async () => {
//         // Move the declaration of jwttoken inside the test
//         const jwttoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MzBjYzVlYWM5N2I0ZmNkNjU4Njk3NyIsInVzZXJuYW1lIjoiQWRtaW4yIiwiaWF0IjoxNzE0NDc0MDc4fQ.1_uFNZI_UbeGdPiLxAXzIprQ4nZKjSslFxgwhq3sF-k";
        
//         // Assuming you have a valid user id for testing
//         const userId = '65a1222f792a084dbe5eb4fb';
        
//         // Assuming you have valid request body data for testing
//         const requestBody = {
//             newstory: 'New Story Content',
//             description: 'Story Description'
//         };
        
//         const response = await request(app)
//             .post('/api/user/add/story')
//             .set('jwttoken', `${jwttoken}`)
//             .send(requestBody);
            
//             console.log(response); 
//         expect(response.status).toBe(200);
        
//     });
// });


describe('POST /api/post/msg', () => {
    it('creates a new message and responds with the created message', async () => {
        // Move the declaration of jwttoken inside the test
        const jwttoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MzA4MmJiNmEyZDY0ZGQ5ZTE5YTEyNyIsInVzZXJuYW1lIjoibmV3c2FpcGF2YW4iLCJpYXQiOjE3MTQ0NzQ4MzB9.WufKp8_77dj6n3aFJf7cEMSrNHhnh65Y2ZJsaKj4dUI";
        
        // Assuming you have valid request body data for testing
        const requestBody = {
            from: '663316e808bf0569a361201a', // Replace with valid user id
            to: '66335bf22c0dd6d5575a1131', // Replace with valid user id
            message: 'Test message'
        };
    
        const response = await request(app)
            .post('/api/post/msg')
            .set('jwttoken', `${jwttoken}`)
            .send(requestBody);
        
        expect(response.status).toBe(200);
      
    });
});


describe('PUT /api/reels/:id/react_5_reel', () => {
    it('adds reaction 5 for the reel if not already present', async () => {
      
      const jwttoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MzA4MmJiNmEyZDY0ZGQ5ZTE5YTEyNyIsInVzZXJuYW1lIjoibmV3c2FpcGF2YW4iLCJpYXQiOjE3MTQ0NzY4MzN9.N4skUGUQ3Qg3Gf5RuN_Ng2XqGICW-JPyxsVh1xWufe0";
      const reelId = '66335e7eedd5947583996b07'; 
  
      const response = await request(app)
        .put(`/api/reels/${reelId}/react_5_reel`)
        .set('jwttoken', `${jwttoken}`);
  
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ msg: 'Reacttion5 added successfully', status: 'added' });
    });
  
  });


describe('PUT /api/post/comment/post', () => {
    it('adds a new comment to the post', async () => {
      // Move the declaration of jwttoken inside the test
      const jwttoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MzA4MmJiNmEyZDY0ZGQ5ZTE5YTEyNyIsInVzZXJuYW1lIjoibmV3c2FpcGF2YW4iLCJpYXQiOjE3MTQ0NzY4MzN9.N4skUGUQ3Qg3Gf5RuN_Ng2XqGICW-JPyxsVh1xWufe0";
  
      // Assuming you have a valid post id for testing
      const postId = '66335c632c0dd6d5575a1186';
  
      const newComment = {
        comment: 'This is a new comment.',
        postId: postId,
      };
  
      const response = await request(app)
        .put('/api/post/comment/post')
        .set('jwttoken', `${jwttoken}`)
        .send(newComment);
  
      expect(response.status).toBe(200);
      expect(response.body.msg).toBe('NEW COMMENT ADDED SUCCESSFULLY');
  
    });
  });


  describe('GET /api/reels/getAllReels', () => {
    it('responds with comments of the specified reel', async () => {
      // Assuming you have a valid reel ID for testing

      const response = await request(app)
        .get('/api/reels/getAllReels');
  
      expect(response.status).toBe(200);
    });

  });

  describe('GET /api/reels/getreelcomments/:id', () => {
    it('responds with comments of the specified reel', async () => {
      // Assuming you have a valid reel ID for testing
      const reelId = '66335e7eedd5947583996b07';
  
      const response = await request(app)
        .get(`/api/reels/getreelcomments/${reelId}`);
  
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      // Add more assertions as needed
    });

  });


