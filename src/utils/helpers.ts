import _ from "lodash";

export const randomArray = (number: number): number[] =>
  Array.from({ length: number }, (_, i) => i + 1);

export const formatCurrency = (number: number | undefined) => {
  if (!number) return "0";
  const formattedNumber =
    _.replace(_.round(number, 0).toString(), /\B(?=(\d{3})+(?!\d))/g, ".") +
    " đ";
  return formattedNumber;
};

export const formatDateFromISOString = (string: string | undefined) => {
  if (!string) return "";
  return string.split("T")[0];
};

export const getColorByRole = (role: string | undefined) => {
  switch (role) {
    case "EMPLOYEE":
      return "green";
    case "MANAGER":
      return "red";
    default:
      break;
  }
};
