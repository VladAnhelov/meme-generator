import axios from "axios";

const removeBackground = async (file, apiKey) => {
  try {
    const formData = new FormData();
    formData.append("size", "auto");
    formData.append("image_file", file);

    const response = await axios.post(
      "https://api.remove.bg/v1.0/removebg",
      formData,
      {
        responseType: "arraybuffer",
        headers: {
          "Content-Type": "multipart/form-data",
          "X-Api-Key": apiKey,
        },
      },
    );

    const base64 = btoa(
      new Uint8Array(response.data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        "",
      ),
    );
    return base64;
  } catch (error) {
    console.error("Error removing background:", error);
    return null;
  }
};

export default removeBackground;
