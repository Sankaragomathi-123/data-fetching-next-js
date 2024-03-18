import React from "react";
import fs from "fs/promises";
import path from "path";
import { futimes } from "fs";
import { pid } from "process";

export default function Product({ prefetchProduct }) {
  return (
    <div>
      <h2>{prefetchProduct?.title} </h2>
      <h4>{prefetchProduct?.description} </h4>
    </div>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-data.json");
  const jsonData = await fs.readFile(filePath);

  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticProps(context) {
  const data = await getData();

  const { params } = context;
  const productId = params.pid;

  const product = data?.products.find((product) => product?.id === productId);

  return {
    props: {
      prefetchProduct: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();

  const ids = data.products.map((product: any) => product.id);

  const paramIDpath = ids?.map((id) => {
    params: {
      pid: id 
    }
  });

  return {
    paths: paramIDpath,
    // paths: [
    //   { params: { pid: "p1" } },
    //   { params: { pid: "p2" } },
    //   { params: { pid: "p3" } },
    // ],
    fallback: true,
  };
}
