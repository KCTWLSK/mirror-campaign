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
    if (navigator.canShare?.(data))
      await navigator.share(data);
    else if (window.showSaveFilePicker) {
      const handle = await showSaveFilePicker({
        suggestedName: filename,
        types: [
          {
            description: "KICKS CREW x MIRROR wallpaper",
            accept: {
              "image/*": [".png", ".gif", ".jpeg", ".jpg"],
            },
          },
        ],
      });
      const writable = await handle.createWritable();
      if (writable) {
        await writable.write(blob);
        await writable.close();
      }
    } else {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    }
  } catch (e) {
    console.error('download error: ', e);
  }
};

export default download;
