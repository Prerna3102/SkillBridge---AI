import {Bot,UserCircle} from"lucide-react";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, ThumbsUp, ThumbsDown } from "lucide-react";

export default function CareerAssistant() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastQuestion, setLastQuestion] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "👋 Hi! I'm your AI Career Assistant. Ask me anything about placements, resume, interviews or career roadmap.",
    },
  ]);

  const clearChat = () => {
  const welcomeMessage = [
    {
      sender: "ai",
      text: "👋 Hi! I'm your AI Career Assistant. Ask me anything about placements, resume, interviews or career roadmap.",
    },
  ];

  setMessages(welcomeMessage);
  localStorage.removeItem("chatHistory");
};
  const feedback = async (type: string) => {
  console.log("Feedback:", type);

  if (type === "like") {
    alert("😊 Thanks for your feedback!");
    return;
  }

  console.log("Last Question:", lastQuestion);

  if (!lastQuestion) return;

  setLoading(true);

  const response = await fetch("http://127.0.0.1:5000/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message:
        "Explain this in a much simpler and more detailed way: " +
        lastQuestion,
    }),
  });

  const data = await response.json();

  setMessages((prev) => [
    ...prev,
    {
      sender: "ai",
      text: "🔄 Improved Answer:\n\n" + data.reply,
    },
  ]);

  setLoading(false);
};

const copyMessage = (text: string) => {
  navigator.clipboard.writeText(text);
  alert("✅ Copied!");
};
  
  useEffect(() => {
  const saved = localStorage.getItem("chatHistory");

  if (saved) {
    setMessages(JSON.parse(saved));
  }
}, []);

useEffect(() => {
  localStorage.setItem(
    "chatHistory",
    JSON.stringify(messages)
  );
}, [messages]);

  const sendMessage = async (customMessage?: string) => {
    const text = customMessage || message;
    setLastQuestion(text);

    if (text.trim() === "") return;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: text,
      },
    ]);

    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
        }),
      });



      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: data.reply,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "❌ Unable to connect to AI backend.",
        },
      ]);
    }

    setLoading(false);
    setMessage("");
  };
  return (
  <div className="space-y-6">

    <Card className="p-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-xl">
      <div className="flex justify-between items-center">
  <h2 className="text-2xl font-bold">
    🤖 AI Career Assistant
  </h2>

  <Button
  variant="destructive"
  size="sm"
  className="rounded-full px-5 shadow-md"
  onClick={clearChat}
>
    🗑️ Clear Chat
  </Button>
</div>
      <p className="text-blue-100 mt-2">
        Ask anything about placements, resume, interviews or skills.
      </p>

      <div className="flex items-center gap-2 mt-2 text-green-300 text-sm">
  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
  AI Assistant Online
</div>
    </Card>

    {/* Suggested Questions */}
    <div className="flex flex-wrap gap-2">

      <Button
        variant="outline"
        className="rounded-full shadow-md hover:scale-105 transition-all"
        onClick={() =>
          sendMessage("Review my resume and suggest improvements.")
        }
      >
        📄 Resume Review
      </Button>

      <Button
        variant="outline"
        className="rounded-full shadow-md hover:scale-105 transition-all"
        onClick={() =>
          sendMessage("Suggest 5 unique placement projects for IT students.")
        }
      >
        💼 Best Placement Projects
      </Button>

      <Button
        variant="outline"
        className="rounded-full shadow-md hover:scale-105 transition-all"
        onClick={() =>
          sendMessage("Give me a complete Data Analyst roadmap.")
        }
      >
        📚 Data Analyst Roadmap
      </Button>

      <Button
        variant="outline"
        className="rounded-full shadow-md hover:scale-105 transition-all"
        onClick={() =>
          sendMessage("Ask me common fresher interview questions.")
        }
      >
        🎤 Interview Questions
      </Button>

      <Button
        variant="outline"
        className="rounded-full shadow-md hover:scale-105 transition-all"
        onClick={() =>
          sendMessage("Suggest skills I should improve for placements.")
        }
      >
        🧠 Improve My Skills
      </Button>

    </div>

    {/* Chat Box */}
    <Card className="p-6 h-[520px] overflow-y-auto rounded-3xl shadow-xl">

      <div className="space-y-4">

        {messages.map((msg, index) => (
          <div
  className={`flex items-start gap-3 ${
    msg.sender === "user"
      ? "justify-end"
      : "justify-start"
  }`}
>
  {msg.sender === "ai" && (
  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0">
    <Bot size={20} />
  </div>
)}
            <div
              className={`max-w-[75%] rounded-2xl px-5 py-4 shadow-md ${
  msg.sender === "user"
    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
    : "bg-white border border-gray-200"
}`}
            >
              {msg.text}
              {msg.sender === "ai" && (
  <div className="flex gap-2 mt-3">
    <Button
      size="sm"
      variant="outline"
      onClick={() => copyMessage(msg.text)}
    >
      <Copy className="w-4 h-4 mr-1" />
      Copy
    </Button>

    <Button
  size="sm"
  variant="outline"
  onClick={() => feedback("like")}
>
  <ThumbsUp className="w-4 h-4" />
</Button>

<Button
  size="sm"
  variant="outline"
  onClick={() => {
    alert("Dislike button clicked");
    feedback("dislike");
  }}
>
  <ThumbsDown className="w-4 h-4" />
</Button>
  </div>
)}
            </div>
            {msg.sender === "user" && (
  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-lg animate-pulse shrink-0">
    <UserCircle size={20} />
  </div>
)}
          </div>
        ))}

       
        {loading && (
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white animate-pulse">
      <Bot size={20} />
    </div>

    <div className="bg-white border rounded-2xl px-5 py-4 shadow-md">
      <div className="flex gap-1">
        <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"></span>
        <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:0.2s]"></span>
        <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:0.4s]"></span>
      </div>
    </div>
  </div>
)}

      </div>

    </Card>

    {/* Input */}
    <div className="rounded-full h-12 px-5 shadow-md">

      <Input
      className="rounded-full h-12 px-5 shadow-md border-2 border-blue-200 focus:border-blue-500"
        placeholder="Ask your career questions..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage();
          }
        }}
      />


      <Button
  onClick={() => sendMessage()}
  className="rounded-full px-8 bg-gradient-to-r from-blue-600 to-purple-600"
>
  🚀 Send
</Button>

    </div>

  </div>
);
}