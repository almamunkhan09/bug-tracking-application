import StatCard from '@/components/StatCard';
import StatCardIssues from '@/components/StatCardIssue';
import UserPage from '@/components/UserPage';
import React from 'react';

function page() {
  return (
    <div>
      <UserPage />
      <StatCard />
      <StatCardIssues />
    </div>
  );
}

export default page;
