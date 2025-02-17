'use server';
import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';
connectDB();

async function MarkMessageAsRead(messageId) {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User ID Is Required');
  }

  const { userId } = sessionUser;

  const message = await Message.findById(messageId);

  if (!message) {
    throw new Error('Message not found');

    // Verify ownership of the message
    if (message.recipient.toString() !== userId) {
      throw new Error('You do not have permission to read this message');
    }
  }

  message.read = !message.read;

  revalidatePath(`/messages`, 'page');

  await message.save();

  return message.read;
}

export default MarkMessageAsRead;
