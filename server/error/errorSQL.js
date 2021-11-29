const errorSQL = (res, err) => {
  switch (err.errno) {
    default:
      res.json({ status: false, message: "что-то пошло не так :-(", msg: err });
  }
};

export default errorSQL;
