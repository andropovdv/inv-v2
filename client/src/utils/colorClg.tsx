import colors from "colors";

const colorClg = (message: string) => {
  return console.log(colors.bgCyan.black(message));
};

export default colorClg;
