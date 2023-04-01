import { Metadata } from 'next';
import React from 'react';
import SingleIssue from './SingleIssue';

interface Params {
  params: {
    issueId: string;
  };
}

function page({ params }: Params) {
  const issueId = params.issueId;
  return <SingleIssue issueId={issueId} />;
}

export default page;
