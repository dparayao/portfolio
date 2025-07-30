// Portfolio home page

import PortfolioView from '../components/PortfolioView'
import PortfolioHeader from '../components/PortfolioHeader'

import client from "../apolloClient";
import { getProjects } from '../apolloClient/gqlQuery';
import { useProjects, ProjectsHashmap, Project } from '../context/ProjectProvider';
import { useEffect } from 'react';

interface HomeProps {
  projects: ProjectsHashmap;
}

export default function Home({ projects }: HomeProps) {
  const { setProjects } = useProjects();
  
  useEffect(() => {
    setProjects(projects);
  }, [projects, setProjects]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <PortfolioHeader />
      <PortfolioView projects={projects} />
    </div>
  )
}

// **IMPORTANT: all data fetching should be done here and then passed to components

export async function getStaticProps() {
  try {
    // Retrieves json response of all projects using Apollo Client to query Keystone
    const { data } = await client.query({
      query: getProjects,
    });

    let projects: ProjectsHashmap = {};

    // For each project, puts into hashmap where key is slug and data is project object
    data.projects.forEach((project: Project) => {
      projects[project.slug] = project;
    });

    console.log('Projects loaded:', Object.keys(projects));
    
    return { 
      props: { 
        projects: projects 
      },
      // Revalidate every hour to pick up new projects
      revalidate: 3600
    };
  } catch (error) {
    console.error('Error fetching projects:', error);
    
    return {
      props: {
        projects: {}
      },
      // Retry more frequently on error
      revalidate: 60
    };
  }
}