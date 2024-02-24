import { useState, useContext, useEffect } from "react";
import { BotContext } from "../store/Bot";

const WebcamCapture = () => {
  const [newArray, setNewArray] = useState([]);
  const { setState } = useContext(BotContext);

  const sendDataToServer = async () => {
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newArray }),
      };

      // const response = await fetch(
      //   'http://13.233.92.198/predict',
      //   requestOptions
      // );

      setNewArray([]);
      const response = await fetch(
        import.meta.env.VITE_ML_ENDPOINT + "/predict",
        requestOptions
      );

      if (!response.ok) {
        handleErrorResponse(response);
      } else {
        const responseData = await response.json();
        const userState = responseData["prediction"];
        setState(userState);
      }
    } catch (error) {
      console.error("Error sending data to server:", error);
    }
  };

  const handleErrorResponse = async (response) => {
    if (response.status === 500) {
      console.error("Internal Server Error:", response.statusText);
    } else {
      console.error(
        "Server returned an error:",
        response.status,
        response.statusText
      );
    }

    const responseData = await response.json().catch(() => null);
    console.error("Response data:", responseData);
  };

  useEffect(() => {
    const captureInterval = setInterval(async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        const videoTrack = stream.getVideoTracks()[0];
        const imageCapture = new ImageCapture(videoTrack);

        const bmp = await imageCapture.grabFrame();
        const canvas = document.createElement("canvas");
        canvas.width = bmp.width;
        canvas.height = bmp.height;
        const ctx = canvas.getContext("bitmaprenderer");
        ctx.transferFromImageBitmap(bmp);
        const blob = await new Promise((res) => canvas.toBlob(res));

        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
          const base64data = reader.result;
          setNewArray((prevArray) => [...prevArray, base64data]);

          if (newArray.length >= 10) {
            sendDataToServer();
          }
        };
      } catch (error) {
        console.error("Error capturing frame:", error);
      }
    }, 100);

    return () => clearInterval(captureInterval); // Cleanup function
  }, [newArray]); // Dependency on newArray to trigger the effect when it changes

  return <div></div>;
};

export default WebcamCapture;
