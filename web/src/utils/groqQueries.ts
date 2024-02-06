import groq from "groq";

// NOTE: Do not leave trailing commas in these queries, as they will break the query. Also use single quotes inside the query.
export const templateFilter = `!(_id in path('template.**'))`;
export const draftsFilter = `!(_id in path('drafts.**'))`;
export const docFilter = `${draftsFilter} && defined(slug.current)`;

const docProjection = groq`_id, _type, slug, title`;
const linkProjection = groq`
  ...,
  internalLink->{
    ${docProjection}
  }
`;

const headerProjection = groq`
  ...,
  links[] {
    ...,
    _type == "link" => {
      ${linkProjection}
    },
    _type == "linkGroup" => {
      ...,
      items[] {
        ${linkProjection}
      }
    }
  }
`;

export const projections = {
  doc: docProjection,
  link: linkProjection,
  header: headerProjection
};

type ProjectionType = keyof typeof projections;

// functions
export function getAllDoc(type: Doc): GroqQuery {
  const query = groq`*[_type == $type && ${docFilter}] | order(_createdAt desc) { ${docProjection} }`;
  return { query, params: { type } };
}

export function getDocBySlug(type: Doc, slug: string): GroqQuery {
  const query = groq`*[_type == $type && slug.current == $slug][0]`;
  return { query, params: { type, slug } };
}

export function getSingleDoc(type: Doc, projectionType?: ProjectionType): GroqQuery {
  const query = groq`*[_type == $type][0]${
    projectionType ? `{${projections[projectionType]}}` : ""
  }`;
  return { query, params: { type } };
}
