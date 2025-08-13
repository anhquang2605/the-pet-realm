import {useEffect} from 'react';
import { mockBanners } from '../local_data/mock-banner-data';
import { mockOrderItems } from '../local_data/mock-order-data';
import BannerCarousel from '../components/universals/banner-carousel/banner-carousel';
import MainBanner from '../components/main-banner/main-banner';
import { FeatureItems } from '../types/order';
import FeaturedItems from '../components/featured-items/featured-items';
interface HomeProps {
    title: string;
    description: string;
    sections: string[];
    featuredItems: FeatureItems[];
}
export async function getStaticProps(
  
) {
    const prop: HomeProps = {
        title: 'The Pet Realm',
        description: 'This is a sample application built with Next.js.',
        sections: [],
        featuredItems: mockOrderItems
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

    return {
        props: prop,
    };
};

export default function Home(props: HomeProps) {
  const { title, description, sections, featuredItems } = props;
  useEffect(() => {
    document.title = title;
  }, []);
    return (
    <main className="">
        <MainBanner/>
        <FeaturedItems featuredItems={featuredItems} />
  
      
    </main>
  );
}