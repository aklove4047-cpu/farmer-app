import React, { useState } from 'react';
import { 
  MessageCircle, ThumbsUp, Send, CheckCircle2, User, 
  Sparkles, HelpCircle, Share2, Award 
} from 'lucide-react';

const INITIAL_POSTS = [
  {
    id: 1,
    author: "रमेश चौधरी (किसान)",
    location: "हिसार, हरियाणा",
    timeAgo: "2 घंटे पहले",
    crop: "Wheat (गेहूं)",
    question: "गेहूं की पहली सिंचाई के समय यूरिया के साथ क्या जिंक सल्फेट मिलाना चाहिए? कितनी मात्रा सही रहेगी?",
    likes: 18,
    isLiked: false,
    replies: [
      {
        author: "डॉ. वी. के. शर्मा (कृषि वैज्ञानिक, KVK)",
        role: "कृषि वैज्ञानिक",
        verified: true,
        text: "राम-राम रमेश जी! हां, पहली सिंचाई (21 दिन पर CRI स्टेज) के समय प्रति एकड़ 5 किग्रा जिंक सल्फेट (33%) 40 किग्रा यूरिया के साथ मिलाकर डालना अत्यंत लाभकारी है। इससे पौधों में कल्ले अधिक फूटते हैं और पीलापन नहीं आता।",
        timeAgo: "1 घंटा पहले"
      }
    ]
  },
  {
    id: 2,
    author: "सुनील पाटीदार",
    location: "उज्जैन, मध्य प्रदेश",
    timeAgo: "5 घंटे पहले",
    crop: "Garlic / Onion (लहसुन/प्याज)",
    question: "लहसुन में जलेबी रोग (पत्तियां मुड़ना व पीली पड़ना) शुरू हो गया है। कोई सटीक जैविक या रासायनिक उपाय बताएं।",
    likes: 24,
    isLiked: true,
    replies: [
      {
        author: "बलवंत सिंह (प्रगतिशील किसान)",
        role: "किसान",
        verified: false,
        text: "भाई जी, यह थ्रिप्स (कीट) और फफूंद दोनों के कारण होता है। तुरंत फिप्रोनिल 5% SC (2 मिली/लीटर) के साथ कॉपर ऑक्सीक्लोराइड (2.5 ग्राम/लीटर) और सिलिकॉन चिपको मिलाकर शाम के समय स्प्रे करें। 3 दिन में असर दिखेगा।",
        timeAgo: "3 घंटे पहले"
      }
    ]
  },
  {
    id: 3,
    author: "महेंद्र यादव",
    location: "अलवर, राजस्थान",
    timeAgo: "1 दिन पहले",
    crop: "Mustard (सरसों)",
    question: "सरसों में पहली सिंचाई कब करनी चाहिए? जमीन हल्की रेतीली है।",
    likes: 12,
    isLiked: false,
    replies: [
      {
        author: "डॉ. आर. के. मीणा (कृषि विशेषज्ञ)",
        role: "कृषि वैज्ञानिक",
        verified: true,
        text: "हल्की रेतीली जमीन में बुवाई के 25 से 30 दिन के भीतर (शाखाएं निकलते समय व फूल आने से पहले) पहली हल्की सिंचाई अवश्य कर दें। सिंचाई के बाद ओट आने पर हल्की गुड़ाई करें।",
        timeAgo: "20 घंटे पहले"
      }
    ]
  }
];

