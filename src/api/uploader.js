export const imageUpload = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", process.env.REACT_APP_CLOUDYNARY_PRESET);
  return fetch(process.env.REACT_APP_CLOUDYNARY_URL, {
    method: "POST",
    body: data,
  })
    .then((res) => res.json())
    .then((data) => data.url);
};
