import { useRouter } from 'next/router';
import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import ProjectView from '../../components/ProjectView';
import ProjectBack from '../../components/ProjectBack';
import client from '../../apolloClient';
import { getProjects, getProjectBySlug } from '../../apolloClient/gqlQuery';
import { useProjects, Project } from '../../context/ProjectProvider';
import { useEffect } from 'react';

interface ProjectPageProps {
  project: Project | null;
}

const ProjectPage: React.FC<ProjectPageProps> = ({ project }) => {
  const router = useRouter();
  const projectSlug = router.query.projectSlug as string;
  const { setCurrentProject } = useProjects();

  useEffect(() => {
    if (project) {
      setCurrentProject(project);
    }
  }, [project, setCurrentProject]);

  // Show loading state during client-side navigation
  if (router.isFallback) {
    return <div>Loading project...</div>;
  }

  // Show error state if project not found
  if (!project) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Project Not Found</h1>
        <p>The project "{projectSlug}" could not be found.</p>
        <ProjectBack />
      </div>
    );
  }

  return (
    <div style={{ position: 'relative' }}>
      <ProjectView projectSlug={projectSlug} project={project}/>
    </div>
  );
};

// Generate static paths for all projects
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { data } = await client.query({
      query: getProjects,
    });

    // Generate paths for each project slug
    const paths = data.projects.map((project: any) => ({
      params: { projectSlug: project.slug }
    }));

    return {
      paths,
      fallback: 'blocking' // Enable ISR for new projects
    };
  } catch (error) {
    console.error('Error generating project paths:', error);
    return {
      paths: [],
      fallback: 'blocking'
    };
  }
};

// Get static props for each project
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const projectSlug = params?.projectSlug as string;

  if (!projectSlug) {
    return {
      notFound: true
    };
  }

  try {
    // Query specific project by slug
    const { data } = await client.query({
      query: getProjectBySlug,
      variables: {
        where: { slug: { equals: projectSlug } }
      }
    });

    // Check if project exists
    if (!data.projects || data.projects.length === 0) {
      return {
        notFound: true
      };
    }

    const project = data.projects[0];

    return {
      props: {
        project
      },
      // Revalidate every hour
      revalidate: 3600
    };
  } catch (error) {
    console.error(`Error fetching project ${projectSlug}:`, error);
    return {
      notFound: true
    };
  }
};

export default ProjectPage;