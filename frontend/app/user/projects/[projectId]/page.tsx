import { Metadata } from 'next';
import React from 'react';
import SingleProject from './SingleProject';

interface Params {
  params: {
    projectId: string;
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
  const projectId = params.projectId;
  return <SingleProject projectId={projectId} />;
}

export default page;
