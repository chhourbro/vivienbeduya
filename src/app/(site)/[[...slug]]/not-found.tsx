import RichText from "@/components/molecules/richText";
import { getSiteSettings } from "@/queries/global";
import { styled } from "@linaria/react";
import Link from "next/link";

const NotFound = async () => {
  const settings = await getSiteSettings();

  return (
    <Wrapper>
      {settings?.notFoundPageContent ? (
        <RichText data={settings.notFoundPageContent} />
      ) : (
        <>
          <p className="h3">Oops!</p>
          <p>The page you are looking for does not exist.</p>
          <Link href="/">Go back to the home page</Link>
        </>
      )}
    </Wrapper>
  );
};

export default NotFound;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100dvh - 72rwd);
  width: 100%;
  gap: 16rwd;

  @media --base-down {
    height: calc(100svh - 68rwm);
    gap: 16rwm;
  }

  a {
    text-decoration: underline;
  }
`;
