// const a = [
//   {
//     id: 1,
//     value: "DVD",
//     createdAt: "2021-12-09T17:37:14.000Z",
//     updatedAt: "2021-12-09T17:37:14.000Z",
//     typeInfoId: 1,
//     typeId: 12,
//     type: {
//       id: 12,
//       name: "OPD",
//       createdAt: "2021-12-08T09:10:34.000Z",
//       updatedAt: "2021-12-08T09:10:34.000Z",
//     },
//     type_info: {
//       id: 1,
//       preferense: "Type",
//       type_preferense: "STRING",
//       createdAt: "2021-12-08T09:10:34.000Z",
//       updatedAt: "2021-12-08T09:10:34.000Z",
//     },
//   },
//   {
//     id: 2,
//     value: "CD-ROM",
//     createdAt: "2021-12-09T18:06:32.000Z",
//     updatedAt: "2021-12-09T18:06:32.000Z",
//     typeInfoId: 1,
//     typeId: 12,
//     type: {
//       id: 12,
//       name: "OPD",
//       createdAt: "2021-12-08T09:10:34.000Z",
//       updatedAt: "2021-12-08T09:10:34.000Z",
//     },
//     type_info: {
//       id: 1,
//       preferense: "Type",
//       type_preferense: "STRING",
//       createdAt: "2021-12-08T09:10:34.000Z",
//       updatedAt: "2021-12-08T09:10:34.000Z",
//     },
//   },
//   {
//     id: 3,
//     value: "16x",
//     createdAt: "2021-12-09T18:08:11.000Z",
//     updatedAt: "2021-12-09T18:08:11.000Z",
//     typeInfoId: 2,
//     typeId: 12,
//     type: {
//       id: 12,
//       name: "OPD",
//       createdAt: "2021-12-08T09:10:34.000Z",
//       updatedAt: "2021-12-08T09:10:34.000Z",
//     },
//     type_info: {
//       id: 2,
//       preferense: "Speed",
//       type_preferense: "STRING",
//       createdAt: "2021-12-08T09:10:34.000Z",
//       updatedAt: "2021-12-08T09:10:34.000Z",
//     },
//   },
// ];

const b = [
  {
    id: 1,
    value: "DVD",
    createdAt: "2021-12-09T17:37:14.000Z",
    updatedAt: "2021-12-09T17:37:14.000Z",
    typeInfoId: 1,
    typeId: 12,
    type: {
      id: 12,
      name: "OPD",
      createdAt: "2021-12-08T09:10:34.000Z",
      updatedAt: "2021-12-08T09:10:34.000Z",
    },
    type_info: {
      id: 1,
      preferense: "Type",
      type_preferense: "DROPDOWN",
      createdAt: "2021-12-08T09:10:34.000Z",
      updatedAt: "2021-12-11T14:34:12.000Z",
    },
  },
  {
    id: 2,
    value: "CD-ROM",
    createdAt: "2021-12-09T18:06:32.000Z",
    updatedAt: "2021-12-09T18:06:32.000Z",
    typeInfoId: 1,
    typeId: 12,
    type: {
      id: 12,
      name: "OPD",
      createdAt: "2021-12-08T09:10:34.000Z",
      updatedAt: "2021-12-08T09:10:34.000Z",
    },
    type_info: {
      id: 1,
      preferense: "Type",
      type_preferense: "DROPDOWN",
      createdAt: "2021-12-08T09:10:34.000Z",
      updatedAt: "2021-12-11T14:34:12.000Z",
    },
  },
  {
    id: 3,
    value: "16x",
    createdAt: "2021-12-09T18:08:11.000Z",
    updatedAt: "2021-12-09T18:08:11.000Z",
    typeInfoId: 2,
    typeId: 12,
    type: {
      id: 12,
      name: "OPD",
      createdAt: "2021-12-08T09:10:34.000Z",
      updatedAt: "2021-12-08T09:10:34.000Z",
    },
    type_info: {
      id: 2,
      preferense: "Speed",
      type_preferense: "DROPDOWN",
      createdAt: "2021-12-08T09:10:34.000Z",
      updatedAt: "2021-12-11T15:06:34.000Z",
    },
  },
];

var map = b.reduce((acc, cur) => {
  acc[cur.typeId] = acc[cur.typeId] || {
    id: cur.typeId,
    // propOne: "",
    // propType: "",
    nType: "",
    val: [],
  };
  // acc[cur.typeInfoId].propOne = cur.type_info.preferense;
  // acc[cur.typeInfoId].propType = cur.type_info.type_preferense;
  // acc[cur.typeInfoId].prop.push(cur.type_info.preferense);
  acc[cur.typeId].nType = cur.type.name;
  acc[cur.typeId].val.push({
    pref: cur.type_info.preferense,
    perfType: cur.type_info.type_preferense,
    value: cur.value,
  });
  return acc;
}, {});

var result = Object.values(map);

console.log(result);
