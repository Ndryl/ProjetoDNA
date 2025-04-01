import { toast } from "react-toastify";

export const toastType = (
  tipo: string,
  mensagem: string,
  theme: string | undefined
) => {
  let selectedToast;

  switch (tipo) {
    case "success":
      selectedToast = toast.success(`${mensagem}`, {
        style: {
          borderRadius: "10px",
          color: theme === "light" ? "#333" : "#fff",
          background: theme === "light" ? "#fff" : "#333",
        },
      });
      break;
    case "error":
      selectedToast = toast.error(`${mensagem}`, {
        style: {
          borderRadius: "10px",
          color: theme === "light" ? "#333" : "#fff",
          background: theme === "light" ? "#fff" : "#333",
        },
      });
      break;

    default:
      break;
  }
  return selectedToast;
};
