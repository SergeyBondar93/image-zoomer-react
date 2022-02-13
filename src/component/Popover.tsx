import { forwardRef, ReactNode } from "react";

interface IPopoverProps {
  visible: boolean;
  content: ReactNode;
  popoverWidth: number;
}

export const Popover = forwardRef<HTMLDivElement, IPopoverProps>(
  ({ visible, content, popoverWidth }: IPopoverProps, ref) => {
    return (
      <div
        style={{
          display: visible ? "block" : "none",
          minHeight: "200px",
          maxHeight: "400px",
          border: "1px solid black",
          overflow: "hidden",
          width: popoverWidth + "px",
          position: "absolute",
        }}
        ref={ref}
      >
        {content}
      </div>
    );
  }
);
