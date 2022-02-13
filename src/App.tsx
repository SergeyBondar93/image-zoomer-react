import { useEffect, useState } from "react";
import { ImageZoomer } from "./component/ImageZoomer";

function App() {
  const [originalImageUrl, setOriginalImageUrl] = useState(
    "/static/media/f34.2f853524.jpg"
  );
  const [compressedImageUrl, setCompressedImageUrl] = useState(
    "/static/media/f34compressed.4c51cb4d.jpg"
  );

  const onChangeOriginal: React.ChangeEventHandler<HTMLInputElement> = ({
    currentTarget: { value },
  }) => {
    setOriginalImageUrl(value);
  };
  const onChangeCompressed: React.ChangeEventHandler<HTMLInputElement> = ({
    currentTarget: { value },
  }) => {
    setCompressedImageUrl(value);
  };

  useEffect(() => {
    (() => {
      import("./f34.jpg").then(async (r) => {
        console.log(r.default);
        const d = await fetch(r.default);
        console.log(d);
      });
    })();
  }, []);

  return (
    <div
      className="App"
      style={{
        margin: "100px",
      }}
    >
      <label htmlFor="original">Original image URL</label>
      <input
        value={originalImageUrl}
        id="original"
        onChange={onChangeOriginal}
      />
      <br />
      <label htmlFor="compressed">Compressed image URL</label>
      <input
        value={compressedImageUrl}
        id="compressed"
        onChange={onChangeCompressed}
      />
      <ImageZoomer
        originalImageUrl={originalImageUrl}
        previewImageUrl={compressedImageUrl}
      />
    </div>
  );
}

export default App;
