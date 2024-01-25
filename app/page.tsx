import HomeClientPage from "./page.client";

const page = async () => {
  const products = await fetch(process.env.URL + "/api/product").then((res) =>
    res.json(),
  );
  return <HomeClientPage products={products} />;
};

export default page;
