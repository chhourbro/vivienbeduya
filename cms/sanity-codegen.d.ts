/// <reference types="@sanity-codegen/types" />

namespace Sanity.Production.Client {
  type Config = {};
}
namespace Sanity.Production.Schema {
  type Accordion =
    | {
        content?: Sanity.Ref.Ref_FQ8A5FOOIlYBnj1z;
        title?: string;
      }
    | undefined;
}
namespace Sanity.Production.Schema {
  type AllBlogs =
    | {
        title?: string;
      }
    | undefined;
}
namespace Sanity.Production.Schema {
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
namespace Sanity.Production.Schema {
  type Blog =
    | {
        _id: string;
        _type: "blog";
        categories?: Sanity.Reference<Sanity.Ref.Ref_h9pOzOgyWX1mOcwr>[];
        contentBlocks?: (
          | Sanity.Ref.Ref_5logxgRqlOhsVOfY
          | Sanity.Ref.Ref_FQ8A5FOOIlYBnj1z
          | Sanity.Ref.Ref_qCapuUfsPtQ0qkxP
          | Sanity.Reference<Sanity.Ref.Ref_KzyhJ1Saofa5pTyg>
          | Sanity.Ref.Ref_WhS56LT3cAErfCjA
          | Sanity.Ref.Ref_wqw7YtPmr6Mlgsvm
        )[];
        publishDate?: string;
        seo?: Sanity.Ref.Ref_Y1whP9eBWZkF0mku;
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
  type BlogCategory =
    | {
        _id: string;
        _type: "blogCategory";
        categoryId?: {
          _type: "slug";
          current?: string;
          source?: string;
        };
        image?: Sanity.Ref.Ref_qCapuUfsPtQ0qkxP;
        title?: string;
      }
    | undefined;
}
namespace Sanity.Production.Schema {
  type Carousel =
    | {
        autoplay?: boolean;
        image?: Sanity.Ref.Ref_qCapuUfsPtQ0qkxP;
        label?: string;
        slides?: Sanity.Ref.Ref_2paAjHHSJKegxQGc[];
      }
    | undefined;
}
namespace Sanity.Production.Schema {
  type Code =
    | {
        code?: string;
        filename?: string;
        highlightedLines?: number[];
        language?: string;
      }
    | undefined;
}
namespace Sanity.Production.Schema {
  type Color = string | undefined;
}
namespace Sanity.Production.Schema {
  type ColumnContent =
    | {
        firstColumn?: (
          | Sanity.Ref.Ref_5logxgRqlOhsVOfY
          | Sanity.Ref.Ref_FQ8A5FOOIlYBnj1z
          | Sanity.Ref.Ref_qCapuUfsPtQ0qkxP
          | Sanity.Ref.Ref_WhS56LT3cAErfCjA
          | Sanity.Ref.Ref_wqw7YtPmr6Mlgsvm
        )[];
        flipColumns?: boolean;
        label?: string;
        secondColumn?: (
          | Sanity.Ref.Ref_5logxgRqlOhsVOfY
          | Sanity.Ref.Ref_FQ8A5FOOIlYBnj1z
          | Sanity.Ref.Ref_qCapuUfsPtQ0qkxP
          | Sanity.Ref.Ref_WhS56LT3cAErfCjA
          | Sanity.Ref.Ref_wqw7YtPmr6Mlgsvm
        )[];
      }
    | undefined;
}
namespace Sanity.Production.Schema {
  type Cta =
    | {
        description?: Sanity.Ref.Ref_FQ8A5FOOIlYBnj1z;
        design?: string;
        image?: Sanity.Ref.Ref_qCapuUfsPtQ0qkxP;
        link?: Sanity.Ref.Ref_LIdO8XeWVTZqDmJ6;
        title?: string;
      }
    | undefined;
}
namespace Sanity.Production.Schema {
  type Footer =
    | {
        _id: string;
        _type: "footer";
        fields?: string;
      }
    | undefined;
}
namespace Sanity.Production.Schema {
  type Geopoint =
    | {
        alt?: number;
        lat?: number;
        lng?: number;
      }
    | undefined;
}
namespace Sanity.Production.Schema {
  type Header =
    | {
        _id: string;
        _type: "header";
        links?: (
          | Sanity.Ref.Ref_LIdO8XeWVTZqDmJ6
          | Sanity.Ref.Ref_uxMpNY1F9Pl1CpLJ
        )[];
        logo?: Sanity.Ref.Ref_qCapuUfsPtQ0qkxP;
        title?: string;
      }
    | undefined;
}
namespace Sanity.Production.Schema {
  type Hero =
    | {
        backgroundImage?: Sanity.Ref.Ref_qCapuUfsPtQ0qkxP[];
        heroContent?: Sanity.Ref.Ref_FQ8A5FOOIlYBnj1z;
        links?: Sanity.Ref.Ref_5logxgRqlOhsVOfY;
        marginBottom?: string;
      }
    | undefined;
}
namespace Sanity.Production.Schema {
  type IconPicker =
    | {
        name?: string;
        provider?: string;
        svg?: string;
      }
    | undefined;
}
namespace Sanity.Production.Schema {
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
namespace Sanity.Production.Schema {
  type LatestBlogs =
    | {
        allBlogsLink?: Sanity.Ref.Ref_LIdO8XeWVTZqDmJ6;
        categories?: Sanity.Reference<Sanity.Ref.Ref_h9pOzOgyWX1mOcwr>[];
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
          Sanity.Ref.Ref_bOKUlP2teEWnYRpd | Sanity.Ref.Ref_jjfmsclK9G5mb6lR
        >;
        linkText?: string;
      }
    | undefined;
}
namespace Sanity.Production.Schema {
  type LinkGroup =
    | {
        items?: Sanity.Ref.Ref_LIdO8XeWVTZqDmJ6[];
        title?: string;
      }
    | undefined;
}
namespace Sanity.Production.Schema {
  type Links =
    | {
        items?: Sanity.Ref.Ref_LIdO8XeWVTZqDmJ6[];
        label?: string;
      }
    | undefined;
}
namespace Sanity.Production.Schema {
  type MediaBgContent =
    | {
        label?: string;
        links?: Sanity.Ref.Ref_5logxgRqlOhsVOfY;
        media?: (
          | Sanity.Ref.Ref_cM8i2eqgdPTjzR3p
          | Sanity.Ref.Ref_qCapuUfsPtQ0qkxP
        )[];
        text?: Sanity.Ref.Ref_FQ8A5FOOIlYBnj1z;
        title?: string;
      }
    | undefined;
}
namespace Sanity.Production.Schema {
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
namespace Sanity.Production.Schema {
  type Page =
    | {
        _id: string;
        _type: "page";
        sections?: (
          | Sanity.Ref.Ref_j0RxXmqY5FiNZ28b
          | Sanity.Reference<Sanity.Ref.Ref_KzyhJ1Saofa5pTyg>
        )[];
        seo?: Sanity.Ref.Ref_Y1whP9eBWZkF0mku;
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
        section?: Sanity.Ref.Ref_j0RxXmqY5FiNZ28b;
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
          | Sanity.Ref.Ref_5logxgRqlOhsVOfY
          | Sanity.Ref.Ref_FQ8A5FOOIlYBnj1z
          | Sanity.Ref.Ref_qCapuUfsPtQ0qkxP
          | Sanity.Ref.Ref_WhS56LT3cAErfCjA
          | Sanity.Ref.Ref_wqw7YtPmr6Mlgsvm
        )[];
      }
    | undefined;
}
namespace Sanity.Production.Schema {
  type SanityAssetSourceData =
    | {
        id?: string;
        name?: string;
        url?: string;
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
        source?: Sanity.Ref.Ref_rOdUdC5SxSSNymNS;
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
        metadata?: Sanity.Ref.Ref_oCyYRiuMn5lTSoP2;
        mimeType?: string;
        originalFilename?: string;
        path?: string;
        sha1hash?: string;
        size?: number;
        source?: Sanity.Ref.Ref_rOdUdC5SxSSNymNS;
        title?: string;
        uploadId?: string;
        url?: string;
      }
    | undefined;
}
namespace Sanity.Production.Schema {
  type SanityImageCrop =
    | {
        bottom?: number;
        left?: number;
        right?: number;
        top?: number;
      }
    | undefined;
}
namespace Sanity.Production.Schema {
  type SanityImageDimensions =
    | {
        aspectRatio?: number;
        height?: number;
        width?: number;
      }
    | undefined;
}
namespace Sanity.Production.Schema {
  type SanityImageHotspot =
    | {
        height?: number;
        width?: number;
        x?: number;
        y?: number;
      }
    | undefined;
}
namespace Sanity.Production.Schema {
  type SanityImageMetadata =
    | {
        blurHash?: string;
        dimensions?: Sanity.Ref.Ref_pFQ3muZBHjOm3VkY;
        hasAlpha?: boolean;
        isOpaque?: boolean;
        location?: {
          _type: "geopoint";
          alt: number;
          lat: number;
          lng: number;
        };
        lqip?: string;
        palette?: Sanity.Ref.Ref_ke0Ye2cyfxZeHTja;
      }
    | undefined;
}
namespace Sanity.Production.Schema {
  type SanityImagePalette =
    | {
        darkMuted?: Sanity.Ref.Ref_VnETMVjb8Hto1KAb;
        darkVibrant?: Sanity.Ref.Ref_VnETMVjb8Hto1KAb;
        dominant?: Sanity.Ref.Ref_VnETMVjb8Hto1KAb;
        lightMuted?: Sanity.Ref.Ref_VnETMVjb8Hto1KAb;
        lightVibrant?: Sanity.Ref.Ref_VnETMVjb8Hto1KAb;
        muted?: Sanity.Ref.Ref_VnETMVjb8Hto1KAb;
        vibrant?: Sanity.Ref.Ref_VnETMVjb8Hto1KAb;
      }
    | undefined;
}
namespace Sanity.Production.Schema {
  type SanityImagePaletteSwatch =
    | {
        background?: string;
        foreground?: string;
        population?: number;
        title?: string;
      }
    | undefined;
}
namespace Sanity.Production.Schema {
  type Section =
    | {
        anchorId?: string;
        backgroundColour?: Sanity.Ref.Ref_TmdeQyNAdZlgbGYh;
        contentBlocks?: (
          | Sanity.Ref.Ref_AcWrfY4qoX6s0DsS
          | Sanity.Ref.Ref_crXVbAa2Z2FLEiTq
          | Sanity.Ref.Ref_DnNetd2DSUJwoGt3
          | Sanity.Ref.Ref_FQ8A5FOOIlYBnj1z
          | Sanity.Ref.Ref_gD2l5OoaGhll9Wi0
          | Sanity.Ref.Ref_NELyDWY1cNZ3hY8Z
          | Sanity.Ref.Ref_ob6VYWgOS3tMBys8
          | Sanity.Ref.Ref_qCapuUfsPtQ0qkxP
          | Sanity.Ref.Ref_yYbIQ8FTbh8ESTXE
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
        jsonLD?: Sanity.Ref.Ref_oXDZC2RAeEPjPjcQ;
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
        defaultSEO?: Sanity.Ref.Ref_Y1whP9eBWZkF0mku;
        socials?: Sanity.Ref.Ref_ELQf8xuMLk6Bo8Uz[];
        title?: string;
      }
    | undefined;
}
namespace Sanity.Production.Schema {
  type Slide =
    | {
        items?: (
          | Sanity.Ref.Ref_5logxgRqlOhsVOfY
          | Sanity.Ref.Ref_FQ8A5FOOIlYBnj1z
          | Sanity.Ref.Ref_qCapuUfsPtQ0qkxP
          | Sanity.Ref.Ref_WhS56LT3cAErfCjA
          | Sanity.Ref.Ref_wqw7YtPmr6Mlgsvm
        )[];
        label?: string;
      }
    | undefined;
}
namespace Sanity.Production.Schema {
  type Slug =
    | {
        current?: string;
        source?: string;
      }
    | undefined;
}
namespace Sanity.Production.Schema {
  type SocialLink =
    | {
        icon?: Sanity.Ref.Ref_8XhMCkNHBBWxfHqh;
        url?: string;
      }
    | undefined;
}
namespace Sanity.Production.Schema {
  type Video =
    | {
        imagePreview?: Sanity.Ref.Ref_qCapuUfsPtQ0qkxP;
        title?: string;
        vimeoVideoId?: string;
        youtubeId?: string;
      }
    | undefined;
}
namespace Sanity.Ref {
  type Ref_2paAjHHSJKegxQGc = {
    items?: (
      | Sanity.Ref.Ref_5logxgRqlOhsVOfY
      | Sanity.Ref.Ref_FQ8A5FOOIlYBnj1z
      | Sanity.Ref.Ref_qCapuUfsPtQ0qkxP
      | Sanity.Ref.Ref_WhS56LT3cAErfCjA
      | Sanity.Ref.Ref_wqw7YtPmr6Mlgsvm
    )[];
    label?: string;
  };
}
namespace Sanity.Ref {
  type Ref_5logxgRqlOhsVOfY = {
    items?: Sanity.Ref.Ref_LIdO8XeWVTZqDmJ6[];
    label?: string;
  };
}
namespace Sanity.Ref {
  type Ref_8XhMCkNHBBWxfHqh = {
    name?: string;
    provider?: string;
    svg?: string;
  };
}
namespace Sanity.Ref {
  type Ref_AcWrfY4qoX6s0DsS = {
    allBlogsLink?: Sanity.Ref.Ref_LIdO8XeWVTZqDmJ6;
    categories?: Sanity.Reference<Sanity.Ref.Ref_h9pOzOgyWX1mOcwr>[];
    label?: string;
  };
}
namespace Sanity.Ref {
  type Ref_bOKUlP2teEWnYRpd =
    | {
        _id: string;
        _type: "page";
        sections?: (
          | Sanity.Ref.Ref_j0RxXmqY5FiNZ28b
          | Sanity.Reference<Sanity.Ref.Ref_KzyhJ1Saofa5pTyg>
        )[];
        seo?: Sanity.Ref.Ref_Y1whP9eBWZkF0mku;
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
  type Ref_cM8i2eqgdPTjzR3p = {
    imagePreview?: Sanity.Ref.Ref_qCapuUfsPtQ0qkxP;
    title?: string;
    vimeoVideoId?: string;
    youtubeId?: string;
  };
}
namespace Sanity.Ref {
  type Ref_crXVbAa2Z2FLEiTq = {
    label?: string;
    links?: Sanity.Ref.Ref_5logxgRqlOhsVOfY;
    media?: (
      | Sanity.Ref.Ref_cM8i2eqgdPTjzR3p
      | Sanity.Ref.Ref_qCapuUfsPtQ0qkxP
    )[];
    text?: Sanity.Ref.Ref_FQ8A5FOOIlYBnj1z;
    title?: string;
  };
}
namespace Sanity.Ref {
  type Ref_DnNetd2DSUJwoGt3 = {
    backgroundImage?: Sanity.Ref.Ref_qCapuUfsPtQ0qkxP[];
    heroContent?: Sanity.Ref.Ref_FQ8A5FOOIlYBnj1z;
    links?: Sanity.Ref.Ref_5logxgRqlOhsVOfY;
    marginBottom?: string;
  };
}
namespace Sanity.Ref {
  type Ref_ELQf8xuMLk6Bo8Uz = {
    icon?: Sanity.Ref.Ref_8XhMCkNHBBWxfHqh;
    url?: string;
  };
}
namespace Sanity.Ref {
  type Ref_FQ8A5FOOIlYBnj1z = {
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
  type Ref_gD2l5OoaGhll9Wi0 = {
    autoplay?: boolean;
    image?: Sanity.Ref.Ref_qCapuUfsPtQ0qkxP;
    label?: string;
    slides?: Sanity.Ref.Ref_2paAjHHSJKegxQGc[];
  };
}
namespace Sanity.Ref {
  type Ref_h9pOzOgyWX1mOcwr =
    | {
        _id: string;
        _type: "blogCategory";
        categoryId?: {
          _type: "slug";
          current?: string;
          source?: string;
        };
        image?: Sanity.Ref.Ref_qCapuUfsPtQ0qkxP;
        title?: string;
      }
    | undefined;
}
namespace Sanity.Ref {
  type Ref_j0RxXmqY5FiNZ28b = {
    anchorId?: string;
    backgroundColour?: Sanity.Ref.Ref_TmdeQyNAdZlgbGYh;
    contentBlocks?: (
      | Sanity.Ref.Ref_AcWrfY4qoX6s0DsS
      | Sanity.Ref.Ref_crXVbAa2Z2FLEiTq
      | Sanity.Ref.Ref_DnNetd2DSUJwoGt3
      | Sanity.Ref.Ref_FQ8A5FOOIlYBnj1z
      | Sanity.Ref.Ref_gD2l5OoaGhll9Wi0
      | Sanity.Ref.Ref_NELyDWY1cNZ3hY8Z
      | Sanity.Ref.Ref_ob6VYWgOS3tMBys8
      | Sanity.Ref.Ref_qCapuUfsPtQ0qkxP
      | Sanity.Ref.Ref_yYbIQ8FTbh8ESTXE
    )[];
    label?: string;
    marginBottom?: string;
    padding?: string;
  };
}
namespace Sanity.Ref {
  type Ref_jjfmsclK9G5mb6lR =
    | {
        _id: string;
        _type: "blog";
        categories?: Sanity.Reference<Sanity.Ref.Ref_h9pOzOgyWX1mOcwr>[];
        contentBlocks?: (
          | Sanity.Ref.Ref_5logxgRqlOhsVOfY
          | Sanity.Ref.Ref_FQ8A5FOOIlYBnj1z
          | Sanity.Ref.Ref_qCapuUfsPtQ0qkxP
          | Sanity.Reference<Sanity.Ref.Ref_KzyhJ1Saofa5pTyg>
          | Sanity.Ref.Ref_WhS56LT3cAErfCjA
          | Sanity.Ref.Ref_wqw7YtPmr6Mlgsvm
        )[];
        publishDate?: string;
        seo?: Sanity.Ref.Ref_Y1whP9eBWZkF0mku;
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
  type Ref_ke0Ye2cyfxZeHTja = {
    darkMuted?: Sanity.Ref.Ref_VnETMVjb8Hto1KAb;
    darkVibrant?: Sanity.Ref.Ref_VnETMVjb8Hto1KAb;
    dominant?: Sanity.Ref.Ref_VnETMVjb8Hto1KAb;
    lightMuted?: Sanity.Ref.Ref_VnETMVjb8Hto1KAb;
    lightVibrant?: Sanity.Ref.Ref_VnETMVjb8Hto1KAb;
    muted?: Sanity.Ref.Ref_VnETMVjb8Hto1KAb;
    vibrant?: Sanity.Ref.Ref_VnETMVjb8Hto1KAb;
  };
}
namespace Sanity.Ref {
  type Ref_KzyhJ1Saofa5pTyg =
    | {
        _id: string;
        _type: "reusableSection";
        section?: Sanity.Ref.Ref_j0RxXmqY5FiNZ28b;
        title?: string;
      }
    | undefined;
}
namespace Sanity.Ref {
  type Ref_LIdO8XeWVTZqDmJ6 = {
    anchorId?: string;
    externalLink?: string;
    internalLink?: Sanity.Reference<
      Sanity.Ref.Ref_bOKUlP2teEWnYRpd | Sanity.Ref.Ref_jjfmsclK9G5mb6lR
    >;
    linkText?: string;
  };
}
namespace Sanity.Ref {
  type Ref_NELyDWY1cNZ3hY8Z = {
    gridLayout?: boolean;
    label?: string;
    rowItems?: (
      | Sanity.Ref.Ref_5logxgRqlOhsVOfY
      | Sanity.Ref.Ref_FQ8A5FOOIlYBnj1z
      | Sanity.Ref.Ref_qCapuUfsPtQ0qkxP
      | Sanity.Ref.Ref_WhS56LT3cAErfCjA
      | Sanity.Ref.Ref_wqw7YtPmr6Mlgsvm
    )[];
  };
}
namespace Sanity.Ref {
  type Ref_ob6VYWgOS3tMBys8 = {
    title?: string;
  };
}
namespace Sanity.Ref {
  type Ref_oCyYRiuMn5lTSoP2 = {
    blurHash?: string;
    dimensions?: Sanity.Ref.Ref_pFQ3muZBHjOm3VkY;
    hasAlpha?: boolean;
    isOpaque?: boolean;
    location?: {
      _type: "geopoint";
      alt: number;
      lat: number;
      lng: number;
    };
    lqip?: string;
    palette?: Sanity.Ref.Ref_ke0Ye2cyfxZeHTja;
  };
}
namespace Sanity.Ref {
  type Ref_oXDZC2RAeEPjPjcQ = {
    code?: string;
    filename?: string;
    highlightedLines?: number[];
    language?: string;
  };
}
namespace Sanity.Ref {
  type Ref_pFQ3muZBHjOm3VkY = {
    aspectRatio?: number;
    height?: number;
    width?: number;
  };
}
namespace Sanity.Ref {
  type Ref_qCapuUfsPtQ0qkxP = {
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
  type Ref_rOdUdC5SxSSNymNS = {
    id?: string;
    name?: string;
    url?: string;
  };
}
namespace Sanity.Ref {
  type Ref_TmdeQyNAdZlgbGYh = string;
}
namespace Sanity.Ref {
  type Ref_uxMpNY1F9Pl1CpLJ = {
    items?: Sanity.Ref.Ref_LIdO8XeWVTZqDmJ6[];
    title?: string;
  };
}
namespace Sanity.Ref {
  type Ref_VnETMVjb8Hto1KAb = {
    background?: string;
    foreground?: string;
    population?: number;
    title?: string;
  };
}
namespace Sanity.Ref {
  type Ref_WhS56LT3cAErfCjA = {
    description?: Sanity.Ref.Ref_FQ8A5FOOIlYBnj1z;
    design?: string;
    image?: Sanity.Ref.Ref_qCapuUfsPtQ0qkxP;
    link?: Sanity.Ref.Ref_LIdO8XeWVTZqDmJ6;
    title?: string;
  };
}
namespace Sanity.Ref {
  type Ref_wqw7YtPmr6Mlgsvm = {
    content?: Sanity.Ref.Ref_FQ8A5FOOIlYBnj1z;
    title?: string;
  };
}
namespace Sanity.Ref {
  type Ref_Y1whP9eBWZkF0mku = {
    jsonLD?: Sanity.Ref.Ref_oXDZC2RAeEPjPjcQ;
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
  type Ref_yYbIQ8FTbh8ESTXE = {
    firstColumn?: (
      | Sanity.Ref.Ref_5logxgRqlOhsVOfY
      | Sanity.Ref.Ref_FQ8A5FOOIlYBnj1z
      | Sanity.Ref.Ref_qCapuUfsPtQ0qkxP
      | Sanity.Ref.Ref_WhS56LT3cAErfCjA
      | Sanity.Ref.Ref_wqw7YtPmr6Mlgsvm
    )[];
    flipColumns?: boolean;
    label?: string;
    secondColumn?: (
      | Sanity.Ref.Ref_5logxgRqlOhsVOfY
      | Sanity.Ref.Ref_FQ8A5FOOIlYBnj1z
      | Sanity.Ref.Ref_qCapuUfsPtQ0qkxP
      | Sanity.Ref.Ref_WhS56LT3cAErfCjA
      | Sanity.Ref.Ref_wqw7YtPmr6Mlgsvm
    )[];
  };
}
