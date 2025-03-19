import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FiSend, FiX, FiMinimize2, FiMaximize2, FiSmile, FiPaperclip, FiMoreVertical, FiUser, FiMove, FiTrash2, FiClock } from 'react-icons/fi';
import Image from 'next/image';
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  serverTimestamp, 
  Timestamp,
  doc,
  setDoc,
  increment,
  DocumentData,
  QuerySnapshot,
  deleteDoc,
  updateDoc,
  where,
  getDocs,
  CollectionReference,
  Firestore,
  getFirestore
} from 'firebase/firestore';
import { getDatabase, ref, onValue, onDisconnect, set } from 'firebase/database';

// Import Firebase utilities with improved error handling
import { initializeFirebase, checkFirebaseConnection, testFirebasePermissions } from '../../lib/firebase';

interface Message {
  id: string;
  senderId: number;
  senderName: string;
  senderImage?: string;
  content: string;
  timestamp: Timestamp | Date;
  isRead: boolean;
  isDeleted?: boolean;
}

interface OnlineUser {
  userId: number;
  userName: string;
  userImage?: string;
  lastActive: number;
}

interface LiveChatProps {
  topicId: number;
  userId: number;
  userName: string;
  userImage?: string;
  isMinimized: boolean;
  onToggleMinimize: () => void;
  initialWidth?: string;
  initialHeight?: string;
}

