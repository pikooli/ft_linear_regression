import type { NextPage, GetServerSideProps } from "next";
import Header from "components/Header";
import i18n from "lib/i18n";
import readFile from "utils/readFile";
import parseContent from "utils/parseContent";
import Cache from "model/Cache";
import CartJs from "lib/Chartjs";

export const getServerSideProps: GetServerSideProps = i18n.getTranslations(
  async ({ req }) => {
    const content = parseContent(readFile("./ressource/data.csv"));
    let error = "";
    console.log(content);
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
  const cache = new Cache(content);

  return (
    <div>
      <Header />
      <main>
        <h3>Ft_linear_regression</h3>
        {error}
        <div className="row">
          <div className="col-md-6 offset-md-2">
            <CartJs
              labels={cache.get("km").map((e) => e.toString())}
              datas={cache.get("price")}
              label="Price"
            />
          </div>
        </div>
        {/* {test} */}
      </main>
    </div>
  );
};

export default Home;
