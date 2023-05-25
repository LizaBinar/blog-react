import { AxiosError } from "axios";

export const checkErrorData = (error) => {
  if (error instanceof AxiosError) {
    return error.response !== undefined;
  } else {
    return false;
  }
};
