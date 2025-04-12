function validateCreateAccountInput(req, res, next) {
    const { name, email, password, confirmPassword } = req.body;
    
    // Check that all required fields are provided
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Normalize email: trim whitespace and convert to lowercase
    req.body.email = email.trim().toLowerCase();
    
    // Ensure password and confirmPassword match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }
    
    // Additional validations can be added here (e.g., password strength)
    
    // If everything is valid, move to the next middleware/controller
    next();
  }
  
  module.exports = validateCreateAccountInput;