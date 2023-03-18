const download = async (url, filename) => {
  const res = await fetch(url);
  const blob = await res.blob();
  const title = filename.replace(/\.jpg$/i, '');

  const data = {
    files: [
      new File([blob], filename, { type: blob.type }),
    ],
    title,
    text: title,
  };

  try {
    if (navigator.canShare(data))
      await navigator.share(data);
  } catch (err) {
    console.error(`Error: ${err}`)

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }
};

export default download;
