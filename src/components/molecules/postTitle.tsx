
import { styled } from "@linaria/react";
import { format } from "date-fns";
import { getNextReadPost } from "@/queries/global";
import Link from "@/components/atoms/link";
import Image from "@/components/atoms/image";
import { Sharing } from "./sharing";


interface Props {
  data: Maybe<Sanity.Article>;
  children?: React.ReactNode;
}

// function calculateReadingTime() {
//   const richTextElements = Array.from(
//     document.querySelectorAll<HTMLDivElement>(".post-content .rich-text")
//   );
//   const allText = richTextElements.map((el) => el.textContent || el.innerText || "").join(" ");
//   const words = allText.trim().split(/\s+/).length;
//   const readingSpeed = 200;
//   const readingTime = Math.ceil(words / readingSpeed);

//   return readingTime;
// }

export default async function PostTitle({ data, children }: Props) {
  // const [readTime, setReadTime] = useState(0);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setReadTime(calculateReadingTime());
  //   }, 100);
  // }, []);


  const nextRead = await getNextReadPost(data?._id);
  if (!data) return null;

  const { tags, title } = data;
  // const validReadTime = data.readTime ? (data.readTime === " " ? null : data.readTime) : readTime;
  const publishDate = data?.publishDate ? format(new Date(data?.publishDate), "dd MMMM yyyy") : null;

  return (
    <Wrapper>
      {data?.image?.desktopImage?.asset && (
        <Image data={data?.image} loading="eager" className="background-image" />
      )}
      <div className="date-and-read-time">
        <p className="date">{publishDate}</p>
      </div>
      <h1 className="h2">{title}</h1>
      <div className="tags">
        {/* TODO: Add tags logic */}
        {tags?.map((tag) => (
          <span key={tag?._key} className="tag-item">{tag?.name}</span>
        ))}
      </div>
      <div className="social-medias">
        <Sharing />
      </div>
      <div className="next-read-desktop">
        {children}
      </div>
    </Wrapper>
  );
};


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16rwd;
  position: sticky;
  top: 0;
  min-height: 100dvh;
  height: fit-content;
  padding: 32rwd;
  color: var(--color-white);


  .background-image {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
    object-position: center;
    filter: brightness(0.6);
  }

  .tags {
    display: flex;
    gap: 8rwd;
    flex-flow: wrap;
  }

  .tag-item {
    padding: 0rwd 8rwd;
    border: 1px solid var(--color-white);
  }


  .date-and-read-time {
    display: flex;
    align-items: center;

    p {
      font-size: 13rw;
    }
  }
  .next-read-desktop {
    margin-top: auto;

    .small {
      margin-bottom: 10rw;
    }

    .content {
      display: flex;
      gap: 10rw;

      .image {
        width: 130rwd;
        min-width: 130rwd;
        height: 80rwd;
        object-fit: cover;

      }
    }
  }

  .read-time {
    font-size: 13rw;
  }

  .social-medias {
    display: flex;
    align-items: center;
    gap: 10rw;
  }

  @media --base-down {
    padding: 16rwm;
    gap: 16rwm;
    position: relative;
    justify-content: flex-end;

    .background-image {
      position: fixed;
    }
    
    .next-read-desktop {
      display: none;
    }

    .h2 {
      /* font-size: 40rwm; */
    }
  }
`;
