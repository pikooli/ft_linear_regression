import { useCallback, useEffect, useState } from "react";
import type { NextPage, GetServerSideProps } from "next";

import i18n from "lib/i18n";
import readFile from "utils/readFile";
import Datas from "model/Datas";
import Layout from "components/Layout";
import ShowGraphs from "components/ShowGraphs";
import ShowHistory from "components/ShowHistory";
import Calculation from "model/Calculation";
import EstimatePrice from "components/EstimatePrice";
import DisplayInput from "components/DatasetInput";

export const getServerSideProps: GetServerSideProps = i18n.getTranslations(
  async ({ req }) => {
    const content = readFile("./ressource/data.csv");
    let error = "";
    if (typeof content === "string") {
      error = content;
    }
    return {
      props: { content: error ? [] : content, error },
    };
  }
);

type Props = {
  content: string[][];
  error: string;
};

export const Home: NextPage<Props> = ({ content, error }) => {
  const [datas, setDatas] = useState(content);
  const datasObj = new Datas(datas);
  const calculation = new Calculation(datasObj);

  const xNormalized =
    calculation.normalizeValues(datasObj.get("km"), datasObj.get("km")) || [];
  const yNormalized =
    calculation.normalizeValues(datasObj.get("price"), datasObj.get("price")) ||
    [];
  calculation.computerThetas({
    iteration: 500,
    x: xNormalized,
    y: yNormalized,
  });

  return (
    <Layout>
      {error}
      <EstimatePrice calculation={calculation} />
      <hr />
      <DisplayInput datas={datas} setDatas={setDatas} />
      <hr />
      <ShowGraphs calculation={calculation} />
      <hr />
      <ShowHistory calculation={calculation} />
      <hr />
    </Layout>
  );
};

export default Home;
