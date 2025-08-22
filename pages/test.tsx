import React from 'react';

interface TestProps {
  data: any; // Replace 'any' with the actual type of your data
}

export async function getStaticProps() {
  // Fetch data here
  const data = {}; // Replace with actual data fetching logic
  return {
    props: { data },
  };
}

const Test: React.FC<TestProps> = ({ data }) => {
  return (
    <div>
      <h1>Test Page</h1>
      <p>Data: {JSON.stringify(data)}</p>
    </div>
  );
};

export default Test;