export default function CommunityForum({ lang, t }) {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [newQuestion, setNewQuestion] = useState('');
  const [newCrop, setNewCrop] = useState('Wheat (गेहूं)');
  const [authorName, setAuthorName] = useState('');
  const [replyText, setReplyText] = useState({});

  const handleLike = (id) => {
    setPosts(posts.map(p => {
      if (p.id === id) {
        return {
          ...p,
          likes: p.isLiked ? p.likes - 1 : p.likes + 1,
          isLiked: !p.isLiked
        };
      }
      return p;
    }));
  };

  const handlePostQuestion = (e) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    const newPost = {
      id: Date.now(),
      author: authorName || (lang === 'hi' ? 'किसान साथी' : 'Kisan Member'),
      location: lang === 'hi' ? 'भारत' : 'India',
      timeAgo: 'अभी-अभी',
      crop: newCrop,
      question: newQuestion,
      likes: 0,
      isLiked: false,
      replies: []
    };

    setPosts([newPost, ...posts]);
    setNewQuestion('');
    setAuthorName('');
  };

  const handleAddReply = (postId) => {
    const text = replyText[postId];
    if (!text || !text.trim()) return;

    setPosts(posts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          replies: [
            ...p.replies,
            {
              author: lang === 'hi' ? 'आप (किसान साथी)' : 'You',
              role: 'किसान',
              verified: false,
              text: text,
              timeAgo: 'अभी-अभी'
            }
          ]
        };
      }
      return p;
    }));

    setReplyText(prev => ({ ...prev, [postId]: '' }));
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-green-800 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-3xl">👥</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-['Yantramanav',sans-serif]">
                {lang === 'hi' ? 'कृषि चौपाल एवं समुदाय' : 'Kisan Chaupal Community'}
              </h2>
            </div>
            <p className="text-emerald-100 text-sm mt-1 max-w-xl">
              {lang === 'hi'
                ? 'देशभर के लाखों किसानों और कृषि वैज्ञानिकों से जुड़ें, सवाल पूछें और अनुभव साझा करें'
                : 'Connect with thousands of fellow farmers and agri scientists. Ask questions and share solutions.'}
            </p>
          </div>

          <div className="bg-white/20 backdrop-blur-xs px-4 py-2.5 rounded-2xl border border-white/20 text-center self-start md:self-auto">
            <span className="text-xs text-emerald-100 block">{lang === 'hi' ? 'सत्यापित विशेषज्ञ' : 'Verified Experts'}</span>
            <span className="text-base font-extrabold">KVK & ICAR</span>
          </div>
        </div>
      </div>

      {/* Ask Question Card */}
      <form onSubmit={handlePostQuestion} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-emerald-600" />
          <span>{lang === 'hi' ? 'अपनी फसल या खेती से जुड़ा सवाल पूछें' : 'Ask a Question to the Community'}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder={lang === 'hi' ? 'आपका नाम (वैकल्पिक)' : 'Your Name (optional)'}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500"
          />

          <select
            value={newCrop}
            onChange={(e) => setNewCrop(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 focus:outline-hidden focus:border-emerald-500 cursor-pointer"
          >
            <option value="Wheat (गेहूं)">Wheat (गेहूं)</option>
            <option value="Paddy (धान)">Paddy (धान)</option>
            <option value="Mustard (सरसों)">Mustard (सरसों)</option>
            <option value="Potato (आलू)">Potato (आलू)</option>
            <option value="Sugarcane (गन्ना)">Sugarcane (गन्ना)</option>
            <option value="Vegetables (सब्जियां)">Vegetables (सब्जियां)</option>
            <option value="Dairy / Animal (पशुपालन)">Dairy / Animal (पशुपालन)</option>
          </select>
        </div>

        <textarea
          rows={3}
          required
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder={lang === 'hi' ? 'अपनी समस्या या सवाल यहां विस्तार से लिखें (जैसे: पत्तियों पर कीड़े हैं, कौन सी दवा डालें?)...' : 'Type your agriculture question here...'}
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:bg-white focus:outline-hidden focus:border-emerald-500 transition-all resize-none"
        />

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-xl shadow-xs transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>{lang === 'hi' ? 'चौपाल पर सवाल भेजें' : 'Post Question'}</span>
          </button>
        </div>
      </form>

      {/* Discussion Feed */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4"
          >
            {/* Question Author & Meta */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg">
                  👨‍🌾
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900 text-sm sm:text-base">
                      {post.author}
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {post.crop}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">
                    {post.location} • {post.timeAgo}
                  </span>
                </div>
              </div>
            </div>

            {/* Question Text */}
            <p className="text-slate-800 font-bold text-base leading-relaxed">
              {post.question}
            </p>

            {/* Like & Share row */}
            <div className="flex items-center gap-4 pt-2 border-t border-slate-100 text-xs">
              <button
                onClick={() => handleLike(post.id)}
                className={`flex items-center gap-1.5 font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  post.isLiked
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                <ThumbsUp className={`w-4 h-4 ${post.isLiked ? 'fill-emerald-600' : ''}`} />
                <span>{post.likes} {lang === 'hi' ? 'सहमति' : 'Likes'}</span>
              </button>

              <span className="text-slate-400 flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                <span>{post.replies.length} {lang === 'hi' ? 'उत्तर' : 'Replies'}</span>
              </span>
            </div>

            {/* Answers List */}
            {post.replies.length > 0 && (
              <div className="mt-3 pt-3 border-t border-slate-100 space-y-3">
                {post.replies.map((reply, rIdx) => (
                  <div
                    key={rIdx}
                    className={`p-4 rounded-2xl ${
                      reply.verified
                        ? 'bg-emerald-50/70 border border-emerald-200'
                        : 'bg-slate-50 border border-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-800 text-xs sm:text-sm">
                          {reply.author}
                        </span>
                        {reply.verified && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-black bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3" /> वैज्ञानिक उत्तर
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {reply.timeAgo}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                      {reply.text}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Add Reply Input */}
            <div className="flex gap-2 pt-2">
              <input
                type="text"
                value={replyText[post.id] || ''}
                onChange={(e) => setReplyText({ ...replyText, [post.id]: e.target.value })}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddReply(post.id);
                }}
                placeholder={lang === 'hi' ? 'अपना उत्तर या सलाह लिखें...' : 'Write your reply or advice...'}
                className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:border-emerald-500"
              />
              <button
                onClick={() => handleAddReply(post.id)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition-all active:scale-95 cursor-pointer"
              >
                {lang === 'hi' ? 'उत्तर दें' : 'Reply'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
