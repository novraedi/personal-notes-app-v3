import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";

export default function ToastNotification(message, type) {
  switch (type) {
    case "success":
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      break;
    case "error":
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      break;
    case "warning":
      toast.warning(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      break;
    default:
      toast.info(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      break;
  }
}

ToastNotification.prototype = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
