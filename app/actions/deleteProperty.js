'use server';
import cloudinary from '@/config/cloudinary';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

async function deleteProperty(propertyId) {
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User ID is required');
  }

  const { userId } = sessionUser;

  const property = await Property.findById(propertyId);

  if (!property) {
    throw new Error('Property not found');
  }

  // Verify ownership
  if (property.owner.toString() !== userId) {
    throw new Error('Unauthorised');
  }
  // Extract public_id from images url
  const publicIds = property.images.map((imageUrl) => {
    const parts = imageUrl.split('/');
    return parts.at(-1).split('.').at(0);
  });

  // delete images from cloudinary
  if (publicIds.length > 0) {
    for (let public_id of publicIds) {
      await cloudinary.uploader.destroy('propertypulse/' + public_id);
    }

    await property.deleteOne();
  }

  revalidatePath('/', 'layout');
}

export default deleteProperty;
