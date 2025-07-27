import { ROLE, HTTP_STATUS } from "../../constants/index.js";
import { createUser, findUserByEmail } from "../../services/index.js";
import { sendSuccessResponse, sendErrorResponse } from "../../helpers/index.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      sendErrorResponse(
        res,
        HTTP_STATUS.UNPROCESSABLE_ENTITY,
        "All fields is required"
      );
    }

    if (!Object.values(ROLE).includes(role)) {
      sendErrorResponse(res, HTTP_STATUS.UNPROCESSABLE_ENTITY, "Invalid role!");
    }

    if (await findUserByEmail(email)) {
      sendErrorResponse(
        res,
        HTTP_STATUS.CONFLICT,
        "Users with this email already exists!"
      );
    }

    const newUser = await createUser(name, email, password, role);

    sendSuccessResponse(
      res,
      HTTP_STATUS.CREATED,
      "New user created successfully!",
      { id: newUser._id }
    );
  } catch (error) {
    sendErrorResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, error.message);
  }
};
