const userService = require('../services/userService');
const upload = require('../middlewares/uploadMiddleware');

const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit; // Calculate offset for pagination
    const limitValue = parseInt(limit, 10);
    const { users, total, totalPages } = await userService.getAllUsers(offset, limitValue);

    res.json({
      data: {
        list: users,
        pagination: {
          page: parseInt(page, 10),
          limit: limitValue,
          total,
          totalPages,
        }
      },
      message: 'OK',
      status: 200,
      error: null,
    });
  } catch (err) {
    res.status(500).json({
      data: null,
      message: 'Error retrieving users',
      status: 500,
      error: err.message
    });
  }
}

const createUser = async (req, res) => {
  try {

    //console.log('Request body:', req.body); // Log the request body

    const existingUserByEmail = await userService.getUserByEmail(req.body.email);
    if (existingUserByEmail) {
      return res.status(400).json({
        data: null,
        message: 'Email already exists',
        status: 400,
        error: 'Email already exists'
      });
    }

    const existingUserByName = await userService.getUserByName(req.body.name);

    if (existingUserByName) {
      return res.status(400).json({
        data: null,
        message: 'Name already exists',
        status: 400,
        error: 'Name already exists'
      });
    }

    if (!req.body.name || !req.body.email || !req.body.password) {
      return res.status(400).json({
        data: nulluser,
        message: 'Name, email, and password are required',
        status: 400,
        error: 'Name, email, and password are required'
      });
    }
    if (req.body.password.length < 6) {
      return res.status(400).json({
        data: null,
        message: 'Password must be at least 6 characters long',
        status: 400,
        error: 'Password must be at least 6 characters long'
      });
    }

    upload.single('profilePicture')(req, res, async (err) => {
      if (err) {
        console.error('Multer error:', err);
        return res.status(400).json({ message: 'File upload failed' });
      }

      const profilePicturePath = req.file ? req.file.path : null;
      const userData = { ...req.body, profilePicture: profilePicturePath };
      const user = await userService.createUser(userData);

      res.status(201).json({
        data: user,
        message: 'User created successfully',
        status: 201,
        error: null,
      });
    });
  } catch (err) {
    //console.error('Error creating user:', err); // Log the error
    res.status(400).json({
      data: null,
      message: 'Error creating user',
      status: 400,
      error: err.message
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    if (!user) return res.status(404).json({ 
      data: null,
      message: 'Not found',
      status: 404,
      error: {},
     });
    res.json({
      data: user,
      message: 'Updated successfully',
      status: 200,
      error: null,
    });
  } catch (err) {
    res.status(400).json({ 
      data: null,
      message: 'Error updating user',
      status: 400,
      error: err.message
     });
  }
};

const deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    res.json({ 
      data: null,
      message: 'Deleted successfully',
      status: 200,
      error: null,
    });
  } catch (err) {
    res.status(400).json({ 
      data: null,
      message: 'Error deleting user',
      status: 400,
      error: err.message
     });
  }
};

const getUserByToken = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you have middleware that sets req.user
    const user = await userService.getUserByToken(userId);
    if (!user) return res.status(404).json({
      data: null,
      message: 'Not found',
      status: 404,
      error: {},
     });
    res.json(
      {
        data: user,
        message: 'User retrieved successfully',
        status: 200,
        error: null,
      });
  } catch (err) {
    res.status(400).json({ 
      data: null,
      error: err.message,
      message: 'Error retrieving user',
      status: 400,
     });
  }
};

const updateProfilePicture = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you have middleware that sets req.user
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // 'profilePicture' is the field name in the form data
    upload.single('profilePicture')(req, res, async (err) => {
      if (err) {
        console.error('Multer error:', err);
        return res.status(400).json({ message: 'File upload failed' });
      }

      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      const user = await userService.getUserById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Update the user's profile picture
      user.profilePicture = req.file.path; // Assuming you want to store the file path
      await user.save();

      res.status(200).json({
        message: 'Profile picture updated successfully',
        profilePicture: req.file.path,
      });
    });
  } catch (err) {
    console.error('Error updating profile picture:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getUserByToken,
  updateProfilePicture
};
