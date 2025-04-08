const updateUser = async (req, res) => {
  const user = res.user; // Access the user object from the middleware\
  const updatedFields = {}; // Create an object to store the updated fields\
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (req.body.firstName && req.body.firstName.trim() !== "")
    updatedFields.firstName = req.body.firstName;
  if (req.body.lastName && req.body.lastName.trim() !== "")
    updatedFields.lastName = req.body.lastName;
  if (
    req.body.email &&
    emailRegex.test(req.body.email) &&
    req.body.email.trim() !== ""
  )
    updatedFields.email = req.body.email;
  if (req.body.password && req.body.password.trim() !== "")
    updatedFields.password = req.body.password;

  // Check if at least one valid field is present

  if (Object.keys(updatedFields).length === 0) {
    return res
      .status(400)
      .json({ error: "At least one valid field is required for update, empty fields not allowed" });
  }
  if (updatedFields.email) {
    user.email = updatedFields.email;
  }
  if (updatedFields.firstName) {
    user.firstName = updatedFields.firstName;
  }
  if (updatedFields.lastName) {
    user.lastName = updatedFields.lastName;
  }
  if (updatedFields.password) {
    if (updatedFields.password.length < 6) {
      return res
        .status(400)
        .json({
          status: "error",
          error: "Password must be at least 6 characters long",
        });
    }
    user.password = updatedFields.password;
  }
  try {
    await user.save(); // Save the updated user
    res
      .status(200)
      .json({
        status: "success",
        message: "User updated successfully",
        data: user,
      });
  } catch (error) {
    console.error("Error while updating user:", error);
    res.status(500).json({ status: "error", error: "Internal Server Error",message:error.message });
  }
};

module.exports = { updateUser };
