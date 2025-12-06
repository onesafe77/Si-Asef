import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { User, ShieldCheck, Copy, Check, RotateCcw, FileText, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Message, Role } from '../types';

interface ChatBubbleProps {
  message: Message;
  onRegenerate?: () => void;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, onRegenerate }) => {
  const isUser = message.role === Role.USER;
  const [copied, setCopied] = useState(false);

  // Determine states
  const isThinking = message.role === Role.MODEL && message.isStreaming && !message.content;
  const isTyping = message.role === Role.MODEL && message.isStreaming && message.content;

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`w-full py-4 md:py-8 px-4 ${isUser ? '' : 'bg-transparent'}`}>
      <div className={`max-w-3xl mx-auto flex gap-4 md:gap-6 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Avatar / Icon */}
        <div className="flex-shrink-0 flex flex-col pt-1">
          {isUser ? (
             <div className="w-8 h-8 bg-zinc-200/50 rounded-full text-zinc-500 flex items-center justify-center border border-zinc-200">
                <span className="font-bold text-xs">US</span>
             </div>
          ) : (
             <div className="w-8 h-8 rounded-lg text-emerald-700 flex items-center justify-center mt-1">
                <ShieldCheck className="w-6 h-6" strokeWidth={2} />
             </div>
          )}
        </div>

        {/* Content Bubble */}
        <div className={`
            relative flex-1 overflow-hidden group 
            ${isUser ? 'flex justify-end' : ''}
        `}>
          <div className={`
             text-[16px] max-w-full
             ${isUser 
                ? 'bg-[#F4F4F5] text-zinc-800 px-5 py-3.5 rounded-2xl rounded-tr-sm font-sans leading-relaxed max-w-[85%]' 
                : 'bg-transparent text-zinc-800 prose-content pl-0 w-full'}
          `}>
             
             {/* Name for AI only - distinct Claude style header */}
             {!isUser && (
                <div className="font-bold text-sm text-zinc-900 mb-4 select-none font-sans tracking-wide flex items-center gap-2">
                    Si Asef
                </div>
             )}

             {/* If user sent an image */}
             {isUser && message.content.startsWith('[Attachment]') && (
                <div className="mb-3">
                    <div className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-zinc-200 text-xs font-medium text-zinc-600 shadow-sm">
                        <FileText className="w-4 h-4 text-emerald-500" />
                        <span>Image Uploaded</span>
                    </div>
                </div>
             )}

            {isUser ? (
              <p className="whitespace-pre-wrap">{message.content.replace('[Attachment] ', '')}</p>
            ) : (
              <>
                {/* Thinking State */}
                {isThinking && (
                    <div className="flex items-center gap-3 py-2 animate-fade-in-up">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                        </span>
                        <span className="text-zinc-400 text-sm font-medium animate-pulse font-sans">Menelusuri regulasi...</span>
                    </div>
                )}

                {/* Actual Content - Claude Style: Serif Body, Sans Headers */}
                {message.content && (
                    <div className="markdown-body font-serif text-[#2D2D2D]">
                         <ReactMarkdown 
                            components={{
                                // Headings are Sans-Serif for contrast (Claude style)
                                h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-zinc-900 mt-8 mb-4 font-sans tracking-tight" {...props} />,
                                h2: ({node, ...props}) => <h2 className="text-xl font-bold text-zinc-900 mt-8 mb-4 font-sans tracking-tight" {...props} />,
                                h3: ({node, ...props}) => <h3 className="text-lg font-bold text-zinc-900 mt-6 mb-3 font-sans tracking-tight" {...props} />,
                                
                                // Body text is Serif (Merriweather)
                                p: ({node, ...props}) => <p className="mb-5 leading-8 text-zinc-800 font-serif text-[16px]" {...props} />,
                                strong: ({node, ...props}) => <strong className="font-bold text-zinc-900" {...props} />,
                                
                                // Lists
                                ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-6 space-y-2 marker:text-zinc-400 font-serif leading-7" {...props} />,
                                ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-6 space-y-2 marker:text-zinc-500 font-serif leading-7" {...props} />,
                                li: ({node, ...props}) => <li className="pl-1" {...props} />,
                                
                                // Blockquotes
                                blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-emerald-500/50 pl-4 italic text-zinc-600 my-6 bg-zinc-50/50 py-2 rounded-r-lg" {...props} />,
                            }}
                        >
                            {message.content}
                        </ReactMarkdown>
                    </div>
                )}
                
                {/* Typing Cursor */}
                {isTyping && (
                   <span className="inline-block w-2.5 h-5 bg-emerald-500 ml-1 align-middle animate-pulse"></span>
                )}
              </>
            )}
          </div>

          {/* Claude-style Feedback Toolbar */}
          {!isUser && !message.isStreaming && message.content && (
             <div className="flex items-center gap-1 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 select-none">
                <button 
                  onClick={handleCopy} 
                  className="flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-md transition-all"
                >
                   {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                   {copied ? 'Copied' : 'Copy'}
                </button>
                
                <button 
                   onClick={onRegenerate} 
                   className="p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-md transition-all"
                   title="Regenerate"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                <div className="h-4 w-px bg-zinc-200 mx-1"></div>

                <button className="p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-md transition-all">
                  <ThumbsUp className="w-3.5 h-3.5" />
                </button>
                <button className="p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-md transition-all">
                  <ThumbsDown className="w-3.5 h-3.5" />
                </button>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;