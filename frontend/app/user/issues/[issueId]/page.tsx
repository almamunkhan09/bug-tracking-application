import { Metadata } from 'next';
import React from 'react';
import SingleIssue from './SingleIssue';

interface Params {
  params: {
    issueId: string;
  };
}

// export async function generateMetadata({ params }: Params): Promise<Metadata> {
//   const productID = parseInt(params.issueId);
//   const newProduct = await products.filter(
//     (product) => product.id === productID,
//   );

//   const pageTitle = newProduct.length > 0 ? newProduct[0].title : 'KSTORE';

//   return { title: pageTitle };
// }

function page({ params }: Params) {
  const issueId = parseInt(params.issueId);
  return <SingleIssue />;
}

export default page;
