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

  const downloadViaTempElement = () => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }

  try {
    if (navigator.canShare?.(data)) {
      await navigator.share(data);
      return;
    }
    
    if (window.showSaveFilePicker) {
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
    } else downloadViaTempElement();
  } catch (e) {
    console.error('download error: ', e);
    downloadViaTempElement();
  }
};

export default download;
