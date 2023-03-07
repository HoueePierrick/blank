const object: any = { a: 1, b: 2, c: 3 };
const keys = Object.keys(object);
console.log(object[`${keys[1]}`]);

// // delete Object.assign(object, { ["test"]: object["a"] })["a"];

// // Object.defineProperty(
// //   object,
// //   "test",
// //   Object.getOwnPropertyDescriptor(object, a!)
// // );
// // delete object["a"];

// const newObject = {};
// delete Object.assign(newObject, object, { ["test1"]: object["a"] })[a];
