import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";

// $-title   Delete My Account
// $-path    DELETE /api/v1/user/:id
// $-auth    Private
//an admin can delete any other  user account

const deleteUserAccount = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const user = await User.findByIdAndDelete(userId);

  if (user) {
    const result = await user.deleteOne();

    res.json({
      success: true,
      message: `User ${result.firstName} deleted successfully`,
    });
  } else {
    res.status(404);
    throw new Error("user not found ");
  }
});

export default deleteUserAccount;
