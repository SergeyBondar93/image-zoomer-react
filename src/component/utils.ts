export const getImage = async ({ url, httpClient = fetch }: any) => {
  const request = await httpClient(url);
  const blob = await request.blob();

  const reader = new FileReader();

  const image = await new Promise((res) => {
    reader.onload = function (e) {
      const src = String(e.target?.result);
      res(src);
    };
    reader.readAsDataURL(blob);
  });
  return image as string;
};

export const getOriginalImageTransform = ({
  offsetX,
  offsetY,
  width,
  height,
  originalImageWidth,
  originalImageHeight,
  popoverWidth,
  popoverHeight,
}: any) => {
  const fromLeft = offsetX / width;
  const fromTop = offsetY / height;
  const percentLeft = Math.ceil(fromLeft * 100);
  const percentTop = Math.ceil(fromTop * 100);
  const offsetOriginalmageLeft = fromLeft * originalImageWidth;
  const offsetOriginalmageTop = fromTop * originalImageHeight;

  const halfPopoverWidth = popoverWidth / 2;
  const halfPopoverHeight = popoverHeight / 2;

  const originalWidthWithoutHalfPopover = originalImageWidth - halfPopoverWidth;
  const originalHeightWithoutHalfPopover =
    originalImageHeight - halfPopoverHeight;

  const offsetLeft =
    offsetOriginalmageLeft < halfPopoverWidth
      ? offsetOriginalmageLeft
      : offsetOriginalmageLeft > originalWidthWithoutHalfPopover
      ? halfPopoverWidth +
        -(originalWidthWithoutHalfPopover - offsetOriginalmageLeft)
      : halfPopoverWidth;

  const offsetTop =
    offsetOriginalmageTop < halfPopoverHeight
      ? offsetOriginalmageTop
      : offsetOriginalmageTop > originalHeightWithoutHalfPopover
      ? halfPopoverHeight +
        -(originalHeightWithoutHalfPopover - offsetOriginalmageTop)
      : halfPopoverHeight;

  const offsetXforCalc = `-${percentLeft}% + ${offsetLeft}px`;
  const offsetYforCalc = `-${percentTop}% + ${offsetTop}px`;
  return `translateX(calc(${offsetXforCalc})) translateY(calc(${offsetYforCalc}))`;
};
