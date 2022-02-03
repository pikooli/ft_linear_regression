import _ from "lodash";
import Data from "model/Data";

type ObjArray = {
  [key: string]: Data[];
};

const print = (datas: any[]) => {
  console.log(datas.join(" - "));
};

export default class Cache {
  datas: ObjArray = {};
  keys: string[] = [];
  constructor(datas: (string | number)[][]) {
    for (let j = 0; j < datas.length; j++) {
      const values = datas[j];
      for (let i = 1; i < values.length; i++) {
        this.add(values[0] as string, values[i] as number);
      }
    }
    this.sort(this.keys[0]);
  }

  sort(name: string) {
    this.datas[name] = _.sortBy(this.datas[name], ["data"]);
    const order = this.datas[name].map((e) => e.key);
    this.keys.forEach((k) => {
      if (k === name) return;
      const newValues: Data[] = [];
      for (let i = 0; i < this.datas[k].length; i++) {
        const el = _.find(this.datas[k], { key: order[i] });
        el && newValues.push(el);
      }
      this.datas[k] = newValues;
    });
  }

  add(name: string, data: number) {
    if (!this.datas[name]) {
      this.keys.push(name);
      this.datas[name] = [new Data(data, 0)];
    } else this.datas[name].push(new Data(data, this.datas[name].length));
  }

  get(name: string) {
    return this.datas[name].map((e) => e.data);
  }
}
