import { forwardRef } from "react";

export const Popover = forwardRef<HTMLDivElement, any>(
  ({ visible, content, popoverWidth }: any, ref) => {
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
