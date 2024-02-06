import React, { useCallback, useEffect, useState } from "react";
import type { Dispatch, ReactElement, SetStateAction } from "react";
import { styled } from "@linaria/react";
import { createClient } from "@sanity/client";
import { helpers, Loading } from "@flight-digital/flightdeck";

export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID ?? "",
  dataset: import.meta.env.PUBLIC_SANITY_DATASET ?? "",
  useCdn: false,
  apiVersion: "v2022-03-07",
  token: import.meta.env.PUBLIC_SANITY_TOKEN,
  perspective: "raw"
});

type DocType = "published" | "draft";
interface Props {
  groqQuery: GroqQuery;
  children: (args: any) => JSX.Element;
}

interface PreviewData {
  published: SanityDocument | undefined;
  draft: SanityDocument | undefined;
  loading: boolean;
  notFound: boolean;
}

interface MenuProps {
  previewData: PreviewData;
  docState?: [DocType, Dispatch<SetStateAction<DocType>>];
}

interface PreviewerProps extends MenuProps {
  children: (args?: any) => ReactElement;
}

const { isBrowser, isObjectEmpty, debounce } = helpers;

/**
 * `ClientPreviewer` is a component that fetches and previews data from Sanity.
 * It provides a loading state while the data is being fetched and a not-found
 * state if no data is returned. When data is available, it passes the data to its children.
 *
 */
export default function ClientPreviewer(props: Props) {
  const previewProps = useSanityPreview(props.groqQuery);

  if (previewProps.previewData.loading) {
    return <Loading wrapperText="Loading preview 👀" wrapperHeight="100vh" />;
  }

  if (previewProps.previewData.notFound)
    return (
      <div>
        <h1>Sorry, could not load a preview with anything</h1>
      </div>
    );

  return (
    <>
      <Previewer {...previewProps}>{pageContext => props.children(pageContext)}</Previewer>
      <FloatingMenu {...previewProps} />
    </>
  );
}

/**
 * `Previewer` is a sub-component that determines whether to render a draft or published document.
 * It provides a mechanism to show an updating preview when data changes in real-time.
 * The content rendering is determined by the children function provided to it.
 *
 */
export function Previewer({ previewData, children, docState }: PreviewerProps) {
  if (!previewData) return null;

  const { published, draft } = previewData;

  const data = docState?.[0] === "draft" ? draft : published;

  if (data) {
    const pageContext = { data };
    return (
      <Wrapper>
        {children(pageContext)}
        {previewData.loading && (
          <div className="loader">
            <Loading />
            Updating preview...⏳
          </div>
        )}
      </Wrapper>
    );
  }

  return null;
}

const FloatingMenu = ({ docState, previewData }: MenuProps) => {
  const [docType, setDocType] = docState ?? [];
  const { published, draft } = previewData;

  const handleTypeChange = (type: DocType) => () => {
    if (!setDocType) return;
    setDocType(type);
  };

  return (
    <FixedMenu>
      <h4>Preview mode</h4>
      <div className="options">
        <label>
          {published && (
            <input
              type="radio"
              name="docType"
              value="published"
              checked={docType === "published"}
              onChange={handleTypeChange("published")}
            />
          )}
          <b>Published</b> - {published?._updatedAt ?? "No published version available"}
        </label>
        <label>
          {draft && (
            <input
              type="radio"
              name="docType"
              value="draft"
              checked={docType === "draft"}
              onChange={handleTypeChange("draft")}
            />
          )}
          <b>Draft</b> -{" "}
          {draft?._updatedAt ?? "No draft available, please refresh the page if you have edited"}
        </label>
      </div>
    </FixedMenu>
  );
};

/**
 * Hook for fetching data from Sanity and subscribing to updates.
 */
function useSanityPreview({ query, params }: GroqQuery): {
  previewData: PreviewData;
  docState: [DocType, Dispatch<SetStateAction<DocType>>];
} {
  const { search } = window.location;

  const [previewData, setPreviewData] = useState<PreviewData>({
    published: undefined,
    draft: undefined,
    loading: false,
    notFound: false
  });
  const [docType, setDocType] = useState<DocType>("published");

  const fetchData = useCallback(() => {
    if (!isBrowser) return;
    setPreviewData(prev => ({ ...prev, loading: true }));

    sanityClient.fetch(query, params).then(result => {
      if (!isObjectEmpty(result)) {
        const draftDoc = result?.find((item: any) => item._id.includes("drafts"));
        const publishedDoc = result?.find((item: any) => !item._id.includes("drafts"));
        setDocType(draftDoc ? "draft" : "published");

        setPreviewData(prev => ({
          ...prev,
          published: publishedDoc,
          draft: draftDoc,
          loading: false,
          notFound: false
        }));
      } else {
        setPreviewData(prev => ({ ...prev, notFound: true, loading: false }));
      }
    });
  }, [query, params, search]);

  const debouncedFetchData = useCallback(debounce(fetchData, 1500), [fetchData]);

  useEffect(() => {
    if (import.meta.env.GATSBY_PREVIEW_ENABLED == "false") return;
    fetchData();
  }, []);

  useEffect(() => {
    if (!isBrowser) return;
    if (!previewData.draft) return;
    const query = `*[_id == $id]`;
    const params = { id: previewData.draft._id };

    const subscription = sanityClient.listen(query, params).subscribe((update: any) => {
      if (!update) return;
      if (update.type == "mutation") {
        debouncedFetchData();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [previewData.draft, debouncedFetchData]);

  return { previewData, docState: [docType, setDocType] };
}

const Wrapper = styled.div`
  min-height: 100vh;
  .loader {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    position: fixed;
    height: 100vh;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background-color: white;
    z-index: 100;
    justify-content: center;
    align-items: center;
    opacity: 0.8;
  }
`;

const FixedMenu = styled.div`
  position: fixed;
  right: -240px;
  bottom: 20px;
  width: 250px;
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  transition: right 0.3s ease-in-out;

  &:hover {
    right: 20px;
  }

  .options {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }
`;
