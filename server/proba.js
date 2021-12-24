const tmp = {
  id: 1,
  name: "CPU",
  createdAt: "2021-11-30T09:33:41.000Z",
  updatedAt: "2021-11-30T09:33:41.000Z",
  tableValue: [
    {
      id: 7,
      value: "socket 12",
      createdAt: "2021-12-13T14:23:55.000Z",
      updatedAt: "2021-12-21T14:18:47.000Z",
      typeInfoId: 7,
      typeId: 1,
      type_info: {
        id: 7,
        preferense: "Частота",
        type_preferense: "STRING",
        createdAt: "2021-12-09T09:08:01.000Z",
        updatedAt: "2021-12-23T12:14:58.000Z",
      },
    },
  ],
  key: 1,
};

const result = tmp.tableValue.map((el) => el.id);

console.log(result);
