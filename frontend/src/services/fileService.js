import axios from "axios";

export const compressFile = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        const maxWidth = 300;
        const maxHeight = 300;
        let newWidth = img.width;
        let newHeight = img.height;

        if (img.width > maxWidth || img.height > maxHeight) {
          if (img.width > img.height) {
            newWidth = maxWidth;
            newHeight = (img.height * maxWidth) / img.width;
          } else {
            newHeight = maxHeight;
            newWidth = (img.width * maxHeight) / img.height;
          }
        }

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = newWidth;
        canvas.height = newHeight;
        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        canvas.toBlob(
          (blob) => {
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: file.lastModified,
            });

            resolve(compressedFile);
          },
          file.type,
          0.8
        );
      };
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
};

export const getFileStats = async () => {
  const res = await axios.get("http://localhost:5000/api/file/stats");
  return res.data;
};

export const getObjectUrl = async (id) => {
  const res = await axios.get(`http://localhost:5000/api/file/${id}`);
  return res.data.url;
};
