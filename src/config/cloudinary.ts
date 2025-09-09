// Cloudinary Configuration
// Replace these values with your actual Cloudinary credentials

export const CLOUDINARY_CONFIG = {
  cloudName: 'drcplqfgi', // Updated cloud name
  uploadPreset: 'rentalpr', // Updated upload preset
  apiUrl: 'https://api.cloudinary.com/v1_1/drcplqfgi/image/upload'
};

// Function to get the upload URL
export const getUploadUrl = () => {
  return `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`;
};

// Function to upload image to Cloudinary
export const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);

  try {
    const response = await fetch(getUploadUrl(), {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error('Failed to upload image');
  }
}; 