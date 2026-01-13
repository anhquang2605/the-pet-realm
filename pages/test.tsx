import React from 'react';

type TestProps = Record<string, unknown>;

export async function getStaticProps() {
  // Fetch data here
  const data: Record<string, unknown> = {
    exampleKey: 'exampleValue',
  }; // Replace with actual data fetching logic
  return {
    props: { data },
  };
}

const Test: React.FC<TestProps> = ({ data }) => {
  return (
    <div>
      <h1>Test Page</h1>
    </div>
  );
};

export default Test;