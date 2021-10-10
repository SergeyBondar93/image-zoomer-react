import { useState } from "react";
import { ImageZoomer } from "./component/ImageZoomer";

function App() {
  const [imageUrl, setImageUrl] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/1/15/2013-03-05_Geneva_Motor_Show_8182.JPG"
  );

  const onChange = ({ currentTarget: { value } }: any) => {
    setImageUrl(value);
  };

  return (
    <div
      className="App"
      style={{
        margin: "100px",
      }}
    >
      <input value={imageUrl} onChange={onChange} />
      <ImageZoomer originalImageUrl={imageUrl} />
    </div>
  );
}

export default App;
