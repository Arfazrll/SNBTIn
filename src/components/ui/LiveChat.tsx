import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FiSend, FiX, FiMinimize2, FiMaximize2, FiSmile, FiPaperclip, FiMoreVertical, FiUser, FiMove } from 'react-icons/fi';
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
  QuerySnapshot
} from 'firebase/firestore';

// Import dari file setup Firebase
import { firestore, checkFirebaseConnection } from '../../lib/firebase';

interface Message {
  id: string;
  senderId: number;
  senderName: string;
  content: string;
  timestamp: Timestamp | Date;
  isRead: boolean;
}

interface LiveChatProps {
  topicId: number;
  userId: number;
  userName: string;
  userImage: string;
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
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [formKey, setFormKey] = useState(0); // Key untuk force re-render form
  const [firebaseConnected, setFirebaseConnected] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Resizing state
  const [isResizing, setIsResizing] = useState(false);
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const resizeStartDimensions = useRef({ width: 0, height: 0 });
  const resizeStartPos = useRef({ x: 0, y: 0 });
  
  // Emoji picker
  const emojis = ['😊', '👍', '🎉', '🤔', '😂', '❤️', '👋', '🙏'];
  const [showEmojis, setShowEmojis] = useState(false);
  
  // Cek koneksi Firebase
  useEffect(() => {
    const connectionStatus = checkFirebaseConnection();
    console.log('Firebase connection status:', connectionStatus);
    setFirebaseConnected(connectionStatus.isConnected);
  }, []);
  
  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Set up Firebase listeners for messages
  useEffect(() => {
    if (isMinimized || !firestore) {
      return;
    }

    try {
      console.log(`Setting up Firestore listener for chat topic ${topicId}`);
      
      // Create collection reference for the specific chat topic
      const messagesRef = collection(firestore, `chats/${topicId}/messages`);
      
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
            content: data.content,
            timestamp: data.timestamp,
            isRead: data.isRead
          });
        });
        setMessages(messageList);
      }, (error) => {
        console.error('Error in Firestore onSnapshot:', error);
      });
      
      // Cleanup listener on unmount
      return () => {
        console.log('Unsubscribing from Firestore listener');
        unsubscribe();
      };
    } catch (error) {
      console.error('Error setting up Firestore listener:', error);
    }
  }, [topicId, isMinimized]);
  
  // Add event listeners for resize
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing && chatContainerRef.current) {
        // Calculate width change from start position
        const deltaX = e.clientX - resizeStartPos.current.x;
        const deltaY = e.clientY - resizeStartPos.current.y;
        
        // For top-left resize, we need to:
        // 1. Increase width when moving left
        // 2. Increase height when moving up
        const newWidth = Math.max(300, resizeStartDimensions.current.width + deltaX);
        const newHeight = Math.max(400, resizeStartDimensions.current.height + deltaY);
        
        // Update width and height
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
    // Reset menggunakan DOM API
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    
    // Reset state React
    setNewMessage('');
    
    // Force re-render form untuk memastikan reset
    setFormKey(prev => prev + 1);
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const messageContent = inputRef.current?.value.trim() || newMessage.trim();
    
    if (!messageContent || !firestore) {
      console.log('Cannot send message:', { 
        hasContent: !!messageContent, 
        hasFirestore: !!firestore 
      });
      return;
    }
    
    try {
      console.log('Sending message to Firestore:', messageContent);
      
      // Reset input sebelum pengiriman ke Firebase
      resetInputField();
      
      // Memastikan koleksi chat ada
      // 1. Buat referensi dokumen chat
      const chatRef = doc(firestore, 'chats', topicId.toString());
      
      // 2. Tambahkan/perbarui metadata chat
      await setDoc(chatRef, {
        lastActivity: serverTimestamp(),
        messageCount: increment(1),
        updatedAt: serverTimestamp()
      }, { merge: true });
      
      // 3. Buat referensi koleksi pesan untuk chat ini
      const messagesRef = collection(firestore, `chats/${topicId}/messages`);
      
      // 4. Tambahkan pesan baru ke Firestore
      const docRef = await addDoc(messagesRef, {
        senderId: userId,
        senderName: userName,
        senderImage: userImage,
        content: messageContent,
        timestamp: serverTimestamp(),
        isRead: false
      });
      
      console.log('Message successfully added with ID:', docRef.id);
      
      // Focus input field again
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.");
    }
  };
  
  // Format timestamp to readable time
  const formatTime = (timestamp: Timestamp | Date) => {
    const date = timestamp instanceof Date ? timestamp : timestamp?.toDate?.();
    if (!date) return '';
    
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };
  
  const insertEmoji = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
    setShowEmojis(false);
    // Focus input field after inserting emoji
    inputRef.current?.focus();
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
      {/* Chat Header with Resize Handle - No Profile Photo */}
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
              {/* Count messages as online users for now */}
              {Math.max(1, Math.min(5, messages.length))} online
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
          {/* Messages Container */}
          <div className="flex-grow p-3 overflow-y-auto bg-gray-50 dark:bg-[#121A2F]">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-secondary-400 text-sm">
                <div className="mb-4">
                  {/* Placeholder tanpa image */}
                  <div className="w-[200px] h-[150px] bg-secondary-100 dark:bg-secondary-800 rounded flex items-center justify-center">
                    <FiUser size={60} className="text-secondary-300 dark:text-secondary-600" />
                  </div>
                </div>
                <p>Belum ada pesan. Mulai diskusi!</p>
                <p className="text-xs mt-2 text-secondary-500">Chat dengan pengguna lain secara real-time.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map(message => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.senderId === userId ? 'justify-end' : 'justify-start'}`}
                  >
                    {/* Menghilangkan foto profil pengguna lain */}
                    
                    <div className={`max-w-[70%] ${message.senderId === userId ? 'order-1' : 'order-2'}`}>
                      {message.senderId !== userId && (
                        <div className="text-xs text-secondary-500 dark:text-secondary-400 mb-1">
                          {message.senderName}
                        </div>
                      )}
                      
                      <div 
                        className={`p-3 rounded-lg text-sm ${
                          message.senderId === userId 
                            ? 'bg-primary-500 text-white rounded-tr-none' 
                            : 'bg-white dark:bg-secondary-800 text-secondary-800 dark:text-secondary-200 border border-secondary-200 dark:border-secondary-700 rounded-tl-none'
                        }`}
                      >
                        {message.content}
                      </div>
                      
                      <div className="text-xs text-secondary-400 mt-1 flex justify-end">
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                    
                    {/* Menghilangkan foto profil pengirim */}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
          
          {/* Message Input - Dengan key untuk force re-render */}
          <form key={formKey} onSubmit={handleSendMessage} className="p-3 border-t border-secondary-200 dark:border-secondary-700 bg-white dark:bg-[#1A2238]">
            <div className="flex items-center relative">
              <button 
                type="button"
                className="p-2 text-secondary-500 hover:text-primary-500 dark:text-secondary-400 dark:hover:text-primary-400"
                title="Attach file"
              >
                <FiPaperclip size={20} />
              </button>
              
              <button 
                type="button"
                className="p-2 text-secondary-500 hover:text-primary-500 dark:text-secondary-400 dark:hover:text-primary-400"
                title="Add emoji"
                onClick={() => setShowEmojis(!showEmojis)}
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
                defaultValue="" // Gunakan defaultValue bukan value
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Tulis pesan..."
                className="flex-grow mx-2 p-3 bg-gray-100 dark:bg-secondary-800 rounded-full text-secondary-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              />
              
              <button 
                type="submit"
                disabled={!newMessage.trim()}
                className={`p-3 rounded-full ${
                  newMessage.trim() 
                    ? 'bg-primary-500 text-white hover:bg-primary-600' 
                    : 'bg-secondary-200 dark:bg-secondary-700 text-secondary-400 dark:text-secondary-500 cursor-not-allowed'
                } transition-colors`}
                title="Send message"
              >
                <FiSend size={18} />
              </button>
            </div>
            
            <div className="text-xs text-secondary-400 dark:text-secondary-500 mt-2 text-center">
              Pesan bersifat publik dan dapat dilihat oleh semua pengguna.
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default LiveChat;