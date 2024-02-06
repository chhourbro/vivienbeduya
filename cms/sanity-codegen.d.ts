/// <reference types="@sanity-codegen/types" />

namespace Sanity.Development.Client {
  type Config = {};
}
namespace Sanity.Development.Schema {
  type Accordion =
    | {
        content?: Sanity.Ref.Ref_oHavmKqImSGClTjv;
        title?: string;
      }
    | undefined;
}
namespace Sanity.Development.Schema {
  type AllBlogs =
    | {
        title?: string;
      }
    | undefined;
}
namespace Sanity.Development.Schema {
  type BlockContent =
    | {
        blocks?: {
          _key: string;
          _type: "block";
          children: {
            _key: string;
            _type: "span";
            marks?: unknown[];
            text?: string;
          }[];
          markDefs?: unknown[];
          style?: string;
        }[];
      }
    | undefined;
}
namespace Sanity.Development.Schema {
  type Blog =
    | {
        _id: string;
        _type: "blog";
        categories?: Sanity.Reference<Sanity.Ref.Ref_7cCmJ2eCSjqpzoE7>[];
        contentBlocks?: (
          | Sanity.Ref.Ref_1zIsRPHffySWMay1
          | Sanity.Ref.Ref_oHavmKqImSGClTjv
          | Sanity.Reference<Sanity.Ref.Ref_DkHj8euaoN0m18BI>
          | Sanity.Ref.Ref_RfTjNKcmZhiuYgZl
          | Sanity.Ref.Ref_TD8dDaYTTm11gtl2
          | Sanity.Ref.Ref_XJmA7DZZKWXTYxE4
        )[];
        publishDate?: string;
        seo?: Sanity.Ref.Ref_5yvLIFVsShVpY6eO;
        slug?: {
          _type: "slug";
          current?: string;
          source?: string;
        };
        textAlign?: string;
        title?: string;
      }
    | undefined;
}
namespace Sanity.Development.Schema {
  type BlogCategory =
    | {
        _id: string;
        _type: "blogCategory";
        categoryId?: {
          _type: "slug";
          current?: string;
          source?: string;
        };
        title?: string;
      }
    | undefined;
}
namespace Sanity.Development.Schema {
  type Carousel =
    | {
        autoplay?: boolean;
        image?: Sanity.Ref.Ref_TD8dDaYTTm11gtl2;
        label?: string;
        slides?: Sanity.Ref.Ref_sxu4CnI8YCPTPjDM[];
      }
    | undefined;
}
namespace Sanity.Development.Schema {
  type Code =
    | {
        code?: string;
        filename?: string;
        highlightedLines?: number[];
        language?: string;
      }
    | undefined;
}
namespace Sanity.Development.Schema {
  type Color = string | undefined;
}
namespace Sanity.Development.Schema {
  type ColumnContent =
    | {
        firstColumn?: (
          | Sanity.Ref.Ref_1zIsRPHffySWMay1
          | Sanity.Ref.Ref_oHavmKqImSGClTjv
          | Sanity.Ref.Ref_RfTjNKcmZhiuYgZl
          | Sanity.Ref.Ref_TD8dDaYTTm11gtl2
          | Sanity.Ref.Ref_XJmA7DZZKWXTYxE4
        )[];
        flipColumns?: boolean;
        label?: string;
        secondColumn?: (
          | Sanity.Ref.Ref_1zIsRPHffySWMay1
          | Sanity.Ref.Ref_oHavmKqImSGClTjv
          | Sanity.Ref.Ref_RfTjNKcmZhiuYgZl
          | Sanity.Ref.Ref_TD8dDaYTTm11gtl2
          | Sanity.Ref.Ref_XJmA7DZZKWXTYxE4
        )[];
      }
    | undefined;
}
namespace Sanity.Development.Schema {
  type Cta =
    | {
        description?: Sanity.Ref.Ref_oHavmKqImSGClTjv;
        design?: string;
        image?: Sanity.Ref.Ref_TD8dDaYTTm11gtl2;
        link?: Sanity.Ref.Ref_Y7G9SJTgkTlIhH7j;
        title?: string;
      }
    | undefined;
}
namespace Sanity.Development.Schema {
  type Footer =
    | {
        _id: string;
        _type: "footer";
        fields?: string;
      }
    | undefined;
}
namespace Sanity.Development.Schema {
  type Geopoint =
    | {
        alt?: number;
        lat?: number;
        lng?: number;
      }
    | undefined;
}
namespace Sanity.Development.Schema {
  type Header =
    | {
        _id: string;
        _type: "header";
        links?: Sanity.Ref.Ref_Y7G9SJTgkTlIhH7j[];
        logo?: Sanity.Ref.Ref_TD8dDaYTTm11gtl2;
      }
    | undefined;
}
namespace Sanity.Development.Schema {
  type Hero =
    | {
        backgroundImage?: Sanity.Ref.Ref_TD8dDaYTTm11gtl2[];
        heroContent?: Sanity.Ref.Ref_oHavmKqImSGClTjv;
        links?: Sanity.Ref.Ref_1zIsRPHffySWMay1;
        marginBottom?: string;
      }
    | undefined;
}
namespace Sanity.Development.Schema {
  type IconPicker =
    | {
        name?: string;
        provider?: string;
        svg?: string;
      }
    | undefined;
}
namespace Sanity.Development.Schema {
  type ImageWithMeta =
    | {
        altText?: string;
        asset: Sanity.Reference<{
          _type: "sanity.imageAsset";
          assetId: string;
          extension: string;
          metadata: {
            _type: "sanity.imageMetadata";
            dimensions: {
              _type: "sanity.imageDimensions";
              aspectRatio: number;
              height: number;
              width: number;
            };
            hasAlpha: boolean;
            isOpaque: boolean;
            lqip: string;
            palette: {
              _type: "sanity.imagePalette";
              darkMuted: {
                _type: "sanity.imagePaletteSwatch";
                background: string;
                foreground: string;
                population: number;
                title: string;
              };
              darkVibrant: {
                _type: "sanity.imagePaletteSwatch";
                background: string;
                foreground: string;
                population: number;
                title: string;
              };
              dominant: {
                _type: "sanity.imagePaletteSwatch";
                background: string;
                foreground: string;
                population: number;
                title: string;
              };
              lightMuted: {
                _type: "sanity.imagePaletteSwatch";
                background: string;
                foreground: string;
                population: number;
                title: string;
              };
              lightVibrant: {
                _type: "sanity.imagePaletteSwatch";
                background: string;
                foreground: string;
                population: number;
                title: string;
              };
              muted: {
                _type: "sanity.imagePaletteSwatch";
                background: string;
                foreground: string;
                population: number;
                title: string;
              };
              vibrant: {
                _type: "sanity.imagePaletteSwatch";
                background: string;
                foreground: string;
                population: number;
                title: string;
              };
            };
          };
          mimeType: string;
          originalFilename: string;
          path: string;
          sha1hash: string;
          size: number;
          uploadId: string;
          url: string;
        }>;
        crop?: {
          _type: "sanity.imageCrop";
          bottom: number;
          left: number;
          right: number;
          top: number;
        };
        hotspot?: {
          _type: "sanity.imageHotspot";
          height: number;
          width: number;
          x: number;
          y: number;
        };
        objectFit?: string;
        padding?: string;
      }
    | undefined;
}
namespace Sanity.Development.Schema {
  type LatestBlogs =
    | {
        allBlogsLink?: Sanity.Ref.Ref_Y7G9SJTgkTlIhH7j;
        categories?: Sanity.Reference<Sanity.Ref.Ref_7cCmJ2eCSjqpzoE7>[];
        label?: string;
      }
    | undefined;
}
namespace Sanity.Development.Schema {
  type Link =
    | {
        anchorId?: string;
        externalLink?: string;
        internalLink?: Sanity.Reference<
          Sanity.Ref.Ref_2N6IYckNHBaLs1x7 | Sanity.Ref.Ref_7R4jwehVmOM7TuqY
        >;
        linkText?: string;
      }
    | undefined;
}
namespace Sanity.Development.Schema {
  type Links =
    | {
        items?: Sanity.Ref.Ref_Y7G9SJTgkTlIhH7j[];
        label?: string;
      }
    | undefined;
}
namespace Sanity.Development.Schema {
  type MediaBgContent =
    | {
        label?: string;
        links?: Sanity.Ref.Ref_1zIsRPHffySWMay1;
        media?: (
          | Sanity.Ref.Ref_TD8dDaYTTm11gtl2
          | Sanity.Ref.Ref_Xcom95QCKBZVWKt6
        )[];
        text?: Sanity.Ref.Ref_oHavmKqImSGClTjv;
        title?: string;
      }
    | undefined;
}
namespace Sanity.Development.Schema {
  type MediaTag =
    | {
        _id: string;
        _type: "media.tag";
        name?: {
          _type: "slug";
          current?: string;
          source?: string;
        };
      }
    | undefined;
}
namespace Sanity.Development.Schema {
  type Page =
    | {
        _id: string;
        _type: "page";
        sections?: (
          | Sanity.Reference<Sanity.Ref.Ref_DkHj8euaoN0m18BI>
          | Sanity.Ref.Ref_PeOyCUMGS9qy602P
        )[];
        seo?: Sanity.Ref.Ref_5yvLIFVsShVpY6eO;
        slug?: {
          _type: "slug";
          current?: string;
          source?: string;
        };
        title?: string;
      }
    | undefined;
}
namespace Sanity.Development.Schema {
  type ReusableSection =
    | {
        _id: string;
        _type: "reusableSection";
        section?: Sanity.Ref.Ref_PeOyCUMGS9qy602P;
        title?: string;
      }
    | undefined;
}
namespace Sanity.Development.Schema {
  type RowContent =
    | {
        gridLayout?: boolean;
        label?: string;
        rowItems?: (
          | Sanity.Ref.Ref_1zIsRPHffySWMay1
          | Sanity.Ref.Ref_oHavmKqImSGClTjv
          | Sanity.Ref.Ref_RfTjNKcmZhiuYgZl
          | Sanity.Ref.Ref_TD8dDaYTTm11gtl2
          | Sanity.Ref.Ref_XJmA7DZZKWXTYxE4
        )[];
      }
    | undefined;
}
namespace Sanity.Development.Schema {
  type SanityAssetSourceData =
    | {
        id?: string;
        name?: string;
        url?: string;
      }
    | undefined;
}
namespace Sanity.Development.Schema {
  type SanityFileAsset =
    | {
        _id: string;
        _type: "sanity.fileAsset";
        altText?: string;
        assetId?: string;
        description?: string;
        extension?: string;
        label?: string;
        mimeType?: string;
        originalFilename?: string;
        path?: string;
        sha1hash?: string;
        size?: number;
        source?: Sanity.Ref.Ref_hxo0ds2z3sBuUsAb;
        title?: string;
        url?: string;
      }
    | undefined;
}
namespace Sanity.Development.Schema {
  type SanityImageAsset =
    | {
        _id: string;
        _type: "sanity.imageAsset";
        altText?: string;
        assetId?: string;
        description?: string;
        extension?: string;
        label?: string;
        metadata?: Sanity.Ref.Ref_9yE4ckVtflfgkuHG;
        mimeType?: string;
        originalFilename?: string;
        path?: string;
        sha1hash?: string;
        size?: number;
        source?: Sanity.Ref.Ref_hxo0ds2z3sBuUsAb;
        title?: string;
        uploadId?: string;
        url?: string;
      }
    | undefined;
}
namespace Sanity.Development.Schema {
  type SanityImageCrop =
    | {
        bottom?: number;
        left?: number;
        right?: number;
        top?: number;
      }
    | undefined;
}
namespace Sanity.Development.Schema {
  type SanityImageDimensions =
    | {
        aspectRatio?: number;
        height?: number;
        width?: number;
      }
    | undefined;
}
namespace Sanity.Development.Schema {
  type SanityImageHotspot =
    | {
        height?: number;
        width?: number;
        x?: number;
        y?: number;
      }
    | undefined;
}
namespace Sanity.Development.Schema {
  type SanityImageMetadata =
    | {
        blurHash?: string;
        dimensions?: Sanity.Ref.Ref_mHpV7N2PpUZNbPHN;
        hasAlpha?: boolean;
        isOpaque?: boolean;
        location?: {
          _type: "geopoint";
          alt: number;
          lat: number;
          lng: number;
        };
        lqip?: string;
        palette?: Sanity.Ref.Ref_o4wfqXyUo8260o8G;
      }
    | undefined;
}
namespace Sanity.Development.Schema {
  type SanityImagePalette =
    | {
        darkMuted?: Sanity.Ref.Ref_iNRk8Y6FN98631Zz;
        darkVibrant?: Sanity.Ref.Ref_iNRk8Y6FN98631Zz;
        dominant?: Sanity.Ref.Ref_iNRk8Y6FN98631Zz;
        lightMuted?: Sanity.Ref.Ref_iNRk8Y6FN98631Zz;
        lightVibrant?: Sanity.Ref.Ref_iNRk8Y6FN98631Zz;
        muted?: Sanity.Ref.Ref_iNRk8Y6FN98631Zz;
        vibrant?: Sanity.Ref.Ref_iNRk8Y6FN98631Zz;
      }
    | undefined;
}
namespace Sanity.Development.Schema {
  type SanityImagePaletteSwatch =
    | {
        background?: string;
        foreground?: string;
        population?: number;
        title?: string;
      }
    | undefined;
}
namespace Sanity.Development.Schema {
  type Section =
    | {
        anchorId?: string;
        backgroundColour?: Sanity.Ref.Ref_Gxov8mb9fJ0hKMRX;
        contentBlocks?: (
          | Sanity.Ref.Ref_BkradyMSwqMdAii0
          | Sanity.Ref.Ref_EC1Db77RJTOFdNSX
          | Sanity.Ref.Ref_Hv9wPaf2Q2i4ExfH
          | Sanity.Ref.Ref_jklLx0dPykAsD5kl
          | Sanity.Ref.Ref_O2nOkQMBqLCGHEmi
          | Sanity.Ref.Ref_oHavmKqImSGClTjv
          | Sanity.Ref.Ref_TD8dDaYTTm11gtl2
          | Sanity.Ref.Ref_YvbnKpFmirkti9vz
          | Sanity.Ref.Ref_zjJpzD2kP4DaohxE
        )[];
        label?: string;
        marginBottom?: string;
        padding?: string;
      }
    | undefined;
}
namespace Sanity.Development.Schema {
  type Seo =
    | {
        jsonLD?: Sanity.Ref.Ref_6KOW399FTmHbowgM;
        ogImage?: {
          asset: Sanity.Reference<{
            _type: "sanity.imageAsset";
            assetId: string;
            extension: string;
            metadata: {
              _type: "sanity.imageMetadata";
              dimensions: {
                _type: "sanity.imageDimensions";
                aspectRatio: number;
                height: number;
                width: number;
              };
              hasAlpha: boolean;
              isOpaque: boolean;
              lqip: string;
              palette: {
                _type: "sanity.imagePalette";
                darkMuted: {
                  _type: "sanity.imagePaletteSwatch";
                  background: string;
                  foreground: string;
                  population: number;
                  title: string;
                };
                darkVibrant: {
                  _type: "sanity.imagePaletteSwatch";
                  background: string;
                  foreground: string;
                  population: number;
                  title: string;
                };
                dominant: {
                  _type: "sanity.imagePaletteSwatch";
                  background: string;
                  foreground: string;
                  population: number;
                  title: string;
                };
                lightMuted: {
                  _type: "sanity.imagePaletteSwatch";
                  background: string;
                  foreground: string;
                  population: number;
                  title: string;
                };
                lightVibrant: {
                  _type: "sanity.imagePaletteSwatch";
                  background: string;
                  foreground: string;
                  population: number;
                  title: string;
                };
                muted: {
                  _type: "sanity.imagePaletteSwatch";
                  background: string;
                  foreground: string;
                  population: number;
                  title: string;
                };
                vibrant: {
                  _type: "sanity.imagePaletteSwatch";
                  background: string;
                  foreground: string;
                  population: number;
                  title: string;
                };
              };
            };
            mimeType: string;
            originalFilename: string;
            path: string;
            sha1hash: string;
            size: number;
            uploadId: string;
            url: string;
          }>;
          crop?: {
            _type: "sanity.imageCrop";
            bottom: number;
            left: number;
            right: number;
            top: number;
          };
          hotspot?: {
            _type: "sanity.imageHotspot";
            height: number;
            width: number;
            x: number;
            y: number;
          };
        };
        pageDescription?: string;
        pageKeyWords?: string;
        pageTitle?: string;
      }
    | undefined;
}
namespace Sanity.Development.Schema {
  type SiteConfig =
    | {
        _id: string;
        _type: "siteConfig";
        defaultSEO?: Sanity.Ref.Ref_5yvLIFVsShVpY6eO;
        socials?: Sanity.Ref.Ref_yZvhfaSiR6y9CvF1[];
        title?: string;
      }
    | undefined;
}
namespace Sanity.Development.Schema {
  type Slide =
    | {
        items?: (
          | Sanity.Ref.Ref_1zIsRPHffySWMay1
          | Sanity.Ref.Ref_oHavmKqImSGClTjv
          | Sanity.Ref.Ref_RfTjNKcmZhiuYgZl
          | Sanity.Ref.Ref_TD8dDaYTTm11gtl2
          | Sanity.Ref.Ref_XJmA7DZZKWXTYxE4
        )[];
        label?: string;
      }
    | undefined;
}
namespace Sanity.Development.Schema {
  type Slug =
    | {
        current?: string;
        source?: string;
      }
    | undefined;
}
namespace Sanity.Development.Schema {
  type SocialLink =
    | {
        icon?: Sanity.Ref.Ref_9g23XVVJAG25Ul8K;
        url?: string;
      }
    | undefined;
}
namespace Sanity.Development.Schema {
  type Video =
    | {
        imagePreview?: Sanity.Ref.Ref_TD8dDaYTTm11gtl2;
        title?: string;
        vimeoVideoId?: string;
        youtubeId?: string;
      }
    | undefined;
}
namespace Sanity.Production.Schema {
  type Accordion =
    | {
        content?: Sanity.Ref.Ref_CXxapymNuJd2zpOv;
        title?: string;
      }
    | undefined;
}
namespace Sanity.Production.Schema {
  type Blog =
    | {
        _id: string;
        _type: "blog";
        categories?: Sanity.Reference<Sanity.Ref.Ref_E3kbHG3zc6tXsrXC>[];
        contentBlocks?: (
          | Sanity.Ref.Ref_1QTk0fHjkPyrgj59
          | Sanity.Ref.Ref_5v9351v44HAcww4K
          | Sanity.Ref.Ref_CXxapymNuJd2zpOv
          | Sanity.Ref.Ref_PGoIO1vMc0rPyG6S
          | Sanity.Reference<Sanity.Ref.Ref_3ilrwm6QlHCkeO2V>
          | Sanity.Ref.Ref_ZX6jqLQZPPU6TBzN
        )[];
        publishDate?: string;
        seo?: Sanity.Ref.Ref_mB93Z3XmQ2yR5eUb;
        slug?: {
          _type: "slug";
          current?: string;
          source?: string;
        };
        textAlign?: string;
        title?: string;
      }
    | undefined;
}
namespace Sanity.Production.Schema {
  type Carousel =
    | {
        autoplay?: boolean;
        image?: Sanity.Ref.Ref_1QTk0fHjkPyrgj59;
        label?: string;
        slides?: Sanity.Ref.Ref_zUeNNqcrZob4cMcd[];
      }
    | undefined;
}
namespace Sanity.Production.Schema {
  type ColumnContent =
    | {
        firstColumn?: (
          | Sanity.Ref.Ref_1QTk0fHjkPyrgj59
          | Sanity.Ref.Ref_5v9351v44HAcww4K
          | Sanity.Ref.Ref_CXxapymNuJd2zpOv
          | Sanity.Ref.Ref_PGoIO1vMc0rPyG6S
          | Sanity.Ref.Ref_ZX6jqLQZPPU6TBzN
        )[];
        flipColumns?: boolean;
        label?: string;
        secondColumn?: (
          | Sanity.Ref.Ref_1QTk0fHjkPyrgj59
          | Sanity.Ref.Ref_5v9351v44HAcww4K
          | Sanity.Ref.Ref_CXxapymNuJd2zpOv
          | Sanity.Ref.Ref_PGoIO1vMc0rPyG6S
          | Sanity.Ref.Ref_ZX6jqLQZPPU6TBzN
        )[];
      }
    | undefined;
}
namespace Sanity.Production.Schema {
  type Cta =
    | {
        description?: Sanity.Ref.Ref_CXxapymNuJd2zpOv;
        design?: string;
        image?: Sanity.Ref.Ref_1QTk0fHjkPyrgj59;
        link?: Sanity.Ref.Ref_bbqDv0jngz9pVaxh;
        title?: string;
      }
    | undefined;
}
namespace Sanity.Production.Schema {
  type Header =
    | {
        _id: string;
        _type: "header";
        links?: Sanity.Ref.Ref_bbqDv0jngz9pVaxh[];
        logo?: Sanity.Ref.Ref_1QTk0fHjkPyrgj59;
      }
    | undefined;
}
namespace Sanity.Production.Schema {
  type Hero =
    | {
        backgroundImage?: Sanity.Ref.Ref_1QTk0fHjkPyrgj59[];
        heroContent?: Sanity.Ref.Ref_CXxapymNuJd2zpOv;
        links?: Sanity.Ref.Ref_5v9351v44HAcww4K;
        marginBottom?: string;
      }
    | undefined;
}
namespace Sanity.Production.Schema {
  type LatestBlogs =
    | {
        allBlogsLink?: Sanity.Ref.Ref_bbqDv0jngz9pVaxh;
        categories?: Sanity.Reference<Sanity.Ref.Ref_E3kbHG3zc6tXsrXC>[];
        label?: string;
      }
    | undefined;
}
namespace Sanity.Production.Schema {
  type Link =
    | {
        anchorId?: string;
        externalLink?: string;
        internalLink?: Sanity.Reference<
          Sanity.Ref.Ref_AbQshwON0YegXSyF | Sanity.Ref.Ref_FpUu2gmcoTYGQ4Y7
        >;
        linkText?: string;
      }
    | undefined;
}
namespace Sanity.Production.Schema {
  type Links =
    | {
        items?: Sanity.Ref.Ref_bbqDv0jngz9pVaxh[];
        label?: string;
      }
    | undefined;
}
namespace Sanity.Production.Schema {
  type MediaBgContent =
    | {
        label?: string;
        links?: Sanity.Ref.Ref_5v9351v44HAcww4K;
        media?: (
          | Sanity.Ref.Ref_1QTk0fHjkPyrgj59
          | Sanity.Ref.Ref_uAf8wPCG9D8XtceA
        )[];
        text?: Sanity.Ref.Ref_CXxapymNuJd2zpOv;
        title?: string;
      }
    | undefined;
}
namespace Sanity.Production.Schema {
  type Page =
    | {
        _id: string;
        _type: "page";
        sections?: (
          | Sanity.Ref.Ref_JgMWLPLIAI2f0Jwy
          | Sanity.Reference<Sanity.Ref.Ref_3ilrwm6QlHCkeO2V>
        )[];
        seo?: Sanity.Ref.Ref_mB93Z3XmQ2yR5eUb;
        slug?: {
          _type: "slug";
          current?: string;
          source?: string;
        };
        title?: string;
      }
    | undefined;
}
namespace Sanity.Production.Schema {
  type ReusableSection =
    | {
        _id: string;
        _type: "reusableSection";
        section?: Sanity.Ref.Ref_JgMWLPLIAI2f0Jwy;
        title?: string;
      }
    | undefined;
}
namespace Sanity.Production.Schema {
  type RowContent =
    | {
        gridLayout?: boolean;
        label?: string;
        rowItems?: (
          | Sanity.Ref.Ref_1QTk0fHjkPyrgj59
          | Sanity.Ref.Ref_5v9351v44HAcww4K
          | Sanity.Ref.Ref_CXxapymNuJd2zpOv
          | Sanity.Ref.Ref_PGoIO1vMc0rPyG6S
          | Sanity.Ref.Ref_ZX6jqLQZPPU6TBzN
        )[];
      }
    | undefined;
}
namespace Sanity.Production.Schema {
  type SanityFileAsset =
    | {
        _id: string;
        _type: "sanity.fileAsset";
        altText?: string;
        assetId?: string;
        description?: string;
        extension?: string;
        label?: string;
        mimeType?: string;
        originalFilename?: string;
        path?: string;
        sha1hash?: string;
        size?: number;
        source?: Sanity.Ref.Ref_WUQcbf4zA2CnpuZs;
        title?: string;
        url?: string;
      }
    | undefined;
}
namespace Sanity.Production.Schema {
  type SanityImageAsset =
    | {
        _id: string;
        _type: "sanity.imageAsset";
        altText?: string;
        assetId?: string;
        description?: string;
        extension?: string;
        label?: string;
        metadata?: Sanity.Ref.Ref_zuoFHQlaUhJETspw;
        mimeType?: string;
        originalFilename?: string;
        path?: string;
        sha1hash?: string;
        size?: number;
        source?: Sanity.Ref.Ref_WUQcbf4zA2CnpuZs;
        title?: string;
        uploadId?: string;
        url?: string;
      }
    | undefined;
}
namespace Sanity.Production.Schema {
  type SanityImageMetadata =
    | {
        blurHash?: string;
        dimensions?: Sanity.Ref.Ref_OaoHSSmnE99m18qI;
        hasAlpha?: boolean;
        isOpaque?: boolean;
        location?: {
          _type: "geopoint";
          alt: number;
          lat: number;
          lng: number;
        };
        lqip?: string;
        palette?: Sanity.Ref.Ref_dtSHhmAsUPjHCn7f;
      }
    | undefined;
}
namespace Sanity.Production.Schema {
  type SanityImagePalette =
    | {
        darkMuted?: Sanity.Ref.Ref_51RGLlZew9n2wRJ0;
        darkVibrant?: Sanity.Ref.Ref_51RGLlZew9n2wRJ0;
        dominant?: Sanity.Ref.Ref_51RGLlZew9n2wRJ0;
        lightMuted?: Sanity.Ref.Ref_51RGLlZew9n2wRJ0;
        lightVibrant?: Sanity.Ref.Ref_51RGLlZew9n2wRJ0;
        muted?: Sanity.Ref.Ref_51RGLlZew9n2wRJ0;
        vibrant?: Sanity.Ref.Ref_51RGLlZew9n2wRJ0;
      }
    | undefined;
}
namespace Sanity.Production.Schema {
  type Section =
    | {
        anchorId?: string;
        backgroundColour?: Sanity.Ref.Ref_MTT7NER0UF8CCDK6;
        contentBlocks?: (
          | Sanity.Ref.Ref_1QTk0fHjkPyrgj59
          | Sanity.Ref.Ref_8pPUWMbuIoHyLaGh
          | Sanity.Ref.Ref_BWyy6cGRc5GgWd7c
          | Sanity.Ref.Ref_CXxapymNuJd2zpOv
          | Sanity.Ref.Ref_gh9ewTPeld7jmaBv
          | Sanity.Ref.Ref_hFapihoRAJ76Igcg
          | Sanity.Ref.Ref_jj3HTF1NNYSQuR6B
          | Sanity.Ref.Ref_uN3QDkpQq1Piv8he
          | Sanity.Ref.Ref_xCcf18NIlN5mFODq
        )[];
        label?: string;
        marginBottom?: string;
        padding?: string;
      }
    | undefined;
}
namespace Sanity.Production.Schema {
  type Seo =
    | {
        jsonLD?: Sanity.Ref.Ref_vTUNyfrXWupbzsP0;
        ogImage?: {
          asset: Sanity.Reference<{
            _type: "sanity.imageAsset";
            assetId: string;
            extension: string;
            metadata: {
              _type: "sanity.imageMetadata";
              dimensions: {
                _type: "sanity.imageDimensions";
                aspectRatio: number;
                height: number;
                width: number;
              };
              hasAlpha: boolean;
              isOpaque: boolean;
              lqip: string;
              palette: {
                _type: "sanity.imagePalette";
                darkMuted: {
                  _type: "sanity.imagePaletteSwatch";
                  background: string;
                  foreground: string;
                  population: number;
                  title: string;
                };
                darkVibrant: {
                  _type: "sanity.imagePaletteSwatch";
                  background: string;
                  foreground: string;
                  population: number;
                  title: string;
                };
                dominant: {
                  _type: "sanity.imagePaletteSwatch";
                  background: string;
                  foreground: string;
                  population: number;
                  title: string;
                };
                lightMuted: {
                  _type: "sanity.imagePaletteSwatch";
                  background: string;
                  foreground: string;
                  population: number;
                  title: string;
                };
                lightVibrant: {
                  _type: "sanity.imagePaletteSwatch";
                  background: string;
                  foreground: string;
                  population: number;
                  title: string;
                };
                muted: {
                  _type: "sanity.imagePaletteSwatch";
                  background: string;
                  foreground: string;
                  population: number;
                  title: string;
                };
                vibrant: {
                  _type: "sanity.imagePaletteSwatch";
                  background: string;
                  foreground: string;
                  population: number;
                  title: string;
                };
              };
            };
            mimeType: string;
            originalFilename: string;
            path: string;
            sha1hash: string;
            size: number;
            uploadId: string;
            url: string;
          }>;
          crop?: {
            _type: "sanity.imageCrop";
            bottom: number;
            left: number;
            right: number;
            top: number;
          };
          hotspot?: {
            _type: "sanity.imageHotspot";
            height: number;
            width: number;
            x: number;
            y: number;
          };
        };
        pageDescription?: string;
        pageKeyWords?: string;
        pageTitle?: string;
      }
    | undefined;
}
namespace Sanity.Production.Schema {
  type SiteConfig =
    | {
        _id: string;
        _type: "siteConfig";
        defaultSEO?: Sanity.Ref.Ref_mB93Z3XmQ2yR5eUb;
        socials?: Sanity.Ref.Ref_ZXNR7Q9xgCKQ68Lw[];
        title?: string;
      }
    | undefined;
}
namespace Sanity.Production.Schema {
  type Slide =
    | {
        items?: (
          | Sanity.Ref.Ref_1QTk0fHjkPyrgj59
          | Sanity.Ref.Ref_5v9351v44HAcww4K
          | Sanity.Ref.Ref_CXxapymNuJd2zpOv
          | Sanity.Ref.Ref_PGoIO1vMc0rPyG6S
          | Sanity.Ref.Ref_ZX6jqLQZPPU6TBzN
        )[];
        label?: string;
      }
    | undefined;
}
namespace Sanity.Production.Schema {
  type SocialLink =
    | {
        icon?: Sanity.Ref.Ref_5haUkKobMB8m1QdJ;
        url?: string;
      }
    | undefined;
}
namespace Sanity.Production.Schema {
  type Video =
    | {
        imagePreview?: Sanity.Ref.Ref_1QTk0fHjkPyrgj59;
        title?: string;
        vimeoVideoId?: string;
        youtubeId?: string;
      }
    | undefined;
}
namespace Sanity.Ref {
  type Ref_1QTk0fHjkPyrgj59 = {
    altText?: string;
    asset: Sanity.Reference<{
      _type: "sanity.imageAsset";
      assetId: string;
      extension: string;
      metadata: {
        _type: "sanity.imageMetadata";
        dimensions: {
          _type: "sanity.imageDimensions";
          aspectRatio: number;
          height: number;
          width: number;
        };
        hasAlpha: boolean;
        isOpaque: boolean;
        lqip: string;
        palette: {
          _type: "sanity.imagePalette";
          darkMuted: {
            _type: "sanity.imagePaletteSwatch";
            background: string;
            foreground: string;
            population: number;
            title: string;
          };
          darkVibrant: {
            _type: "sanity.imagePaletteSwatch";
            background: string;
            foreground: string;
            population: number;
            title: string;
          };
          dominant: {
            _type: "sanity.imagePaletteSwatch";
            background: string;
            foreground: string;
            population: number;
            title: string;
          };
          lightMuted: {
            _type: "sanity.imagePaletteSwatch";
            background: string;
            foreground: string;
            population: number;
            title: string;
          };
          lightVibrant: {
            _type: "sanity.imagePaletteSwatch";
            background: string;
            foreground: string;
            population: number;
            title: string;
          };
          muted: {
            _type: "sanity.imagePaletteSwatch";
            background: string;
            foreground: string;
            population: number;
            title: string;
          };
          vibrant: {
            _type: "sanity.imagePaletteSwatch";
            background: string;
            foreground: string;
            population: number;
            title: string;
          };
        };
      };
      mimeType: string;
      originalFilename: string;
      path: string;
      sha1hash: string;
      size: number;
      uploadId: string;
      url: string;
    }>;
    crop?: {
      _type: "sanity.imageCrop";
      bottom: number;
      left: number;
      right: number;
      top: number;
    };
    hotspot?: {
      _type: "sanity.imageHotspot";
      height: number;
      width: number;
      x: number;
      y: number;
    };
    objectFit?: string;
    padding?: string;
  };
}
namespace Sanity.Ref {
  type Ref_1zIsRPHffySWMay1 = {
    items?: Sanity.Ref.Ref_Y7G9SJTgkTlIhH7j[];
    label?: string;
  };
}
namespace Sanity.Ref {
  type Ref_2N6IYckNHBaLs1x7 =
    | {
        _id: string;
        _type: "page";
        sections?: (
          | Sanity.Reference<Sanity.Ref.Ref_DkHj8euaoN0m18BI>
          | Sanity.Ref.Ref_PeOyCUMGS9qy602P
        )[];
        seo?: Sanity.Ref.Ref_5yvLIFVsShVpY6eO;
        slug?: {
          _type: "slug";
          current?: string;
          source?: string;
        };
        title?: string;
      }
    | undefined;
}
namespace Sanity.Ref {
  type Ref_3ilrwm6QlHCkeO2V =
    | {
        _id: string;
        _type: "reusableSection";
        section?: Sanity.Ref.Ref_JgMWLPLIAI2f0Jwy;
        title?: string;
      }
    | undefined;
}
namespace Sanity.Ref {
  type Ref_51RGLlZew9n2wRJ0 = {
    background?: string;
    foreground?: string;
    population?: number;
    title?: string;
  };
}
namespace Sanity.Ref {
  type Ref_5haUkKobMB8m1QdJ = {
    name?: string;
    provider?: string;
    svg?: string;
  };
}
namespace Sanity.Ref {
  type Ref_5v9351v44HAcww4K = {
    items?: Sanity.Ref.Ref_bbqDv0jngz9pVaxh[];
    label?: string;
  };
}
namespace Sanity.Ref {
  type Ref_5yvLIFVsShVpY6eO = {
    jsonLD?: Sanity.Ref.Ref_6KOW399FTmHbowgM;
    ogImage?: {
      asset: Sanity.Reference<{
        _type: "sanity.imageAsset";
        assetId: string;
        extension: string;
        metadata: {
          _type: "sanity.imageMetadata";
          dimensions: {
            _type: "sanity.imageDimensions";
            aspectRatio: number;
            height: number;
            width: number;
          };
          hasAlpha: boolean;
          isOpaque: boolean;
          lqip: string;
          palette: {
            _type: "sanity.imagePalette";
            darkMuted: {
              _type: "sanity.imagePaletteSwatch";
              background: string;
              foreground: string;
              population: number;
              title: string;
            };
            darkVibrant: {
              _type: "sanity.imagePaletteSwatch";
              background: string;
              foreground: string;
              population: number;
              title: string;
            };
            dominant: {
              _type: "sanity.imagePaletteSwatch";
              background: string;
              foreground: string;
              population: number;
              title: string;
            };
            lightMuted: {
              _type: "sanity.imagePaletteSwatch";
              background: string;
              foreground: string;
              population: number;
              title: string;
            };
            lightVibrant: {
              _type: "sanity.imagePaletteSwatch";
              background: string;
              foreground: string;
              population: number;
              title: string;
            };
            muted: {
              _type: "sanity.imagePaletteSwatch";
              background: string;
              foreground: string;
              population: number;
              title: string;
            };
            vibrant: {
              _type: "sanity.imagePaletteSwatch";
              background: string;
              foreground: string;
              population: number;
              title: string;
            };
          };
        };
        mimeType: string;
        originalFilename: string;
        path: string;
        sha1hash: string;
        size: number;
        uploadId: string;
        url: string;
      }>;
      crop?: {
        _type: "sanity.imageCrop";
        bottom: number;
        left: number;
        right: number;
        top: number;
      };
      hotspot?: {
        _type: "sanity.imageHotspot";
        height: number;
        width: number;
        x: number;
        y: number;
      };
    };
    pageDescription?: string;
    pageKeyWords?: string;
    pageTitle?: string;
  };
}
namespace Sanity.Ref {
  type Ref_6KOW399FTmHbowgM = {
    code?: string;
    filename?: string;
    highlightedLines?: number[];
    language?: string;
  };
}
namespace Sanity.Ref {
  type Ref_7cCmJ2eCSjqpzoE7 =
    | {
        _id: string;
        _type: "blogCategory";
        categoryId?: {
          _type: "slug";
          current?: string;
          source?: string;
        };
        title?: string;
      }
    | undefined;
}
namespace Sanity.Ref {
  type Ref_7R4jwehVmOM7TuqY =
    | {
        _id: string;
        _type: "blog";
        categories?: Sanity.Reference<Sanity.Ref.Ref_7cCmJ2eCSjqpzoE7>[];
        contentBlocks?: (
          | Sanity.Ref.Ref_1zIsRPHffySWMay1
          | Sanity.Ref.Ref_oHavmKqImSGClTjv
          | Sanity.Reference<Sanity.Ref.Ref_DkHj8euaoN0m18BI>
          | Sanity.Ref.Ref_RfTjNKcmZhiuYgZl
          | Sanity.Ref.Ref_TD8dDaYTTm11gtl2
          | Sanity.Ref.Ref_XJmA7DZZKWXTYxE4
        )[];
        publishDate?: string;
        seo?: Sanity.Ref.Ref_5yvLIFVsShVpY6eO;
        slug?: {
          _type: "slug";
          current?: string;
          source?: string;
        };
        textAlign?: string;
        title?: string;
      }
    | undefined;
}
namespace Sanity.Ref {
  type Ref_8pPUWMbuIoHyLaGh = {
    autoplay?: boolean;
    image?: Sanity.Ref.Ref_1QTk0fHjkPyrgj59;
    label?: string;
    slides?: Sanity.Ref.Ref_zUeNNqcrZob4cMcd[];
  };
}
namespace Sanity.Ref {
  type Ref_9g23XVVJAG25Ul8K = {
    name?: string;
    provider?: string;
    svg?: string;
  };
}
namespace Sanity.Ref {
  type Ref_9yE4ckVtflfgkuHG = {
    blurHash?: string;
    dimensions?: Sanity.Ref.Ref_mHpV7N2PpUZNbPHN;
    hasAlpha?: boolean;
    isOpaque?: boolean;
    location?: {
      _type: "geopoint";
      alt: number;
      lat: number;
      lng: number;
    };
    lqip?: string;
    palette?: Sanity.Ref.Ref_o4wfqXyUo8260o8G;
  };
}
namespace Sanity.Ref {
  type Ref_AbQshwON0YegXSyF =
    | {
        _id: string;
        _type: "blog";
        categories?: Sanity.Reference<Sanity.Ref.Ref_E3kbHG3zc6tXsrXC>[];
        contentBlocks?: (
          | Sanity.Ref.Ref_1QTk0fHjkPyrgj59
          | Sanity.Ref.Ref_5v9351v44HAcww4K
          | Sanity.Ref.Ref_CXxapymNuJd2zpOv
          | Sanity.Ref.Ref_PGoIO1vMc0rPyG6S
          | Sanity.Reference<Sanity.Ref.Ref_3ilrwm6QlHCkeO2V>
          | Sanity.Ref.Ref_ZX6jqLQZPPU6TBzN
        )[];
        publishDate?: string;
        seo?: Sanity.Ref.Ref_mB93Z3XmQ2yR5eUb;
        slug?: {
          _type: "slug";
          current?: string;
          source?: string;
        };
        textAlign?: string;
        title?: string;
      }
    | undefined;
}
namespace Sanity.Ref {
  type Ref_bbqDv0jngz9pVaxh = {
    anchorId?: string;
    externalLink?: string;
    internalLink?: Sanity.Reference<
      Sanity.Ref.Ref_AbQshwON0YegXSyF | Sanity.Ref.Ref_FpUu2gmcoTYGQ4Y7
    >;
    linkText?: string;
  };
}
namespace Sanity.Ref {
  type Ref_BkradyMSwqMdAii0 = {
    autoplay?: boolean;
    image?: Sanity.Ref.Ref_TD8dDaYTTm11gtl2;
    label?: string;
    slides?: Sanity.Ref.Ref_sxu4CnI8YCPTPjDM[];
  };
}
namespace Sanity.Ref {
  type Ref_BWyy6cGRc5GgWd7c = {
    allBlogsLink?: Sanity.Ref.Ref_bbqDv0jngz9pVaxh;
    categories?: Sanity.Reference<Sanity.Ref.Ref_E3kbHG3zc6tXsrXC>[];
    label?: string;
  };
}
namespace Sanity.Ref {
  type Ref_CXxapymNuJd2zpOv = {
    blocks?: {
      _key: string;
      _type: "block";
      children: {
        _key: string;
        _type: "span";
        marks?: unknown[];
        text?: string;
      }[];
      markDefs?: unknown[];
      style?: string;
    }[];
  };
}
namespace Sanity.Ref {
  type Ref_DkHj8euaoN0m18BI =
    | {
        _id: string;
        _type: "reusableSection";
        section?: Sanity.Ref.Ref_PeOyCUMGS9qy602P;
        title?: string;
      }
    | undefined;
}
namespace Sanity.Ref {
  type Ref_dtSHhmAsUPjHCn7f = {
    darkMuted?: Sanity.Ref.Ref_51RGLlZew9n2wRJ0;
    darkVibrant?: Sanity.Ref.Ref_51RGLlZew9n2wRJ0;
    dominant?: Sanity.Ref.Ref_51RGLlZew9n2wRJ0;
    lightMuted?: Sanity.Ref.Ref_51RGLlZew9n2wRJ0;
    lightVibrant?: Sanity.Ref.Ref_51RGLlZew9n2wRJ0;
    muted?: Sanity.Ref.Ref_51RGLlZew9n2wRJ0;
    vibrant?: Sanity.Ref.Ref_51RGLlZew9n2wRJ0;
  };
}
namespace Sanity.Ref {
  type Ref_E3kbHG3zc6tXsrXC =
    | {
        _id: string;
        _type: "blogCategory";
        categoryId?: {
          _type: "slug";
          current?: string;
          source?: string;
        };
        title?: string;
      }
    | undefined;
}
namespace Sanity.Ref {
  type Ref_EC1Db77RJTOFdNSX = {
    allBlogsLink?: Sanity.Ref.Ref_Y7G9SJTgkTlIhH7j;
    categories?: Sanity.Reference<Sanity.Ref.Ref_7cCmJ2eCSjqpzoE7>[];
    label?: string;
  };
}
namespace Sanity.Ref {
  type Ref_FpUu2gmcoTYGQ4Y7 =
    | {
        _id: string;
        _type: "page";
        sections?: (
          | Sanity.Ref.Ref_JgMWLPLIAI2f0Jwy
          | Sanity.Reference<Sanity.Ref.Ref_3ilrwm6QlHCkeO2V>
        )[];
        seo?: Sanity.Ref.Ref_mB93Z3XmQ2yR5eUb;
        slug?: {
          _type: "slug";
          current?: string;
          source?: string;
        };
        title?: string;
      }
    | undefined;
}
namespace Sanity.Ref {
  type Ref_gh9ewTPeld7jmaBv = {
    backgroundImage?: Sanity.Ref.Ref_1QTk0fHjkPyrgj59[];
    heroContent?: Sanity.Ref.Ref_CXxapymNuJd2zpOv;
    links?: Sanity.Ref.Ref_5v9351v44HAcww4K;
    marginBottom?: string;
  };
}
namespace Sanity.Ref {
  type Ref_Gxov8mb9fJ0hKMRX = string;
}
namespace Sanity.Ref {
  type Ref_hFapihoRAJ76Igcg = {
    label?: string;
    links?: Sanity.Ref.Ref_5v9351v44HAcww4K;
    media?: (
      | Sanity.Ref.Ref_1QTk0fHjkPyrgj59
      | Sanity.Ref.Ref_uAf8wPCG9D8XtceA
    )[];
    text?: Sanity.Ref.Ref_CXxapymNuJd2zpOv;
    title?: string;
  };
}
namespace Sanity.Ref {
  type Ref_Hv9wPaf2Q2i4ExfH = {
    firstColumn?: (
      | Sanity.Ref.Ref_1zIsRPHffySWMay1
      | Sanity.Ref.Ref_oHavmKqImSGClTjv
      | Sanity.Ref.Ref_RfTjNKcmZhiuYgZl
      | Sanity.Ref.Ref_TD8dDaYTTm11gtl2
      | Sanity.Ref.Ref_XJmA7DZZKWXTYxE4
    )[];
    flipColumns?: boolean;
    label?: string;
    secondColumn?: (
      | Sanity.Ref.Ref_1zIsRPHffySWMay1
      | Sanity.Ref.Ref_oHavmKqImSGClTjv
      | Sanity.Ref.Ref_RfTjNKcmZhiuYgZl
      | Sanity.Ref.Ref_TD8dDaYTTm11gtl2
      | Sanity.Ref.Ref_XJmA7DZZKWXTYxE4
    )[];
  };
}
namespace Sanity.Ref {
  type Ref_hxo0ds2z3sBuUsAb = {
    id?: string;
    name?: string;
    url?: string;
  };
}
namespace Sanity.Ref {
  type Ref_iNRk8Y6FN98631Zz = {
    background?: string;
    foreground?: string;
    population?: number;
    title?: string;
  };
}
namespace Sanity.Ref {
  type Ref_JgMWLPLIAI2f0Jwy = {
    anchorId?: string;
    backgroundColour?: Sanity.Ref.Ref_MTT7NER0UF8CCDK6;
    contentBlocks?: (
      | Sanity.Ref.Ref_1QTk0fHjkPyrgj59
      | Sanity.Ref.Ref_8pPUWMbuIoHyLaGh
      | Sanity.Ref.Ref_BWyy6cGRc5GgWd7c
      | Sanity.Ref.Ref_CXxapymNuJd2zpOv
      | Sanity.Ref.Ref_gh9ewTPeld7jmaBv
      | Sanity.Ref.Ref_hFapihoRAJ76Igcg
      | Sanity.Ref.Ref_jj3HTF1NNYSQuR6B
      | Sanity.Ref.Ref_uN3QDkpQq1Piv8he
      | Sanity.Ref.Ref_xCcf18NIlN5mFODq
    )[];
    label?: string;
    marginBottom?: string;
    padding?: string;
  };
}
namespace Sanity.Ref {
  type Ref_jj3HTF1NNYSQuR6B = {
    title?: string;
  };
}
namespace Sanity.Ref {
  type Ref_jklLx0dPykAsD5kl = {
    backgroundImage?: Sanity.Ref.Ref_TD8dDaYTTm11gtl2[];
    heroContent?: Sanity.Ref.Ref_oHavmKqImSGClTjv;
    links?: Sanity.Ref.Ref_1zIsRPHffySWMay1;
    marginBottom?: string;
  };
}
namespace Sanity.Ref {
  type Ref_mB93Z3XmQ2yR5eUb = {
    jsonLD?: Sanity.Ref.Ref_vTUNyfrXWupbzsP0;
    ogImage?: {
      asset: Sanity.Reference<{
        _type: "sanity.imageAsset";
        assetId: string;
        extension: string;
        metadata: {
          _type: "sanity.imageMetadata";
          dimensions: {
            _type: "sanity.imageDimensions";
            aspectRatio: number;
            height: number;
            width: number;
          };
          hasAlpha: boolean;
          isOpaque: boolean;
          lqip: string;
          palette: {
            _type: "sanity.imagePalette";
            darkMuted: {
              _type: "sanity.imagePaletteSwatch";
              background: string;
              foreground: string;
              population: number;
              title: string;
            };
            darkVibrant: {
              _type: "sanity.imagePaletteSwatch";
              background: string;
              foreground: string;
              population: number;
              title: string;
            };
            dominant: {
              _type: "sanity.imagePaletteSwatch";
              background: string;
              foreground: string;
              population: number;
              title: string;
            };
            lightMuted: {
              _type: "sanity.imagePaletteSwatch";
              background: string;
              foreground: string;
              population: number;
              title: string;
            };
            lightVibrant: {
              _type: "sanity.imagePaletteSwatch";
              background: string;
              foreground: string;
              population: number;
              title: string;
            };
            muted: {
              _type: "sanity.imagePaletteSwatch";
              background: string;
              foreground: string;
              population: number;
              title: string;
            };
            vibrant: {
              _type: "sanity.imagePaletteSwatch";
              background: string;
              foreground: string;
              population: number;
              title: string;
            };
          };
        };
        mimeType: string;
        originalFilename: string;
        path: string;
        sha1hash: string;
        size: number;
        uploadId: string;
        url: string;
      }>;
      crop?: {
        _type: "sanity.imageCrop";
        bottom: number;
        left: number;
        right: number;
        top: number;
      };
      hotspot?: {
        _type: "sanity.imageHotspot";
        height: number;
        width: number;
        x: number;
        y: number;
      };
    };
    pageDescription?: string;
    pageKeyWords?: string;
    pageTitle?: string;
  };
}
namespace Sanity.Ref {
  type Ref_mHpV7N2PpUZNbPHN = {
    aspectRatio?: number;
    height?: number;
    width?: number;
  };
}
namespace Sanity.Ref {
  type Ref_MTT7NER0UF8CCDK6 = string;
}
namespace Sanity.Ref {
  type Ref_O2nOkQMBqLCGHEmi = {
    gridLayout?: boolean;
    label?: string;
    rowItems?: (
      | Sanity.Ref.Ref_1zIsRPHffySWMay1
      | Sanity.Ref.Ref_oHavmKqImSGClTjv
      | Sanity.Ref.Ref_RfTjNKcmZhiuYgZl
      | Sanity.Ref.Ref_TD8dDaYTTm11gtl2
      | Sanity.Ref.Ref_XJmA7DZZKWXTYxE4
    )[];
  };
}
namespace Sanity.Ref {
  type Ref_o4wfqXyUo8260o8G = {
    darkMuted?: Sanity.Ref.Ref_iNRk8Y6FN98631Zz;
    darkVibrant?: Sanity.Ref.Ref_iNRk8Y6FN98631Zz;
    dominant?: Sanity.Ref.Ref_iNRk8Y6FN98631Zz;
    lightMuted?: Sanity.Ref.Ref_iNRk8Y6FN98631Zz;
    lightVibrant?: Sanity.Ref.Ref_iNRk8Y6FN98631Zz;
    muted?: Sanity.Ref.Ref_iNRk8Y6FN98631Zz;
    vibrant?: Sanity.Ref.Ref_iNRk8Y6FN98631Zz;
  };
}
namespace Sanity.Ref {
  type Ref_OaoHSSmnE99m18qI = {
    aspectRatio?: number;
    height?: number;
    width?: number;
  };
}
namespace Sanity.Ref {
  type Ref_oHavmKqImSGClTjv = {
    blocks?: {
      _key: string;
      _type: "block";
      children: {
        _key: string;
        _type: "span";
        marks?: unknown[];
        text?: string;
      }[];
      markDefs?: unknown[];
      style?: string;
    }[];
  };
}
namespace Sanity.Ref {
  type Ref_PeOyCUMGS9qy602P = {
    anchorId?: string;
    backgroundColour?: Sanity.Ref.Ref_Gxov8mb9fJ0hKMRX;
    contentBlocks?: (
      | Sanity.Ref.Ref_BkradyMSwqMdAii0
      | Sanity.Ref.Ref_EC1Db77RJTOFdNSX
      | Sanity.Ref.Ref_Hv9wPaf2Q2i4ExfH
      | Sanity.Ref.Ref_jklLx0dPykAsD5kl
      | Sanity.Ref.Ref_O2nOkQMBqLCGHEmi
      | Sanity.Ref.Ref_oHavmKqImSGClTjv
      | Sanity.Ref.Ref_TD8dDaYTTm11gtl2
      | Sanity.Ref.Ref_YvbnKpFmirkti9vz
      | Sanity.Ref.Ref_zjJpzD2kP4DaohxE
    )[];
    label?: string;
    marginBottom?: string;
    padding?: string;
  };
}
namespace Sanity.Ref {
  type Ref_PGoIO1vMc0rPyG6S = {
    description?: Sanity.Ref.Ref_CXxapymNuJd2zpOv;
    design?: string;
    image?: Sanity.Ref.Ref_1QTk0fHjkPyrgj59;
    link?: Sanity.Ref.Ref_bbqDv0jngz9pVaxh;
    title?: string;
  };
}
namespace Sanity.Ref {
  type Ref_RfTjNKcmZhiuYgZl = {
    description?: Sanity.Ref.Ref_oHavmKqImSGClTjv;
    design?: string;
    image?: Sanity.Ref.Ref_TD8dDaYTTm11gtl2;
    link?: Sanity.Ref.Ref_Y7G9SJTgkTlIhH7j;
    title?: string;
  };
}
namespace Sanity.Ref {
  type Ref_sxu4CnI8YCPTPjDM = {
    items?: (
      | Sanity.Ref.Ref_1zIsRPHffySWMay1
      | Sanity.Ref.Ref_oHavmKqImSGClTjv
      | Sanity.Ref.Ref_RfTjNKcmZhiuYgZl
      | Sanity.Ref.Ref_TD8dDaYTTm11gtl2
      | Sanity.Ref.Ref_XJmA7DZZKWXTYxE4
    )[];
    label?: string;
  };
}
namespace Sanity.Ref {
  type Ref_TD8dDaYTTm11gtl2 = {
    altText?: string;
    asset: Sanity.Reference<{
      _type: "sanity.imageAsset";
      assetId: string;
      extension: string;
      metadata: {
        _type: "sanity.imageMetadata";
        dimensions: {
          _type: "sanity.imageDimensions";
          aspectRatio: number;
          height: number;
          width: number;
        };
        hasAlpha: boolean;
        isOpaque: boolean;
        lqip: string;
        palette: {
          _type: "sanity.imagePalette";
          darkMuted: {
            _type: "sanity.imagePaletteSwatch";
            background: string;
            foreground: string;
            population: number;
            title: string;
          };
          darkVibrant: {
            _type: "sanity.imagePaletteSwatch";
            background: string;
            foreground: string;
            population: number;
            title: string;
          };
          dominant: {
            _type: "sanity.imagePaletteSwatch";
            background: string;
            foreground: string;
            population: number;
            title: string;
          };
          lightMuted: {
            _type: "sanity.imagePaletteSwatch";
            background: string;
            foreground: string;
            population: number;
            title: string;
          };
          lightVibrant: {
            _type: "sanity.imagePaletteSwatch";
            background: string;
            foreground: string;
            population: number;
            title: string;
          };
          muted: {
            _type: "sanity.imagePaletteSwatch";
            background: string;
            foreground: string;
            population: number;
            title: string;
          };
          vibrant: {
            _type: "sanity.imagePaletteSwatch";
            background: string;
            foreground: string;
            population: number;
            title: string;
          };
        };
      };
      mimeType: string;
      originalFilename: string;
      path: string;
      sha1hash: string;
      size: number;
      uploadId: string;
      url: string;
    }>;
    crop?: {
      _type: "sanity.imageCrop";
      bottom: number;
      left: number;
      right: number;
      top: number;
    };
    hotspot?: {
      _type: "sanity.imageHotspot";
      height: number;
      width: number;
      x: number;
      y: number;
    };
    objectFit?: string;
    padding?: string;
  };
}
namespace Sanity.Ref {
  type Ref_uAf8wPCG9D8XtceA = {
    imagePreview?: Sanity.Ref.Ref_1QTk0fHjkPyrgj59;
    title?: string;
    vimeoVideoId?: string;
    youtubeId?: string;
  };
}
namespace Sanity.Ref {
  type Ref_uN3QDkpQq1Piv8he = {
    firstColumn?: (
      | Sanity.Ref.Ref_1QTk0fHjkPyrgj59
      | Sanity.Ref.Ref_5v9351v44HAcww4K
      | Sanity.Ref.Ref_CXxapymNuJd2zpOv
      | Sanity.Ref.Ref_PGoIO1vMc0rPyG6S
      | Sanity.Ref.Ref_ZX6jqLQZPPU6TBzN
    )[];
    flipColumns?: boolean;
    label?: string;
    secondColumn?: (
      | Sanity.Ref.Ref_1QTk0fHjkPyrgj59
      | Sanity.Ref.Ref_5v9351v44HAcww4K
      | Sanity.Ref.Ref_CXxapymNuJd2zpOv
      | Sanity.Ref.Ref_PGoIO1vMc0rPyG6S
      | Sanity.Ref.Ref_ZX6jqLQZPPU6TBzN
    )[];
  };
}
namespace Sanity.Ref {
  type Ref_vTUNyfrXWupbzsP0 = {
    code?: string;
    filename?: string;
    highlightedLines?: number[];
    language?: string;
  };
}
namespace Sanity.Ref {
  type Ref_WUQcbf4zA2CnpuZs = {
    id?: string;
    name?: string;
    url?: string;
  };
}
namespace Sanity.Ref {
  type Ref_xCcf18NIlN5mFODq = {
    gridLayout?: boolean;
    label?: string;
    rowItems?: (
      | Sanity.Ref.Ref_1QTk0fHjkPyrgj59
      | Sanity.Ref.Ref_5v9351v44HAcww4K
      | Sanity.Ref.Ref_CXxapymNuJd2zpOv
      | Sanity.Ref.Ref_PGoIO1vMc0rPyG6S
      | Sanity.Ref.Ref_ZX6jqLQZPPU6TBzN
    )[];
  };
}
namespace Sanity.Ref {
  type Ref_Xcom95QCKBZVWKt6 = {
    imagePreview?: Sanity.Ref.Ref_TD8dDaYTTm11gtl2;
    title?: string;
    vimeoVideoId?: string;
    youtubeId?: string;
  };
}
namespace Sanity.Ref {
  type Ref_XJmA7DZZKWXTYxE4 = {
    content?: Sanity.Ref.Ref_oHavmKqImSGClTjv;
    title?: string;
  };
}
namespace Sanity.Ref {
  type Ref_Y7G9SJTgkTlIhH7j = {
    anchorId?: string;
    externalLink?: string;
    internalLink?: Sanity.Reference<
      Sanity.Ref.Ref_2N6IYckNHBaLs1x7 | Sanity.Ref.Ref_7R4jwehVmOM7TuqY
    >;
    linkText?: string;
  };
}
namespace Sanity.Ref {
  type Ref_YvbnKpFmirkti9vz = {
    label?: string;
    links?: Sanity.Ref.Ref_1zIsRPHffySWMay1;
    media?: (
      | Sanity.Ref.Ref_TD8dDaYTTm11gtl2
      | Sanity.Ref.Ref_Xcom95QCKBZVWKt6
    )[];
    text?: Sanity.Ref.Ref_oHavmKqImSGClTjv;
    title?: string;
  };
}
namespace Sanity.Ref {
  type Ref_yZvhfaSiR6y9CvF1 = {
    icon?: Sanity.Ref.Ref_9g23XVVJAG25Ul8K;
    url?: string;
  };
}
namespace Sanity.Ref {
  type Ref_zjJpzD2kP4DaohxE = {
    title?: string;
  };
}
namespace Sanity.Ref {
  type Ref_zUeNNqcrZob4cMcd = {
    items?: (
      | Sanity.Ref.Ref_1QTk0fHjkPyrgj59
      | Sanity.Ref.Ref_5v9351v44HAcww4K
      | Sanity.Ref.Ref_CXxapymNuJd2zpOv
      | Sanity.Ref.Ref_PGoIO1vMc0rPyG6S
      | Sanity.Ref.Ref_ZX6jqLQZPPU6TBzN
    )[];
    label?: string;
  };
}
namespace Sanity.Ref {
  type Ref_zuoFHQlaUhJETspw = {
    blurHash?: string;
    dimensions?: Sanity.Ref.Ref_OaoHSSmnE99m18qI;
    hasAlpha?: boolean;
    isOpaque?: boolean;
    location?: {
      _type: "geopoint";
      alt: number;
      lat: number;
      lng: number;
    };
    lqip?: string;
    palette?: Sanity.Ref.Ref_dtSHhmAsUPjHCn7f;
  };
}
namespace Sanity.Ref {
  type Ref_ZX6jqLQZPPU6TBzN = {
    content?: Sanity.Ref.Ref_CXxapymNuJd2zpOv;
    title?: string;
  };
}
namespace Sanity.Ref {
  type Ref_ZXNR7Q9xgCKQ68Lw = {
    icon?: Sanity.Ref.Ref_5haUkKobMB8m1QdJ;
    url?: string;
  };
}
