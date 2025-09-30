import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Bot, Volume2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { useLanguage } from './language-context';

const SpeechRecognition =
  (window.SpeechRecognition || (window as any).webkitSpeechRecognition);
const synth = window.speechSynthesis;

// Detect language of input
const detectLanguage = (text: string): 'ml' | 'en' =>
  /[\u0D00-\u0D7F]/.test(text) ? 'ml' : 'en';

// Live Weather API
const getWeatherFromAPI = async (location: string) => {
  const apiKey = "f9bdc21c95542754481ed120e88f2303"; // Your API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.cod !== 200) return null;

    return {
      summary: `Weather in ${data.name}: ${data.weather[0].description}.`,
      current: {
        temperature: `${data.main.temp}°C`,
        humidity: `${data.main.humidity}%`,
        windSpeed: `${data.wind.speed} m/s`,
      },
    };
  } catch (err) {
    console.error("Weather API error:", err);
    return null;
  }
};

// Google Gemini AI response
const getAIResponse = async (message: string, lang: 'en' | 'ml') => {
  const apiKey = "AIzaSyCJHr3zv4GgSbo1IOQvd77DNTQgra6Ca-8"; // Google Studio API key
  const payload = {
    contents: [{ role: "user", parts: [{ text: message }] }],
    systemInstruction: {
      parts: [
        {
          text: `You are a concise farming assistant for Kerala, India. Respond in ${
            lang === 'ml' ? 'Malayalam' : 'English'
          }. Provide practical advice in 3 sentences max.`,
        },
      ],
    },
  };

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const data = await res.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
  } catch (err) {
    console.error("Google AI error:", err);
    return null;
  }
};

type ChatMessage = { text: string; fromUser: boolean };

