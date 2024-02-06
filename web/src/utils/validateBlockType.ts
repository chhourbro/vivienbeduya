function assertType<T>(type: string) {
  return (data: any): data is T => data?._type === type;
}

const validateBlockType = {
  isImageWithMeta: assertType<SanityImageWithMeta>("imageWithMeta"),
  isBlockContent: assertType<SanityBlockContent>("blockContent"),
  isCarousel: assertType<Sanity.Production.Schema.Carousel>("carousel"),
  isSlide: assertType<Sanity.Production.Schema.Slide>("slide"),
  isLink: assertType<Sanity.Production.Schema.Link>("link"),
  isLinkGroup: assertType<Sanity.Production.Schema.LinkGroup>("linkGroup")
};

export default validateBlockType;
