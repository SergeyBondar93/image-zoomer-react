import { useCallback, useEffect, useRef, useState } from "react";
import { Popover } from "./Popover";
import { PreviewImage, SizeElem } from "./styled";
import { HttpClientType } from "./types";
import { getImage, getOriginalImageTransform } from "./utils";

interface IImageZoomerProps {
  previewImageUrl?: string;
  originalImageUrl: string;
  popoverWidth?: number;
  httpClient?: HttpClientType;
}

const CHANGE_PER_SCROLL = 0.15;

export const ImageZoomer = ({
  originalImageUrl,
  previewImageUrl = originalImageUrl,
  popoverWidth = 400,
  httpClient = fetch,
}: IImageZoomerProps) => {
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [size, setSize] = useState(1);
  const [error, setError] = useState("");
  const [isEntered, setIsEntered] = useState(false);
  const needForRafRef = useRef(true);
  const popoverRef = useRef<HTMLDivElement>(null);
  const originalImageRef = useRef<HTMLImageElement>(null);
  const previewImageRef = useRef<HTMLImageElement>(null);
  const sizeElemRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const source = await getImage(originalImageUrl, httpClient);
        setImage(source);
        setError("");
      } catch (error) {
        setError("Invalid image or url not found =(");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [originalImageUrl]);

  const updatePopover = useCallback(
    (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
      needForRafRef.current = true;
      const popover = popoverRef.current!;
      const {
        nativeEvent: { offsetX, offsetY },
        target,
        clientY,
        clientX,
      } = e;
      const { width, height } = (
        target as HTMLImageElement
      ).getBoundingClientRect();
      const { height: popoverHeight } = popover.getBoundingClientRect();
      const originalImage = originalImageRef.current!;

      const { width: originalImageWidth, height: originalImageHeight } =
        originalImage.getBoundingClientRect();

      originalImage.style.transform = getOriginalImageTransform({
        offsetX,
        offsetY,
        width,
        height,
        originalImageWidth,
        originalImageHeight,
        popoverWidth,
        popoverHeight,
      });
      popover.style.top = clientY + 20 + "px";
      popover.style.left = clientX - popoverWidth / 2 + "px";
    },
    []
  );

  const onMouseMove: React.MouseEventHandler<HTMLImageElement> = useCallback(
    (e) => {
      if (needForRafRef.current) {
        needForRafRef.current = false;
        requestAnimationFrame(() => updatePopover(e));
      }
    },
    [updatePopover]
  );

  const onMouseEnter = useCallback(() => {
    setIsEntered(true);
    const sizeElem = sizeElemRef.current!;
    sizeElem.innerText = (size * 100).toFixed() + "%";
  }, [size]);

  const onMouseLeave = () => {
    setIsEntered(false);
    setSize(1);
  };

  const onWheel: React.WheelEventHandler<HTMLImageElement> = useCallback(
    (e) => {
      const root = previewImageRef.current!;
      const changes =
        e.deltaY < 0 ? 1 + CHANGE_PER_SCROLL : 1 - CHANGE_PER_SCROLL;

      const { width: currentImageWidth } =
        originalImageRef.current!.getBoundingClientRect();
      const { width: popoverWidth } =
        popoverRef.current!.getBoundingClientRect();
      const newWidth = currentImageWidth * changes;

      if (
        newWidth < root.getBoundingClientRect().width * 1.1 ||
        newWidth < popoverWidth
      )
        return;

      setSize(size * changes);
      const sizeElem = sizeElemRef.current!;
      sizeElem.innerText = (size * 100).toFixed() + "%";
      originalImageRef.current!.style.width = newWidth + "px";

      requestAnimationFrame(() => onMouseMove(e));
    },
    [size, onMouseMove]
  );

  if (isLoading) return <p>Loading...</p>;

  if (error)
    return (
      <p
        style={{
          color: "red",
        }}
      >
        Error when getting image =({" "}
      </p>
    );

  return (
    <div>
      <Popover
        visible={isEntered}
        ref={popoverRef}
        content={
          <>
            <SizeElem ref={sizeElemRef} />
            <img src={image} ref={originalImageRef} />
          </>
        }
        popoverWidth={popoverWidth}
      />
      <PreviewImage
        width={300}
        src={image}
        onMouseMove={onMouseMove}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onWheel={onWheel}
        ref={previewImageRef}
      />
    </div>
  );
};