export function AiChat() {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const utteranceRef = useRef<any>(null);

  // Text-to-Speech with Malayalam support
  const speakResponse = (text: string, lang: 'en' | 'ml') => {
    if (!synth) return;
    stopSpeaking();

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;

    utterance.lang = lang === 'ml' ? 'ml-IN' : 'en-US';

    const voices = synth.getVoices();
    const voice =
      voices.find((v) =>
        v.lang.toLowerCase().includes(lang === 'ml' ? 'ml' : 'en')
      ) ||
      voices.find((v) =>
        v.lang.toLowerCase().includes('india')
      ) ||
      voices.find((v) => v.lang.startsWith(lang === 'ml' ? 'ml' : 'en'));

    if (voice) utterance.voice = voice;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    if (lang === 'ml' && !voice) {
      console.warn("Malayalam voice not available. Text will be displayed only.");
      return; // Skip speaking if no Malayalam voice
    }

    synth.speak(utterance);
  };

  const stopSpeaking = () => {
    if (synth && isSpeaking) {
      synth.cancel();
      setIsSpeaking(false);
    }
  };

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Ensure voices load
  useEffect(() => {
    if (synth) {
      synth.onvoiceschanged = () => {
        synth.getVoices();
      };
    }
  }, []);

  // Initial greeting
  useEffect(() => {
    const msg =
      language === 'ml'
        ? 'നമസ്കാരം! ഞാൻ നിങ്ങളുടെ കൃഷി സഹായി ആൻഡ് AI സഹായിയാണ്.'
        : 'Hello! I am your Krishi Sakhi AI assistant.';
    setMessages([{ text: msg, fromUser: false }]);
    speakResponse(msg, detectLanguage(msg));
  }, [language]);

  // Extract location from weather question
  const extractLocation = (text: string) => {
    const match = text.match(/in\s+([a-zA-Z]+)/i);
    if (match) return match[1];
    return 'Kochi';
  };

  const sendMessage = async (messageToSend = input) => {
    if (!messageToSend.trim()) return;

    const msgLang = detectLanguage(messageToSend);
    setMessages((current) => [
      ...current,
      { text: messageToSend, fromUser: true },
    ]);
    setInput('');
    setIsTyping(true);
    stopSpeaking();

    try {
      const lower = messageToSend.toLowerCase();
      let botResponse = '';

      if (
        ['weather', 'climate', 'rain', 'കാലാവസ്ഥ', 'മഴ'].some((k) =>
          lower.includes(k)
        )
      ) {
        const location = extractLocation(messageToSend);
        const weatherData = await getWeatherFromAPI(location);
        if (weatherData) {
          botResponse = `${weatherData.summary}\nCurrent: ${weatherData.current.temperature}, ${weatherData.current.humidity} humidity, ${weatherData.current.windSpeed} wind.`;
        } else {
          botResponse =
            msgLang === 'ml'
              ? 'ക്ഷമിക്കണം, ഇപ്പോൾ കാലാവസ്ഥ ലഭ്യമല്ല. ദയവായി വീണ്ടും ശ്രമിക്കുക.'
              : 'Unable to fetch weather at this moment. Please try again.';
        }
      } else {
        const aiResp = await getAIResponse(messageToSend, msgLang);
        botResponse =
          aiResp ||
          (msgLang === 'ml'
            ? 'ക്ഷമിക്കണം, മറുപടി ലഭിക്കാനായില്ല. വീണ്ടും ശ്രമിക്കുക.'
            : 'I am sorry, no response received. Please try again.');
      }

      setMessages((current) => [
        ...current,
        { text: botResponse, fromUser: false },
      ]);
      speakResponse(botResponse, msgLang);
    } catch (err) {
      console.error(err);
      const errorMsg =
        msgLang === 'ml'
          ? 'AI assistant-ൽ നിന്ന് മറുപടി ലഭിക്കാനായില്ല.'
          : 'Failed to get a response from the assistant.';
      setMessages((current) => [
        ...current,
        { text: errorMsg, fromUser: false },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // Speech recognition
  const startListening = () => {
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = language === 'ml' ? 'ml-IN' : 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
      sendMessage(transcript);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  const toggleListening = () => {
    isListening ? stopListening() : startListening();
  };

  return (
    <Card className="h-[70vh] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-blue-600" /> {t('aiAssistant')}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 p-0 flex flex-col">
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-4 pt-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.fromUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`p-4 rounded-lg max-w-lg ${
                    msg.fromUser
                      ? 'bg-green-600 text-white rounded-br-none'
                      : 'bg-gray-100 rounded-bl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                  {!msg.fromUser && (
                    <button
                      onClick={
                        isSpeaking
                          ? stopSpeaking
                          : () => speakResponse(msg.text, detectLanguage(msg.text))
                      }
                      className="mt-2 text-sm text-green-200 hover:text-white transition-colors"
                    >
                      <Volume2
                        className={`h-4 w-4 inline-block mr-1 ${
                          isSpeaking ? 'animate-pulse' : ''
                        }`}
                      />
                      {isSpeaking ? 'Stop' : t('speak')}
                    </button>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="p-4 rounded-lg bg-gray-100 rounded-bl-none">
                  <span className="dot-flashing"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="border-t p-4 flex items-center bg-gray-50">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder={t('typeMessage')}
            className="flex-1 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
          />
          <Button
            onClick={toggleListening}
            className={`ml-2 rounded-full px-5 ${
              isListening
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
          <Button
            onClick={() => sendMessage()}
            className="ml-2 rounded-full px-5 bg-green-600 text-white hover:bg-green-700"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </CardContent>

      <style jsx>{`
        .dot-flashing {
          position: relative;
          width: 10px;
          height: 10px;
          border-radius: 5px;
          background-color: #9880ff;
          animation: dotFlashing 1s infinite linear alternate;
        }
        .dot-flashing::before,
        .dot-flashing::after {
          content: '';
          display: inline-block;
          position: absolute;
          top: 0;
        }
        .dot-flashing::before {
          left: -15px;
          width: 10px;
          height: 10px;
          border-radius: 5px;
          background-color: #9880ff;
          animation: dotFlashing 1s infinite alternate;
        }
        .dot-flashing::after {
          left: 15px;
          width: 10px;
          height: 10px;
          border-radius: 5px;
          background-color: #9880ff;
          animation: dotFlashing 1s infinite alternate;
          animation-delay: 0.5s;
        }
        @keyframes dotFlashing {
          0%, 50%, 100% {
            background-color: #c9b1ff;
          }
        }
      `}</style>
    </Card>
  );
}
