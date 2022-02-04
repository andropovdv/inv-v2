const errorMessage = (errName) => {
  const { name, message } = errName;
  let messages = "";
  switch (name) {
    case "SequelizeForeignKeyConstraintError":
      return "Нельзя удалить связанный элемент";
    default:
      return `Что-то пошло не так ${message}`;
  }
};

export default errorMessage;
