/*

测试数据

interface TestProps {
  _id: string;
  name: string;
}

const testData: TestProps[] = [
  { _id: "1", name: "a" },
  { _id: "2", name: "b" }
];

interface ResultData {
  [key: string]: TestProps;
}

const resultData: ResultData = {
  1: { _id: "1", name: "a" },
  2: { _id: "2", name: "b" }
};

const result = arrToObj<TestProps>(testData);
console.log(result, "result");
const fromResult = objToArr<TestProps>(result);
console.log(fromResult, "fromResult");

*/

export const arrToObj = <T extends { _id?: string }>(
  arr: T[]
): { [key: string]: T } => {
  return arr.reduce((pre, cur) => {
    if (cur._id) {
      pre[cur._id] = cur
    }
    return pre
  }, {} as { [key: string]: T })
}

export const objToArr = <T>(obj: { [key: string]: T }): T[] => {
  return Object.keys(obj).map(key => {
    return obj[key]
  })
}
