// const predictDatas = ({
//   datas,
//   theta0,
//   theta1,
// }: {
//   datas: number[];
//   theta0: number;
//   theta1: number;
// }) => {
//   return datas.map((data) => estimateData(data, theta0, theta1));
// };

// const computerDeriver = ({
//   x,
//   y,
//   y_pred,
//   length,
// }: {
//   x: number[];
//   y: number[];
//   y_pred: number[];
//   length: number;
// }) => {
//   let deriver = 0;
//   for (let i = 0; i < length; i++) {
//     deriver += y[i] - y_pred[i];
//   }
//   const d_theta0 = (-2 / length) * deriver;
//   const d_theta1 =
//     (-2 / length) * x.reduce((prev, current) => prev + current * deriver);
//   return { d_theta0, d_theta1 };
// };

// import { round } from "lodash";

// const ESTIMATE_PRICE = 1;

// const computerDerivation = ({
//   kms,
//   prices,
//   learningRate,
//   theta0,
//   theta1,
// }: {
//   kms: number[];
//   prices: number[];
//   learningRate: number;
//   theta0: number;
//   theta1: number;
// }) => {
//   let dtheta0 = 0;
//   let dtheta1 = 0;
//   for (let i = 0; i < kms.length; i++) {
//     dtheta0 += theta1 * kms[i] + theta0 - prices[i];
//     dtheta1 += (theta1 * kms[i] + theta0 - prices[i]) * kms[i];
//   }
//   const tmp0 = theta0 - (dtheta0 / kms.length) * learningRate;
//   const tmp1 = theta1 - (dtheta1 / kms.length) * learningRate;
//   return { tmp0, tmp1 };
// };

// const estimateData = (data: number, theta0: number, theta1: number) => {
//   return theta0 + theta1 * data;
// };

// //
// const computerLoss = ({
//   theta0,
//   theta1,
//   kms,
//   prices,
// }: {
//   theta0: number;
//   theta1: number;
//   kms: number[];
//   prices: number[];
// }) => {
//   let loss = 0;
//   for (let i = 0; i < kms.length; i++) {
//     loss += (prices[i] - (theta1 * kms[i] + theta0)) ** 2;
//   }
//   return loss / kms.length;
// };

// //
// const boldDriver = ({
//   loss,
//   lastLoss,
//   theta0,
//   theta1,
//   tmp0,
//   tmp1,
//   learningRate,
//   length,
// }: {
//   loss: number;
//   lastLoss: number;
//   theta0: number;
//   theta1: number;
//   tmp0: number;
//   tmp1: number;
//   learningRate: number;
//   length: number;
// }) => {
//   if (loss >= lastLoss) {
//     return {
//       theta0: theta0 + (tmp0 / length) * learningRate,
//       theta1: theta0 + (tmp1 / length) * learningRate,
//       // theta0: round(theta0 + (tmp0 / length) * learningRate, 5),
//       // theta1: round(theta0 + (tmp1 / length) * learningRate, 5),
//       learningRate: learningRate * 0.5,
//     };
//   } else
//     return {
//       theta0,
//       theta1,
//       learningRate: learningRate * 1.5,
//     };
// };

// const computerThetas = ({
//   kms,
//   prices,
//   learningRate,
//   iteration = 100,
// }: {
//   kms: number[];
//   prices: number[];
//   learningRate: number;
//   iteration?: number;
// }) => {
//   let theta0 = 0;
//   let theta1 = 0;
//   let theta0History: number[] = [];
//   let theta1History: number[] = [];
//   let lossHistory: number[] = [];
//   for (let i = 0; i < iteration; i++) {
//     const { tmp0, tmp1 } = computerDerivation({
//       kms,
//       prices,
//       learningRate,
//       theta0,
//       theta1,
//     });
//     theta0 = tmp0;
//     theta1 = tmp1;
//     const loss = computerLoss({ theta0, theta1, kms, prices });
//     if (i > 1) {
//       const ajust = boldDriver({
//         loss,
//         lastLoss: lossHistory[i - 1],
//         theta0,
//         theta1,
//         tmp0,
//         tmp1,
//         learningRate,
//         length: kms.length,
//       });
//       theta0 = ajust.theta0;
//       theta1 = ajust.theta1;
//       learningRate = ajust.learningRate;
//     }
//     lossHistory.push(loss);
//     theta0History.push(theta0);
//     theta1History.push(theta1);
//     console.log(theta0, theta1);
//   }
//   return { theta1, theta0, theta0History, theta1History, lossHistory };
// };

// export default {
//   computerThetas,
//   estimateData,
// };
