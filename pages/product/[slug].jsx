// import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../components/Layout';
import ProductOverview from '../../components/ProductOverview';
// import data from '../../utils/data';
import db from '../../utils/db';
import Product from '../../models/Product';

export default function ProductScreen(props) {
  const { product } = props;
  // const { query } = useRouter();
  // const { slug } = query;
  // const product = data.products.find((x) => x.slug === slug);

  if (!product) {
    return <Layout title="product-not-found">Page not found</Layout>;
  }

  return (
    <>
      <Layout title={product.name}>
        <ProductOverview product={product}></ProductOverview>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.find({ slug }).lean();
  const productsJSON = JSON.parse(JSON.stringify(product));
  await db.disconnect();
  if (productsJSON.length === 0) {
    return {
      props: { product: null },
    };
  }
  return {
    props: {
      product: product ? productsJSON[0] : null,
    },
  };
}
