function validateLoginInput(req, res, next) {
  const { email, password } = req.body;
  
  // Check that all required fields are provided
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  // Normalize email: trim whitespace and convert to lowercase
  req.body.email = email.trim().toLowerCase();
  
  next();
}

module.exports = validateLoginInput;
