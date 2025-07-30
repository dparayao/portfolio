import React from 'react';
import styled from 'styled-components';

interface DocumentFieldProps {
  document: any;
}

const DocumentField: React.FC<DocumentFieldProps> = ({ document }) => {
  if (!document) return null;

  // Handle different document structures from Keystone
  let content = document;
  
  // If it's an object with a document property, extract it
  if (document.document) {
    content = document.document;
  }

  // If content is still null/undefined after extraction
  if (!content) return null;

  // Handle string content (HTML or plain text)
  if (typeof content === 'string') {
    // Check if it looks like HTML
    if (content.includes('<') && content.includes('>')) {
      return (
        <HtmlContent 
          dangerouslySetInnerHTML={{ __html: content }} 
        />
      );
    }
    // Plain text
    return <TextContent>{content}</TextContent>;
  }

  // Handle Keystone document structure (ProseMirror/Slate format)
  if (Array.isArray(content)) {
    return (
      <DocumentContainer>
        {content.map((node, index) => renderDocumentNode(node, index))}
      </DocumentContainer>
    );
  }

  // Handle object with children array (common Keystone format)
  if (content.children && Array.isArray(content.children)) {
    return (
      <DocumentContainer>
        {content.children.map((node: any, index: number) => renderDocumentNode(node, index))}
      </DocumentContainer>
    );
  }

  // Fallback: render as formatted JSON for debugging
  return (
    <JsonContent>
      <DebugLabel>Debug: Document Structure</DebugLabel>
      <pre>{JSON.stringify(content, null, 2)}</pre>
    </JsonContent>
  );
};

// Helper function to render individual document nodes
const renderDocumentNode = (node: any, index: number): React.ReactNode => {
  if (!node) return null;

  // Handle text nodes
  if (node.type === 'text' || typeof node === 'string') {
    const text = typeof node === 'string' ? node : node.text || '';
    return <span key={index}>{text}</span>;
  }

  // Handle paragraph nodes
  if (node.type === 'paragraph') {
    return (
      <Paragraph key={index}>
        {node.children?.map((child: any, childIndex: number) => 
          renderDocumentNode(child, childIndex)
        )}
      </Paragraph>
    );
  }

  // Handle heading nodes
  if (node.type === 'heading') {
    const level = node.level || 2;
    const HeadingComponent = level === 1 ? H1 : level === 2 ? H2 : level === 3 ? H3 : H4;
    return (
      <HeadingComponent key={index}>
        {node.children?.map((child: any, childIndex: number) => 
          renderDocumentNode(child, childIndex)
        )}
      </HeadingComponent>
    );
  }

  // Handle list nodes
  if (node.type === 'unordered-list' || node.type === 'ordered-list') {
    const ListComponent = node.type === 'ordered-list' ? OrderedList : UnorderedList;
    return (
      <ListComponent key={index}>
        {node.children?.map((child: any, childIndex: number) => 
          renderDocumentNode(child, childIndex)
        )}
      </ListComponent>
    );
  }

  // Handle list item nodes
  if (node.type === 'list-item') {
    return (
      <ListItem key={index}>
        {node.children?.map((child: any, childIndex: number) => 
          renderDocumentNode(child, childIndex)
        )}
      </ListItem>
    );
  }

  // Handle formatted text (bold, italic, etc.)
  if (node.bold) {
    return (
      <strong key={index}>
        {node.children?.map((child: any, childIndex: number) => 
          renderDocumentNode(child, childIndex)
        ) || node.text}
      </strong>
    );
  }

  if (node.italic) {
    return (
      <em key={index}>
        {node.children?.map((child: any, childIndex: number) => 
          renderDocumentNode(child, childIndex)
        ) || node.text}
      </em>
    );
  }

  // Handle links
  if (node.type === 'link') {
    return (
      <Link key={index} href={node.url} target="_blank" rel="noopener noreferrer">
        {node.children?.map((child: any, childIndex: number) => 
          renderDocumentNode(child, childIndex)
        )}
      </Link>
    );
  }

  // Default: try to render children or text
  if (node.children) {
    return (
      <div key={index}>
        {node.children.map((child: any, childIndex: number) => 
          renderDocumentNode(child, childIndex)
        )}
      </div>
    );
  }

  if (node.text) {
    return <span key={index}>{node.text}</span>;
  }

  return null;
};

// Styled Components
const DocumentContainer = styled.div`
  line-height: 1.6;
  color: #333;
`;

const HtmlContent = styled.div`
  line-height: 1.6;
  color: #333;
  
  h1, h2, h3, h4, h5, h6 {
    margin: 1rem 0 0.5rem 0;
    color: #222;
  }
  
  p {
    margin: 0 0 1rem 0;
  }
  
  ul, ol {
    margin: 0 0 1rem 1rem;
  }
`;

const TextContent = styled.div`
  white-space: pre-wrap;
  line-height: 1.6;
  color: #333;
`;

const JsonContent = styled.div`
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 1rem;
  margin: 1rem 0;
  
  pre {
    margin: 0;
    font-size: 0.85rem;
    color: #666;
    overflow-x: auto;
  }
`;

const DebugLabel = styled.div`
  font-weight: bold;
  color: #999;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const Paragraph = styled.p`
  margin: 0 0 1rem 0;
  line-height: 1.6;
`;

const H1 = styled.h1`
  font-size: 1.8rem;
  margin: 1.5rem 0 0.75rem 0;
  color: #222;
`;

const H2 = styled.h2`
  font-size: 1.5rem;
  margin: 1.25rem 0 0.5rem 0;
  color: #222;
`;

const H3 = styled.h3`
  font-size: 1.25rem;
  margin: 1rem 0 0.5rem 0;
  color: #222;
`;

const H4 = styled.h4`
  font-size: 1.1rem;
  margin: 1rem 0 0.5rem 0;
  color: #222;
`;

const UnorderedList = styled.ul`
  margin: 0 0 1rem 1.5rem;
  padding: 0;
`;

const OrderedList = styled.ol`
  margin: 0 0 1rem 1.5rem;
  padding: 0;
`;

const ListItem = styled.li`
  margin: 0 0 0.25rem 0;
  line-height: 1.5;
`;

const Link = styled.a`
  color: #0066cc;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

export default DocumentField;