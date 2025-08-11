"use client";

import { useState, useEffect } from "react";
import { Send, Bot, User, Sparkles, Zap, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const demoMessages = [
  {
    id: 1,
    type: "user" as const,
    content: "Help me write a marketing email for my new product launch",
    timestamp: "2:34 PM",
  },
  {
    id: 2,
    type: "ai" as const,
    content:
      'I\'d be happy to help you create a compelling marketing email! Here\'s a structure that typically works well for product launches:\n\n**Subject Line Ideas:**\n• "🚀 It\'s here: [Product Name] is finally live!"\n• "The wait is over - introducing [Product Name]"\n\n**Email Structure:**\n1. **Hook** - Start with excitement or a problem statement\n2. **Product Introduction** - What it is and why it matters\n3. **Key Benefits** - 3-4 main value propositions\n4. **Social Proof** - Testimonials or early user feedback\n5. **Clear CTA** - "Get Started Now" or "Shop Now"\n\nWould you like me to help you customize this for your specific product?',
    timestamp: "2:34 PM",
  },
  {
    id: 3,
    type: "user" as const,
    content: "That's perfect! Can you help me with the subject line?",
    timestamp: "2:35 PM",
  },
];

export const ChatDemo = () => {
  const [visibleMessages, setVisibleMessages] = useState<typeof demoMessages>(
    []
  );
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setVisibleMessages([demoMessages[0]]);
      setIsTyping(true);
    }, 1000);

    const timer2 = setTimeout(() => {
      setIsTyping(false);
      setVisibleMessages([demoMessages[0], demoMessages[1]]);
    }, 3000);

    const timer3 = setTimeout(() => {
      setVisibleMessages(demoMessages);
    }, 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const features = [
    { icon: MessageCircle, text: "Multiple AI Models" },
    { icon: Zap, text: "Lightning Fast" },
    { icon: Sparkles, text: "Smart Suggestions" },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-6 bg-card/50 backdrop-blur-sm border border-border/50 rounded-full px-6 py-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <feature.icon className="w-4 h-4 text-primary" />
              <span>{feature.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-chat border-border/50 rounded-2xl shadow-chat overflow-hidden">
        <div className="bg-card/50 border-b border-border/50 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground"> AI Assistant</h3>
              <p className="text-xs text-green-400 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                Online
              </p>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">GPT-4</div>
        </div>
        {/* chat messages */}
        <div className="h-96 overflow-y-auto scrollbar-hidden p-4 space-y-4">
          {visibleMessages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.type === "ai" && (
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              <div
                className={`max-w-[80%] ${
                  message.type === "user" ? "order-1" : ""
                } `}
              >
                <div
                  className={`p-3 rounded-2xl ${
                    message.type === "user"
                      ? "bg-primary text-primary-foreground ml-auto"
                      : "bg-card border border-border/50"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">
                    {message.content}
                  </p>
                </div>
                <div
                  className={`text-xs text-muted-foreground mt-1 ${
                    message.type === "user" ? "text-right" : "text-left"
                  }`}
                >
                  {message.timestamp}
                </div>
              </div>
              {message.type === "user" && (
                <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0 mt-1 order-2">
                  <User className="w-4 h-4 text-foreground" />
                </div>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-card border border-border/50 p-3 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* chat Inpt */}
        <div className="border-t border-border/50 p-4">
          <div className="flex gap-3 items-end">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask anything about AI tools, productivity, content creation ..."
                className="w-full bg-input border border-border/50 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              />
            </div>
            <Button
              variant="default"
              size="lg"
              disabled={!inputValue.trim()}
              className="h-12 w-12 rounded-xl shadow-glow"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
            <span>Press Enter to send, Shift + Enter for new lines</span>
            <span>Characters: {inputValue.length}/2000</span>
          </div>
        </div>
      </div>
    </div>
  );
};
