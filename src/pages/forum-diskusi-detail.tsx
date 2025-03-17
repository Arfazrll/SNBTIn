import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FiThumbsUp, FiSend } from 'react-icons/fi';
import Image from 'next/image';

interface Reply {
  id: number;
  author: string;
  authorImg: string;
  message: string;
  time: string;
  likes: number;
}

interface ForumTopic {
  id: number;
  title: string;
  author: string;
  authorImg: string;
  content: string;
  category: string;
  replies: Reply[];
}

const dummyTopic: ForumTopic = {
  id: 1,
  title: 'Bagaimana cara menyelesaikan soal limit fungsi trigonometri ini?',
  author: 'Andi Wijaya',
  authorImg: '',
  content: 'Saya kesulitan menyelesaikan soal limit \nlim x->0 (sin 2x / x). Mohon bantuannya!',
  category: 'Matematika',
  replies: [],
};

export default function ForumDiskusiDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [forumTopic, setForumTopic] = useState<ForumTopic | null>(null);
  const [newReply, setNewReply] = useState('');
  const [currentUser, setCurrentUser] = useState({
    id: 999, // Gunakan ID pengguna yang sebenarnya
    name: 'Pengguna Aktif',
    image: ''
  });

  useEffect(() => {
    if (!id) return;

    const fetchProfileImages = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?results=6');
        const data = await response.json();
        const users = data.results;

        // Set current user image
        setCurrentUser(prev => ({
          ...prev,
          image: users[0]?.picture?.thumbnail || ''
        }));

        const topicWithImages = {
          ...dummyTopic,
          authorImg: users[0]?.picture?.thumbnail || '',
          replies: [
            { id: 1, author: 'Budi Santoso', authorImg: users[1]?.picture?.thumbnail || '', message: 'Gunakan aturan limit trigonometri dasar, yaitu lim x->0 sin(x)/x = 1.', time: '1 jam yang lalu', likes: 3 },
            { id: 2, author: 'Citra Dewi', authorImg: users[2]?.picture?.thumbnail || '', message: 'Kamu bisa mengubah sin(2x) menjadi 2sin(x)cos(x), lalu gunakan limit dasar.', time: '50 menit yang lalu', likes: 2 },
            { id: 3, author: 'Dian Saputra', authorImg: users[3]?.picture?.thumbnail || '', message: 'Betul! Setelah itu hasilnya adalah 2 karena faktor 2 di depan limit.', time: '30 menit yang lalu', likes: 5 },
            { id: 4, author: 'Eka Rahmadani', authorImg: users[4]?.picture?.thumbnail || '', message: 'Jika kesulitan, bisa coba substitusi angka kecil mendekati 0.', time: '20 menit yang lalu', likes: 1 },
            { id: 5, author: 'Fajar Pratama', authorImg: users[5]?.picture?.thumbnail || '', message: 'Pastikan juga memahami konsep dasar limit agar lebih mudah.', time: '10 menit yang lalu', likes: 4 },
          ],
        };

        setForumTopic(topicWithImages);
      } catch (error) {
        console.error('Error fetching profile images:', error);
        
        // Fallback jika API error
        setForumTopic({
          ...dummyTopic,
          replies: []
        });
      }
    };

    fetchProfileImages();
  }, [id]);

  const handleReplySubmit = async () => {
    if (!newReply.trim() || !forumTopic) return;

    try {
      const response = await fetch('https://randomuser.me/api/');
      const data = await response.json();
      const randomUser = data.results[0];

      const newReplyObj: Reply = {
        id: forumTopic.replies.length + 1,
        author: randomUser?.name?.first + ' ' + randomUser?.name?.last || 'Pengguna',
        authorImg: randomUser?.picture?.thumbnail || '',
        message: newReply,
        time: 'Baru saja',
        likes: 0,
      };

      setForumTopic((prev) => prev ? { ...prev, replies: [...prev.replies, newReplyObj] } : prev);
      setNewReply('');
    } catch (error) {
      console.error('Error creating reply:', error);
      
      // Fallback jika API error
      const newReplyObj: Reply = {
        id: forumTopic.replies.length + 1,
        author: 'Pengguna',
        authorImg: '',
        message: newReply,
        time: 'Baru saja',
        likes: 0,
      };
      
      setForumTopic((prev) => prev ? { ...prev, replies: [...prev.replies, newReplyObj] } : prev);
      setNewReply('');
    }
  };

  if (!forumTopic) {
    return <p className="text-center p-8">Loading...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{forumTopic.title}</h1>
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 relative">
          {forumTopic.authorImg ? (
            <Image 
              src={forumTopic.authorImg} 
              alt={forumTopic.author}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              {forumTopic.author.charAt(0)}
            </div>
          )}
        </div>
        <div className="ml-3">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">{forumTopic.author}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{forumTopic.category}</p>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-6">{forumTopic.content}</p>
      
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Balasan ({forumTopic.replies.length})</h2>
      <div className="space-y-4">
        {forumTopic.replies.map((reply) => (
          <div key={reply.id} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 relative">
                {reply.authorImg ? (
                  <Image 
                    src={reply.authorImg} 
                    alt={reply.author}
                    width={30}
                    height={30}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    {reply.author.charAt(0)}
                  </div>
                )}
              </div>
              <div className="ml-3">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{reply.author}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{reply.time}</p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-2">{reply.message}</p>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <FiThumbsUp className="mr-1" /> {reply.likes} suka
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center border-t pt-4">
        <input
          type="text"
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
          placeholder="Tulis balasan..."
          className="flex-grow px-4 py-2 border rounded-l-lg focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <button 
          onClick={handleReplySubmit} 
          className="px-4 py-2 bg-blue-500 text-white rounded-r-lg flex items-center hover:bg-blue-600 transition-colors"
        >
          <FiSend className="mr-2" /> Kirim
        </button>
      </div>
    </div>
  );
}