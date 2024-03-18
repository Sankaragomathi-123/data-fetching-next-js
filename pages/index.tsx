import React from "react";
import fs from "fs/promises";
import path from "path";
import Link from "next/link";

function Home(props: any) {
  const { products } = props;
  return (
    <ul>
      {products.map((item: any) => (
        <li key={item.id}>
          <Link href={`products/${item?.id}`}>{item.title} </Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps(context) {
  console.log("RE-GENERTING...");
  const filePath = path.join(process.cwd(), "data", "dummy-data.json");
  const jsonData = await fs.readFile(filePath);

  const data = JSON.parse(jsonData);
  if (!data) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }

  if (data.products.length === 0) {
    return { notFount: true };
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 2, // the page will be re-generated the latest page with the latest data will see
  };
}
export default Home;
