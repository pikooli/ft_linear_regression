import { ScatterChart } from "lib/ChartJS";
import Calculation from "model/Calculation";

const ShowHistory = ({ calculation }: { calculation: Calculation }) => {
  const datas = [
    {
      datasets: [
        {
          label: "History of t0",
          data: calculation.theta0History.map((data, i) => ({ x: i, y: data })),
          backgroundColor: "rgba(255, 99, 132, 1)",
        },
      ],
    },
    {
      datasets: [
        {
          label: "History of t1",
          data: calculation.theta1History.map((data, i) => ({ x: i, y: data })),
          backgroundColor: "rgba(255, 99, 132, 1)",
        },
      ],
    },
    {
      datasets: [
        {
          label: "History of loss",
          data: calculation.lossHistory.map((data, i) => ({ x: i, y: data })),
          backgroundColor: "rgba(255, 99, 132, 1)",
        },
      ],
    },
  ];

  return (
    <div className="row">
      {datas.map((data, i) => (
        <div className="col-md-6" key={i}>
          <ScatterChart datas={data} />
        </div>
      ))}
    </div>
  );
};

export default ShowHistory;
