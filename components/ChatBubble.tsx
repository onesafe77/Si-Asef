import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { User, ShieldCheck, Copy, Check, RotateCcw, ThumbsUp, ThumbsDown, FileText } from 'lucide-react';
import { Message, Role } from '../types';

interface ChatBubbleProps {
  message: Message;
  onRegenerate?: () => void;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, onRegenerate }) => {
  const isUser = message.role === Role.USER;
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`w-full py-4 px-4 ${isUser ? '' : 'bg-transparent'}`}>
      <div className={`max-w-3xl mx-auto flex gap-5 md:gap-6 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Avatar / Icon */}
        <div className="flex-shrink-0 flex flex-col pt-1">
          {isUser ? (
             <div className="w-9 h-9 bg-zinc-100 rounded-full text-zinc-400 flex items-center justify-center border border-zinc-200">
                <User className="w-5 h-5" />
             </div>
          ) : (
             <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl text-white flex items-center justify-center shadow-lg shadow-emerald-500/20 ring-2 ring-white">
                <ShieldCheck className="w-5 h-5" strokeWidth={2} />
             </div>
          )}
        </div>

        {/* Content Bubble */}
        <div className={`
            relative flex-1 overflow-hidden group 
            ${isUser ? 'flex justify-end' : ''}
        `}>
          <div className={`
             text-[15px] md:text-[16px] leading-relaxed px-5 py-3.5 rounded-2xl max-w-full md:max-w-[90%]
             ${isUser 
                ? 'bg-zinc-50 border border-zinc-100 text-zinc-800 rounded-tr-sm shadow-sm' 
                : 'bg-transparent text-zinc-800 prose-content pl-0'}
          `}>
             
             {/* Name for AI only */}
             {!isUser && (
                <div className="font-bold text-sm text-zinc-900 mb-2 flex items-center gap-2">
                    Si Asef
                    <span className="bg-emerald-100 text-emerald-700 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">AI</span>
                </div>
             )}

             {/* If user sent an image, show it (Mockup) */}
             {isUser && message.content.startsWith('[Attachment]') && (
                <div className="mb-3">
                    <div className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-zinc-200 text-xs font-medium text-zinc-600 shadow-sm">
                        <FileText className="w-4 h-4 text-emerald-500" />
                        <span>Image Uploaded</span>
                    </div>
                </div>
             )}

            {isUser ? (
              <p className="whitespace-pre-wrap font-sans">{message.content.replace('[Attachment] ', '')}</p>
            ) : (
              <ReactMarkdown 
                components={{
                    h3: ({node, ...props}) => <h3 className="text-lg font-bold text-zinc-900 mt-4 mb-2 font-display" {...props} />,
                    strong: ({node, ...props}) => <strong className="font-bold text-zinc-900" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-4 space-y-1 marker:text-emerald-500" {...props} />,
                    li: ({node, ...props}) => <li className="pl-1" {...props} />,
                }}
              >
                {message.content}
              </ReactMarkdown>
            )}
            
            {message.isStreaming && (
              <div className="inline-flex items-center gap-1.5 mt-2 h-4">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></span>
              </div>
            )}
          </div>

          {/* AI Actions Toolbar (Outside the text block for cleaner look) */}
          {!isUser && !message.isStreaming && message.content && (
             <div className="flex items-center gap-1 mt-2 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button 
                  onClick={handleCopy}
                  className="p-1.5 text-zinc-400 hover:text-zinc-700 transition-colors rounded-lg hover:bg-zinc-100 flex items-center gap-1.5 text-xs font-medium" 
                  title="Copy"
                >
                   {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                
                {onRegenerate && (
                    <button 
                    onClick={onRegenerate}
                    className="p-1.5 text-zinc-400 hover:text-zinc-700 transition-colors rounded-lg hover:bg-zinc-100" 
                    title="Regenerate"
                    >
                    <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                )}

                <div className="h-3 w-px bg-zinc-200 mx-1"></div>

                <button 
                    onClick={() => setFeedback(feedback === 'up' ? null : 'up')}
                    className={`p-1.5 transition-colors rounded-lg hover:bg-zinc-100 ${feedback === 'up' ? 'text-emerald-600 bg-emerald-50' : 'text-zinc-400 hover:text-zinc-700'}`}
                >
                   <ThumbsUp className="w-3.5 h-3.5" fill={feedback === 'up' ? 'currentColor' : 'none'} />
                </button>
                <button 
                    onClick={() => setFeedback(feedback === 'down' ? null : 'down')}
                    className={`p-1.5 transition-colors rounded-lg hover:bg-zinc-100 ${feedback === 'down' ? 'text-red-500 bg-red-50' : 'text-zinc-400 hover:text-zinc-700'}`}
                >
                   <ThumbsDown className="w-3.5 h-3.5" fill={feedback === 'down' ? 'currentColor' : 'none'} />
                </button>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;