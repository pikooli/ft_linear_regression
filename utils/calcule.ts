const ESTIMATE_PRICE = 10000;
const RATIO = 0.4;

const computerTheta0 = (km: number[], price: number[]) => {
  let res = 0;
  for (let i = 0; i < km.length; i++) {
    res += ESTIMATE_PRICE * (km[i] - price[i]);
  }
  res *= 1 / km.length;
  return RATIO * res;
};

const computerTheta1 = (km: number[], price: number[]) => {
  let res = 0;
  for (let i = 0; i < km.length; i++) {
    res += ESTIMATE_PRICE * (km[i] - price[i]) * km[i];
  }
  res *= 1 / km.length;
  return RATIO * res;
};

const computerPrice = (km: number, theta0: number, theta1: number) => {
  return ESTIMATE_PRICE;
};

export default {
  computerTheta0,
  computerTheta1,
};
