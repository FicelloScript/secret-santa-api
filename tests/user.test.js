const User = require('../models/User');

describe('User model', () => {
    it('should hash the password before saving', async () => {
        const userData = { username: 'test', email: 'test@example.com', password: 'password' };
        const user = new User(userData);
        await user.save();
        
        expect(user.password).not.toBe(userData.password);
    });

});
