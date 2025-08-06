import {useEffect} from 'react';
import { mockBanners } from '../local_data/mock-banner-data';
import { mockOrderItems } from '../local_data/mock-order-data';
import BannerCarousel from '../components/banner-carousel/banner-carousel';
import MainBanner from '../components/main-banner/main-banner';
interface HomeProps {
    title: string;
    description: string;
    sections: string[];
}
export async function getStaticProps(
  
) {
    const prop: HomeProps = {
        title: 'The Pet Realm',
        description: 'This is a sample application built with Next.js.',
        sections: [],
      };
   /*  const PATH: string = 'sections';
    const options: any = {};
    //const sections = await fetchFromGetAPI(PATH,  options);
    const sections: Section[] = [];
    prop.sections = sections.reduce((acc: string[], section: Section) => {
        if (section.title) {
            acc.push(section.title)
        }
        return acc
    }, []); */
    // Mock data for featured items
    const featuredItems = mockOrderItems;
    return {
        props: prop,
    };
};

export default function Home(props: HomeProps) {
  const { title, description, sections } = props;
  useEffect(() => {
    document.title = title;
  }, []);
    return (
    <div>
        <MainBanner/>

  
      
    </div>
  );
}