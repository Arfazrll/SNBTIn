// src/services/chatService.ts
import { database } from '../../firebase/firebaseConfig';
import { 
  ref, 
  push, 
  set, 
  onValue, 
  off, 
  orderByChild, 
  query, 
  limitToLast,
  Database,
  DataSnapshot 
} from 'firebase/database';

export interface ChatMessage {
  id: string;
  text: string;
  userId: number;
  userName: string;
  userImage?: string;
  timestamp: number;
}

// Fungsi helper untuk memastikan kode berjalan hanya di sisi client
const isClient = typeof window !== 'undefined';

/**
 * Send a new chat message to Firebase
 */
export const sendChatMessage = async (
  topicId: number,
  text: string,
  userId: number,
  userName: string,
  userImage?: string
): Promise<ChatMessage | null> => {
  if (!isClient) return null;

  try {
    if (!database) {
      console.error('Firebase database not initialized');
      return null;
    }
    
    const chatRef = ref(database as Database, `chats/${topicId}`);
    const newChatRef = push(chatRef);
    const timestamp = Date.now();
    
    const chatMessage: ChatMessage = {
      id: newChatRef.key || '',
      text,
      userId,
      userName,
      userImage,
      timestamp
    };
    
    // Save to Firebase for real-time updates
    await set(newChatRef, chatMessage);
    
    return chatMessage;
  } catch (error) {
    console.error('Error sending chat message:', error);
    return null;
  }
};

/**
 * Subscribe to chat messages from Firebase
 */
export const subscribeToChatMessages = (
  topicId: number,
  onNewMessages: (messages: ChatMessage[]) => void,
  limit: number = 50
): (() => void) => {
  if (!isClient || !database) {
    return () => {};
  }
  
  try {
    const chatRef = ref(database as Database, `chats/${topicId}`);
    const messagesQuery = query(chatRef, orderByChild('timestamp'), limitToLast(limit));
    
    const callback = (snapshot: DataSnapshot) => {
      try {
        if (snapshot.exists()) {
          const messagesObj = snapshot.val();
          const messages = Object.keys(messagesObj).map(key => ({
            ...messagesObj[key],
            id: key
          }));
          
          // Sort messages by timestamp
          messages.sort((a, b) => a.timestamp - b.timestamp);
          
          onNewMessages(messages);
        } else {
          onNewMessages([]);
        }
      } catch (error) {
        console.error('Error processing chat messages:', error);
        onNewMessages([]);
      }
    };
    
    onValue(messagesQuery, callback);
    
    // Return unsubscribe function
    return () => {
      off(messagesQuery, 'value', callback);
    };
  } catch (error) {
    console.error('Error subscribing to messages:', error);
    return () => {};
  }
};

/**
 * Get active users count
 */
export const getActiveChatUsers = (
  topicId: number,
  onActiveUsers: (count: number) => void
): (() => void) => {
  if (!isClient || !database) {
    onActiveUsers(0);
    return () => {};
  }
  
  try {
    const activeUsersRef = ref(database as Database, `activeUsers/${topicId}`);
    
    const callback = (snapshot: DataSnapshot) => {
      try {
        if (snapshot.exists()) {
          const users = snapshot.val();
          onActiveUsers(Object.keys(users).length);
        } else {
          onActiveUsers(0);
        }
      } catch (error) {
        console.error('Error getting active users:', error);
        onActiveUsers(0);
      }
    };
    
    onValue(activeUsersRef, callback);
    
    // Return unsubscribe function
    return () => {
      off(activeUsersRef, 'value', callback);
    };
  } catch (error) {
    console.error('Error getting active users:', error);
    onActiveUsers(0);
    return () => {};
  }
};

/**
 * Mark a user as active in a chat
 */
export const markUserActive = async (topicId: number, userId: number): Promise<void> => {
  if (!isClient) return;

  try {
    if (!database) {
      console.error('Firebase database not initialized');
      return;
    }
    
    const userRef = ref(database as Database, `activeUsers/${topicId}/${userId}`);
    
    // Update Firebase
    await set(userRef, {
      lastActive: Date.now()
    });
  } catch (error) {
    console.error('Error marking user as active:', error);
  }
};

/**
 * Mark a user as inactive in a chat
 */
export const markUserInactive = async (topicId: number, userId: number): Promise<void> => {
  if (!isClient) return;

  try {
    if (!database) {
      console.error('Firebase database not initialized');
      return;
    }
    
    const userRef = ref(database as Database, `activeUsers/${topicId}/${userId}`);
    await set(userRef, null);
  } catch (error) {
    console.error('Error marking user as inactive:', error);
  }
};