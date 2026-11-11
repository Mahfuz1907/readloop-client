export const uploadImageUrl = async (imageUrl: string) => {
  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

  const formData = new FormData();
  formData.append("image", imageUrl);

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: "POST",
    body: formData,
  });
  const data = await response.json();

  if (data.success) {
    return data.data.display_url;
  } else {
    return data;
  }
};
