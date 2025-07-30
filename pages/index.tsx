import {useEffect} from 'react';

interface HomeProps {
    title: string;
    description: string;
    sections: string[];
}
export async function getServerSideProps(
  
) {
    const prop: HomeProps = {
        title: 'The Pet Realm',
        description: 'This is a sample application built with Next.js.',
        sections: []
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
        <h1>Welcome to My Next.js App</h1>
        <p>This is a sample application built with Next.js.</p>
        <p>Explore the features and enjoy the experience!</p>
       
    </div>
  );
}