const LiveChat: React.FC<LiveChatProps> = ({
  topicId,
  userId,
  userName,
  userImage,
  isMinimized,
  onToggleMinimize,
  initialWidth = '500px',
  initialHeight = '600px'
}) => {
  // State management
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [formKey, setFormKey] = useState(0);
  const [firebaseConnected, setFirebaseConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [showDeleteMenu, setShowDeleteMenu] = useState<string | null>(null);
  const [firebaseError, setFirebaseError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  
  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // UI state
  const [isResizing, setIsResizing] = useState(false);
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const resizeStartDimensions = useRef({ width: 0, height: 0 });
  const resizeStartPos = useRef({ x: 0, y: 0 });
  
  // Emoji picker state
  const emojis = ['😊', '👍', '🎉', '🤔', '😂', '❤️', '👋', '🙏'];
  const [showEmojis, setShowEmojis] = useState(false);
  
  // Initialize Firebase - ensures Firebase is properly initialized
  useEffect(() => {
    const initFirebase = async () => {
      setIsInitializing(true);
      try {
        const initResult = await initializeFirebase();
        if (initResult.success) {
          // Test permissions explicitly
          const permissionsTest = await testFirebasePermissions();
          if (permissionsTest.success) {
            setFirebaseConnected(true);
            setFirebaseError(null);
          } else {
            setFirebaseConnected(false);
            if (permissionsTest.isPermissionError) {
              setFirebaseError("Firebase permissions error: Check your security rules");
            } else {
              setFirebaseError(`Firebase error: ${permissionsTest.error}`);
            }
          }
        } else {
          setFirebaseConnected(false);
          setFirebaseError(`Firebase initialization failed: ${initResult.error}`);
        }
      } catch (error) {
        console.error('Error during Firebase initialization:', error);
        setFirebaseConnected(false);
        setFirebaseError('Failed to initialize Firebase connection');
      } finally {
        setIsInitializing(false);
      }
    };

    initFirebase();
  }, []);
  
  // Scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Set up Firestore listeners for messages
  useEffect(() => {
    if (isMinimized || !firebaseConnected || isInitializing) {
      return;
    }

    try {
      console.log(`Setting up Firestore listener for chat topic ${topicId}`);
      
      // Get Firestore instance safely
      const firestoreDb = getFirestore();
      if (!firestoreDb) {
        console.error('Firestore instance not available');
        setFirebaseError('Firestore instance not available');
        return;
      }
      
      // Create collection reference for the specific chat topic
      const messagesRef = collection(firestoreDb, `chats/${topicId}/messages`);
      
      // Query to get messages ordered by timestamp
      const q = query(messagesRef, orderBy('timestamp', 'asc'));
      
      // Real-time listener for messages
      const unsubscribe = onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
        console.log(`Received ${snapshot.docs.length} messages from Firestore`);
        const messageList: Message[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          messageList.push({
            id: doc.id,
            senderId: data.senderId,
            senderName: data.senderName,
            senderImage: data.senderImage,
            content: data.content,
            timestamp: data.timestamp || new Date(), // Fallback if timestamp is missing
            isRead: data.isRead || false,
            isDeleted: data.isDeleted || false
          });
        });
        setMessages(messageList);
        setFirebaseError(null); // Clear any previous errors
      }, (error) => {
        console.error('Error in Firestore onSnapshot:', error);
        setFirebaseError(`Firestore error: ${error.message}`);
      });
      
      // Cleanup listener on unmount
      return () => {
        console.log('Unsubscribing from Firestore listener');
        unsubscribe();
      };
    } catch (error: any) {
      console.error('Error setting up Firestore listener:', error);
      setFirebaseError(`Error setting up Firestore listener: ${error.message}`);
    }
  }, [topicId, isMinimized, firebaseConnected, isInitializing]);
  
  // Track online users
  useEffect(() => {
    if (!firebaseConnected || isInitializing) {
      return;
    }

    try {
      // Get Firestore instance safely
      const firestoreDb = getFirestore();
      if (!firestoreDb) {
        console.error('Firestore instance not available for online users');
        return;
      }
      
      const onlineUsersRef = collection(firestoreDb, `chats/${topicId}/onlineUsers`);
      
      // Add current user to online users
      const addUserOnline = async () => {
        try {
          const userDocRef = doc(onlineUsersRef, userId.toString());
          await setDoc(userDocRef, {
            userId,
            userName,
            userImage,
            lastActive: Date.now()
          });
        } catch (error) {
          console.error('Error adding user to online list:', error);
        }
      };
      
      // Mark user as offline when leaving
      const removeUserOnline = async () => {
        try {
          const userDocRef = doc(onlineUsersRef, userId.toString());
          await deleteDoc(userDocRef);
        } catch (error) {
          console.error('Error removing online user:', error);
        }
      };
      
      // Add user to online list
      addUserOnline();
      
      // Set up real-time listener for online users
      const q = query(onlineUsersRef);
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const onlineList: OnlineUser[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data() as OnlineUser;
          onlineList.push(data);
        });
        setOnlineUsers(onlineList);
      }, (error) => {
        console.error('Error in online users onSnapshot:', error);
      });
      
      // Cleanup on unmount
      return () => {
        removeUserOnline();
        unsubscribe();
      };
    } catch (error) {
      console.error('Error setting up online users:', error);
    }
  }, [topicId, userId, userName, userImage, firebaseConnected, isInitializing]);
  
  // Keep user status updated with heartbeat
  useEffect(() => {
    if (!firebaseConnected || isInitializing) {
      return;
    }
    
    try {
      // Get Firestore instance safely
      const firestoreDb = getFirestore();
      if (!firestoreDb) {
        console.error('Firestore instance not available for heartbeat');
        return;
      }
      
      const userDocRef = doc(firestoreDb, `chats/${topicId}/onlineUsers`, userId.toString());
      
      const updateHeartbeat = async () => {
        try {
          await updateDoc(userDocRef, {
            lastActive: Date.now()
          });
        } catch (error) {
          console.error('Error updating heartbeat:', error);
        }
      };
      
      // Update heartbeat every 30 seconds
      const intervalId = setInterval(updateHeartbeat, 30000);
      
      // Clean up inactive users every minute
      const cleanupIntervalId = setInterval(async () => {
        try {
          const cutoffTime = Date.now() - 60000; // 1 minute ago
          const inactiveUsersQuery = query(
            collection(firestoreDb, `chats/${topicId}/onlineUsers`),
            where('lastActive', '<', cutoffTime)
          );
          
          const inactiveSnapshot = await getDocs(inactiveUsersQuery);
          inactiveSnapshot.forEach(async (docSnapshot) => {
            await deleteDoc(docSnapshot.ref);
          });
        } catch (error) {
          console.error('Error cleaning up inactive users:', error);
        }
      }, 60000);
      
      return () => {
        clearInterval(intervalId);
        clearInterval(cleanupIntervalId);
      };
    } catch (error) {
      console.error('Error setting up heartbeat:', error);
    }
  }, [topicId, userId, firebaseConnected, isInitializing]);
  
  // Add event listeners for resize and drag
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing && chatContainerRef.current) {
        // Calculate width and height changes
        const deltaX = e.clientX - resizeStartPos.current.x;
        const deltaY = e.clientY - resizeStartPos.current.y;
        
        const newWidth = Math.max(300, resizeStartDimensions.current.width + deltaX);
        const newHeight = Math.max(400, resizeStartDimensions.current.height + deltaY);
        
        setWidth(`${newWidth}px`);
        setHeight(`${newHeight}px`);
      }
      
      if (isDragging && chatContainerRef.current) {
        const deltaX = e.clientX - dragStartPos.current.x;
        const deltaY = e.clientY - dragStartPos.current.y;
        
        setPosition(prev => ({
          x: prev.x + deltaX,
          y: prev.y + deltaY
        }));
        
        dragStartPos.current = { x: e.clientX, y: e.clientY };
      }
    };
    
    const handleMouseUp = () => {
      setIsResizing(false);
      setIsDragging(false);
    };
    
    if (isResizing || isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, isDragging]);
  
  const handleStartResize = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    
    if (chatContainerRef.current) {
      resizeStartPos.current = { x: e.clientX, y: e.clientY };
      const rect = chatContainerRef.current.getBoundingClientRect();
      resizeStartDimensions.current = { width: rect.width, height: rect.height };
    }
  };
  
  const handleStartDrag = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      e.preventDefault();
      setIsDragging(true);
      dragStartPos.current = { x: e.clientX, y: e.clientY };
    }
  };

  // Reset input field function
  const resetInputField = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    setNewMessage('');
    setFormKey(prev => prev + 1);
  }, []);

  // Send message function
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const messageContent = inputRef.current?.value.trim() || newMessage.trim();
    
    if (!messageContent || !firebaseConnected) {
      console.log('Cannot send message:', { 
        hasContent: !!messageContent, 
        isFirebaseConnected: firebaseConnected 
      });
      return;
    }
    
    try {
      // Get Firestore instance safely
      const firestoreDb = getFirestore();
      if (!firestoreDb) {
        console.error('Firestore instance not available for sending message');
        setFirebaseError('Firestore instance not available');
        return;
      }
      
      // Reset input field before sending to Firebase for better UX
      resetInputField();
      
      // Create chat document if it doesn't exist
      const chatRef = doc(firestoreDb, 'chats', topicId.toString());
      
      // Update chat metadata
      await setDoc(chatRef, {
        lastActivity: serverTimestamp(),
        messageCount: increment(1),
        updatedAt: serverTimestamp()
      }, { merge: true });
      
      // Add message to messages collection
      const messagesRef = collection(firestoreDb, `chats/${topicId}/messages`);
      
      await addDoc(messagesRef, {
        senderId: userId,
        senderName: userName,
        senderImage: userImage,
        content: messageContent,
        timestamp: serverTimestamp(),
        isRead: false,
        isDeleted: false
      });
      
      // Focus input field again
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    } catch (error: any) {
      console.error("Error sending message:", error);
      
      // Show user-friendly error message based on error type
      if (error.code === 'permission-denied') {
        setFirebaseError("Tidak memiliki izin untuk mengirim pesan. Periksa aturan keamanan Firestore Anda.");
      } else {
        setFirebaseError(`Terjadi kesalahan saat mengirim pesan: ${error.message}`);
      }
    }
  };
  
  // Delete message function
  const handleDeleteMessage = async (messageId: string) => {
    if (!firebaseConnected) {
      setFirebaseError('Tidak dapat menghapus pesan - Firebase tidak terhubung');
      return;
    }
    
    try {
      const firestoreDb = getFirestore();
      if (!firestoreDb) {
        setFirebaseError('Firestore instance not available for deleting message');
        return;
      }
      
      const messageRef = doc(firestoreDb, `chats/${topicId}/messages/${messageId}`);
      
      // Instead of deleting, mark as deleted (soft delete)
      await updateDoc(messageRef, {
        isDeleted: true,
        content: "Pesan ini telah dihapus"
      });
      
      setShowDeleteMenu(null);
    } catch (error: any) {
      console.error("Error deleting message:", error);
      
      if (error.code === 'permission-denied') {
        setFirebaseError("Tidak memiliki izin untuk menghapus pesan");
      } else {
        setFirebaseError(`Terjadi kesalahan saat menghapus pesan: ${error.message}`);
      }
    }
  };
  
  // Format timestamp to readable time with date
  const formatTime = (timestamp: Timestamp | Date) => {
    if (!timestamp) return '';
    
    const date = timestamp instanceof Date ? timestamp : timestamp.toDate?.();
    if (!date) return '';
    
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const messageDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const timeStr = `${hours}:${minutes}`;
    
    // If message is from today, just show time
    if (messageDate.getTime() === today.getTime()) {
      return timeStr;
    }
    
    // If message is from yesterday
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (messageDate.getTime() === yesterday.getTime()) {
      return `Kemarin ${timeStr}`;
    }
    
    // Otherwise show full date
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}/${month} ${timeStr}`;
  };
  
  const insertEmoji = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
    setShowEmojis(false);
    // Focus input field after inserting emoji
    inputRef.current?.focus();
  };
  
  // Generate avatar for user
  const generateAvatar = (name: string, imageUrl?: string) => {
    if (imageUrl) {
      return (
        <div className="h-8 w-8 rounded-full bg-secondary-200 dark:bg-secondary-700 overflow-hidden flex-shrink-0 relative">
          <Image 
            src={imageUrl} 
            alt={name} 
            fill 
            sizes="32px"
            className="object-cover" 
          />
        </div>
      );
    }
    
    // If no image, use first letter of name
    return (
      <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center flex-shrink-0">
        <span className="text-white text-sm font-medium">
          {name ? name.charAt(0).toUpperCase() : '?'}
        </span>
      </div>
    );
  };
  
  return (
    <div 
      ref={chatContainerRef}
      className={`fixed ${isMinimized ? 'bottom-4 right-4 w-auto h-auto' : 'bottom-0 right-0'} 
                  bg-white dark:bg-[#1A2238] rounded-lg shadow-lg border border-secondary-200 dark:border-secondary-700 
                  transition-all duration-300 flex flex-col z-50`}
      style={{ 
        width: isMinimized ? 'auto' : width, 
        height: isMinimized ? 'auto' : height,
        maxWidth: '95vw',
        maxHeight: '90vh',
        transform: `translate(${position.x}px, ${position.y}px)`,
        ...(isDragging && { cursor: 'grabbing' })
      }}
    >
      {/* Chat Header with Resize Handle */}
      <div 
        className="bg-primary-600 dark:bg-primary-700 text-white p-3 rounded-t-lg flex justify-between items-center relative"
        onMouseDown={handleStartDrag}
      >
        {/* Resize handle in top-left */}
        <div 
          className="absolute top-0 left-0 w-6 h-6 cursor-nwse-resize flex items-center justify-center bg-primary-800 hover:bg-primary-900 rounded-tl-lg rounded-br-lg z-10"
          onMouseDown={handleStartResize}
          title="Resize chat"
        >
          <FiMove size={14} />
        </div>
        
        <div className="flex items-center ml-6">
          <div className="ml-2">
            <h3 className="font-medium text-base">
              Live Chat
              {firebaseConnected ? (
                <span className="ml-2 inline-block w-2 h-2 bg-green-400 rounded-full"></span>
              ) : (
                <span className="ml-2 inline-block w-2 h-2 bg-red-400 rounded-full"></span>
              )}
            </h3>
            <span className="text-xs text-primary-100">
              {isInitializing ? 'Menghubungkan...' : 
                onlineUsers.length > 0 ? 
                `${onlineUsers.length} ${onlineUsers.length === 1 ? 'pengguna' : 'pengguna'} online` : 
                'Tidak ada pengguna online'}
            </span>
          </div>
        </div>
        
        <div className="flex space-x-1">
          {!isMinimized && (
            <button 
              className="p-1 rounded hover:bg-primary-700 dark:hover:bg-primary-800 transition-colors"
              title="More options"
            >
              <FiMoreVertical size={18} />
            </button>
          )}
          
          <button 
            className="p-1 rounded hover:bg-primary-700 dark:hover:bg-primary-800 transition-colors"
            onClick={onToggleMinimize}
            title={isMinimized ? "Expand" : "Minimize"}
          >
            {isMinimized ? <FiMaximize2 size={18} /> : <FiMinimize2 size={18} />}
          </button>
          
          {!isMinimized && (
            <button 
              className="p-1 rounded hover:bg-primary-700 dark:hover:bg-primary-800 transition-colors"
              onClick={onToggleMinimize}
              title="Close"
            >
              <FiX size={18} />
            </button>
          )}
        </div>
      </div>
      
      {!isMinimized && (
        <>
          {/* Firebase Error Banner */}
          {firebaseError && (
            <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-2 text-sm flex justify-between items-center">
              <span>{firebaseError}</span>
              <button 
                onClick={() => setFirebaseError(null)}
                className="text-red-700 dark:text-red-300 hover:text-red-900 dark:hover:text-red-100"
              >
                <FiX size={16} />
              </button>
            </div>
          )}
          
          {/* Messages Container */}
          <div className="flex-grow p-3 overflow-y-auto bg-gray-50 dark:bg-[#121A2F]">
            {isInitializing ? (
              <div className="h-full flex flex-col items-center justify-center text-secondary-400 text-sm">
                <p className="animate-pulse">Menghubungkan ke server chat...</p>
              </div>
            ) : !firebaseConnected ? (
              <div className="h-full flex flex-col items-center justify-center text-secondary-400 text-sm">
                <p className="text-red-500">Tidak dapat terhubung ke Firebase.</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
                >
                  Coba lagi
                </button>
              </div>
            ) : messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-secondary-400 text-sm">
                <div className="mb-4">
                  {/* Empty chat placeholder */}
                  <div className="w-[200px] h-[150px] bg-secondary-100 dark:bg-secondary-800 rounded flex items-center justify-center">
                    <FiUser size={60} className="text-secondary-300 dark:text-secondary-600" />
                  </div>
                </div>
                <p>Belum ada pesan. Mulai diskusi!</p>
                <p className="text-xs mt-2 text-secondary-500">Chat dengan pengguna lain secara real-time.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map(message => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.senderId === userId ? 'justify-end' : 'justify-start'}`}
                  >
                    {/* Show avatar for other users, on the left */}
                    {message.senderId !== userId && (
                      <div className="mr-2 mt-1 flex-shrink-0">
                        {generateAvatar(message.senderName, message.senderImage)}
                      </div>
                    )}
                    
                    <div className={`max-w-[70%] relative ${message.senderId === userId ? 'order-1' : 'order-2'}`}>
                      {message.senderId !== userId && (
                        <div className="text-xs text-secondary-500 dark:text-secondary-400 mb-1 font-medium">
                          {message.senderName}
                        </div>
                      )}
                      
                      <div 
                        className={`p-3 rounded-lg text-sm ${
                          message.isDeleted 
                            ? 'bg-secondary-100 dark:bg-secondary-800 text-secondary-500 italic' 
                            : message.senderId === userId 
                              ? 'bg-primary-500 text-white rounded-tr-none' 
                              : 'bg-white dark:bg-secondary-800 text-secondary-800 dark:text-secondary-200 border border-secondary-200 dark:border-secondary-700 rounded-tl-none'
                        }`}
                        onContextMenu={(e) => {
                          e.preventDefault();
                          if (message.senderId === userId && !message.isDeleted) {
                            setShowDeleteMenu(message.id);
                          }
                        }}
                      >
                        {message.content}
                        
                        {/* Delete message menu */}
                        {showDeleteMenu === message.id && message.senderId === userId && !message.isDeleted && (
                          <div className="absolute right-0 top-full mt-1 bg-white dark:bg-secondary-700 rounded shadow-lg z-10 py-1">
                            <button 
                              className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-secondary-100 dark:hover:bg-secondary-600 flex items-center"
                              onClick={() => handleDeleteMessage(message.id)}
                            >
                              <FiTrash2 size={14} className="mr-2" />
                              Hapus Pesan
                            </button>
                          </div>
                        )}
                      </div>
                      
                      <div className="text-xs text-secondary-400 mt-1 flex justify-end items-center">
                        <FiClock size={10} className="mr-1" />
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                    
                    {/* Show avatar for current user, on the right */}
                    {message.senderId === userId && (
                      <div className="ml-2 mt-1 flex-shrink-0">
                        {generateAvatar(userName, userImage)}
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
          
          {/* Message Input */}
          <form key={formKey} onSubmit={handleSendMessage} className="p-3 border-t border-secondary-200 dark:border-secondary-700 bg-white dark:bg-[#1A2238]">
            <div className="flex items-center relative">
              <button 
                type="button"
                className="p-2 text-secondary-500 hover:text-primary-500 dark:text-secondary-400 dark:hover:text-primary-400"
                title="Attach file"
                disabled={!firebaseConnected}
              >
                <FiPaperclip size={20} />
              </button>
              
              <button 
                type="button"
                className="p-2 text-secondary-500 hover:text-primary-500 dark:text-secondary-400 dark:hover:text-primary-400"
                title="Add emoji"
                onClick={() => setShowEmojis(!showEmojis)}
                disabled={!firebaseConnected}
              >
                <FiSmile size={20} />
              </button>
              
              {showEmojis && (
                <div className="absolute bottom-12 left-0 bg-white dark:bg-secondary-800 rounded-lg shadow-lg border border-secondary-200 dark:border-secondary-700 p-2 z-10">
                  <div className="grid grid-cols-4 gap-2">
                    {emojis.map(emoji => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => insertEmoji(emoji)}
                        className="text-xl hover:bg-secondary-100 dark:hover:bg-secondary-700 p-1 rounded"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <input
                ref={inputRef}
                type="text"
                defaultValue="" 
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={firebaseConnected ? "Tulis pesan..." : "Firebase tidak terhubung..."}
                className="flex-grow mx-2 p-3 bg-gray-100 dark:bg-secondary-800 rounded-full text-secondary-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                disabled={!firebaseConnected}
              />
              
              <button 
                type="submit"
                disabled={!newMessage.trim() || !firebaseConnected}
                className={`p-3 rounded-full ${
                  newMessage.trim() && firebaseConnected
                    ? 'bg-primary-500 text-white hover:bg-primary-600' 
                    : 'bg-secondary-200 dark:bg-secondary-700 text-secondary-400 dark:text-secondary-500 cursor-not-allowed'
                } transition-colors`}
                title="Send message"
              >
                <FiSend size={18} />
              </button>
            </div>
            
            <div className="text-xs text-secondary-400 dark:text-secondary-500 mt-2 text-center">
              Pesan bersifat publik dan dapat dilihat oleh semua pengguna. Klik kanan pada pesan Anda untuk menghapus.
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default LiveChat;