'use client';
import { useState } from 'react';
import NewProjectForm from './NewProjectForm';

function Page() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      Here projects associated with user will be loaded
      <button onClick={() => setOpen(true)}>Open </button>
      <NewProjectForm open={open} setOpen={setOpen} />
    </div>
  );
}

export default Page;
