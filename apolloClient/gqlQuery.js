import { gql } from "@apollo/client"

// Get all media items
export const getMediaItems = gql`
  query {
    mediaItems {
      id
      title
      type
      file {
        url
      }
      caption
      altText
      createdAt
    }
  }
`

// Get single media item by ID
export const getMediaItem = gql`
  query mediaItem($id: ID!) {
    mediaItem(where: { id: $id }) {
      id
      title
      type
      file {
        url
      }
      caption
      altText
      createdAt
    }
  }
`

// Get all projects (for homepage)
export const getProjects = gql`
  query {
    projects {
      id
      title
      slug
      category
      techStack
      projectUrl
      githubUrl
      createdAt
      demoMedia {
        id
        title
        type
        file {
          url
        }
        caption
        altText
      }
      inspirationMedia {
        id
        title
        type
        file {
          url
        }
        caption
        altText
      }
    }
  }
`

// Get single project by slug (for project detail pages)
export const getProjectBySlug = gql`
  query getProjectBySlug($where: ProjectWhereInput!) {
    projects(where: $where) {
      id
      title
      slug
      category
      techStack
      projectUrl
      githubUrl
      developmentProcess {
        document
      }
      designInspiration {
        document
      }
      demoMedia {
        id
        title
        type
        file {
          url
        }
        caption
        altText
      }
      inspirationMedia {
        id
        title
        type
        file {
          url
        }
        caption
        altText
      }
      createdAt
    }
  }
`

// Get project by ID (alternative to slug-based lookup)
export const getProjectByID = gql`
  query getProjectByID($where: ProjectWhereInput!) {
    projects(where: $where) {
      id
      title
      slug
      category
      techStack
      projectUrl
      githubUrl
      developmentProcess {
        document
      }
      designInspiration {
        document
      }
      demoMedia {
        id
        title
        type
        file {
          url
        }
        caption
        altText
      }
      inspirationMedia {
        id
        title
        type
        file {
          url
        }
        caption
        altText
      }
      createdAt
    }
  }
`

// Get projects by category (useful for filtering)
export const getProjectsByCategory = gql`
  query getProjectsByCategory($category: String!) {
    projects(where: { category: { equals: $category } }) {
      id
      title
      slug
      category
      techStack
      projectUrl
      githubUrl
      createdAt
      demoMedia {
        id
        title
        type
        file {
          url
        }
        caption
        altText
      }
    }
  }
`

// Get basic project info (lighter query for listings)
export const getProjectsBasic = gql`
  query {
    projects {
      id
      title
      slug
      category
      techStack
      createdAt
      demoMedia(take: 1) {
        id
        file {
          url
        }
        altText
      }
    }
  }
`