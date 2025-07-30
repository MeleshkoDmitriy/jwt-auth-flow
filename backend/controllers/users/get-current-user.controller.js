import { findUserById } from "../../services/index.js";
import { HTTP_STATUS } from "../../constants/index.js";
import { sendSuccessResponse, sendErrorResponse } from "../../helpers/index.js";

export const getCurrentUser = async (req, res) => {
  try {
    const user = await findUserById(req.user.id);

    sendSuccessResponse(res, HTTP_STATUS.OK, "User fetched successfully!", {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    sendErrorResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, error.message);
  }
};
