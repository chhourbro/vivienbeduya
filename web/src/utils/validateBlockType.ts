function assertType<T>(type: string) {
  return (data: any): data is T => data?._type === type;
}

const validateBlockType = {
  isImageWithMeta: assertType<SanityImageWithMeta>("imageWithMeta"),
  isBlockContent: assertType<SanityBlockContent>("blockContent"),
  isCarousel: assertType<Sanity.Production.Schema.Carousel>("carousel"),
  isSlide: assertType<Sanity.Production.Schema.Slide>("slide")
};

export default validateBlockType;
