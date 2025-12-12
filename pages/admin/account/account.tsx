//generate an account page for next.js with getStaticProps
import { GetStaticProps } from 'next';
import { useEffect, useState } from 'react';

interface AccountPageProps {
  username: string;
  password: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}