// Share an image to social media.
// This downloads the image from the URL. If the browser supports
// sharing images, it will share the image directly. Otherwise,
// it will download the image onto the user's device.
export default async function shareImage(imageUrl: string) {
  const imageData = await fetch(imageUrl).then((res) => res.blob());
  const file = new File([imageData], "tiktok-wrapped.png", {
    type: "image/png",
  });
  const filesArray = [file];
  const shareData = {
    files: filesArray,
  };
  if (navigator.canShare && navigator.canShare(shareData)) {
    navigator.share(shareData);
  } else {
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = "tiktok-wrapped.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
