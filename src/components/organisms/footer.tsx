import SanityIcon from "@flight-digital/flightdeck/pebbles/sanityIcon";
import { styled } from "@linaria/react";
import Link from "../atoms/link";
import RichText from "../molecules/richText";

interface Props {
  data: Sanity.Maybe<Sanity.Footer>;
  socialMedias?: Sanity.Maybe<readonly Sanity.Maybe<Sanity.SocialMedia>[]> | undefined;
}

const Footer = ({ data, socialMedias }: Props) => {
  if (!data) return null;

  const { bottomLinks, copyright, navigation } = data;

  return (
    <Wrapper>
      <div className="nav-menus">
        {navigation?.map((nav) => (
          <div className="nav-menu" key={nav?._key}>
            <p className="title">{nav?.title}</p>
            <ul className="nav-list">
              {nav?.links?.map((link) => (
                <li key={link?._key}>
                  <Link data={link} className="nav-link" />
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="social-media-links">
          <ul>
            {socialMedias?.map((socialMedia) => (
              <li key={socialMedia?._key}>
                <a
                  href={socialMedia?.url ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-media-link"
                >
                  <SanityIcon data={socialMedia?.icon} color="var(--color-blue)" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="bottom-area">
        <RichText data={copyright} />
        <ul className="bottom-links">
          {bottomLinks?.map((link) => (
            <li key={link?._key}>
              <Link data={link} className="nav-link" />
            </li>
          ))}
        </ul>
      </div>
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.footer`
  width: 100%;
  position: relative;
  padding: 64rwd var(--theme-page-horizontal-padding) 16rwd;
  border-top: 1px solid grey;
  display: flex;
  flex-direction: column;
  gap: 24rwd;

  @media --base-down {
    padding: 32rwm var(--theme-page-horizontal-padding);
    gap: 16rwm;
  }

  .nav-menus {
    display: flex;
    gap: 24rwd;

    @media --base-down {
      gap: 16rwm;
      flex-direction: column;
    }

    .nav-menu {
      display: flex;
      flex: 1;
      flex-direction: column;

      .title {
        font-size: 14rwd;
        margin-bottom: 32rwd;
        text-transform: uppercase;
        font-weight: var(--font-weight-bold);
        color: var(--color-blue);

        @media --base-down {
          font-size: 14rwm;
          margin-bottom: 16rwm;
        }
      }
    }

    .nav-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 4rw;
    }
  }

  .social-media-links {
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      gap: 20rw;
    }
  }

  .bottom-area {
    display: flex;
    gap: 20rwd;
    align-items: center;
    justify-content: center;
    padding-top: 20rwd;
    padding-bottom: 4rwd;

    @media --base-down {
      gap: 16rwm;
      padding-top: 16rwm;
      flex-direction: column;
      padding-bottom: 0;
    }

    * {
      font-size: 13rw;
      color: #aaa;
    }

    .rich-text {
      text-align: center;
    }

    .bottom-links {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      gap: 20rw;
    }
  }
`;
