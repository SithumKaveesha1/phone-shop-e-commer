import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Trash2, Globe } from 'lucide-react';
import ChatMessage from './ChatMessage';
import { Button } from './ui/button';
import { Input } from './ui/input';

const translations = {
    EN: {
        greeting: "Hello! I'm your Ekart Shopping Assistant. How can I help you today?",
        placeholder: "Type your message here...",
        typing: "Typing...",
        clear: "Chat cleared. How else can I help you?",
        online: "Always Online",
        header: "Ekart Assistant",
        responses: {
            hi: "Hi there! Looking for anything specific in our catalog?",
            product: "We have a wide range of electronics, fashion, and home decor. You can check the 'Products' page for more!",
            price: "Our prices are very competitive! Many items have discounts right now.",
            shipping: "We offer free delivery on most orders above LKR 5000!",
            return: "We have a 30-day easy return policy for all unused items.",
            default: "That's interesting! I'm still learning, but I can help you find products or answer questions about your orders."
        }
    },
    ES: {
        greeting: "¡Hola! Soy tu asistente de compras Ekart. ¿Cómo puedo ayudarte hoy?",
        placeholder: "Escribe tu mensaje aquí...",
        typing: "Escribiendo...",
        clear: "Chat borrado. ¿En qué más puedo ayudarte?",
        online: "Siempre en línea",
        header: "Asistente de Ekart",
        responses: {
            hi: "¡Hola! ¿Buscas algo específico en nuestro catálogo?",
            product: "¡Tenemos una amplia gama de electrónica, moda y decoración para el hogar! ¡Consulta la página de 'Productos' para más!",
            price: "¡Nuestros precios son muy competitivos! Muchos artículos tienen descuentos ahora.",
            shipping: "¡Ofrecemos entrega gratuita en la mayoría de los pedidos superiores a LKR 5000!",
            return: "Tenemos una política de devolución fácil de 30 días para todos los artículos sin usar.",
            default: "¡Eso es interesante! Todavía estoy aprendiendo, pero puedo ayudarte a encontrar productos o responder preguntas sobre tus pedidos."
        }
    },
    FR: {
        greeting: "Bonjour ! Je suis votre assistant d'achat Ekart. Comment puis-je vous aider aujourd'hui ?",
        placeholder: "Tapez votre message ici...",
        typing: "En train d'écrire...",
        clear: "Chat effacé. Comment puis-je vous aider d'autre ?",
        online: "Toujours en ligne",
        header: "Assistant Ekart",
        responses: {
            hi: "Bonjour ! Vous cherchez quelque chose de spécifique dans notre catalogue ?",
            product: "Nous avons une large gamme d'électronique, de mode et de décoration intérieure. Consultez la page 'Produit' pour en savoir plus !",
            price: "Nos prix sont très compétitifs ! De nombreux articles sont en promotion en ce moment.",
            shipping: "Nous offrons la livraison gratuite sur la plupart des commandes de plus de LKR 5000 !",
            return: "Nous avons une politique de retour facile de 30 jours pour tous les articles non utilisés.",
            default: "C'est intéressant ! J'apprends encore, mais je peux vous aider à trouver des produits ou à répondre à vos questions sur vos commandes."
        }
    },
    DE: {
        greeting: "Hallo! Ich bin Ihr Ekart-Shopping-Assistent. Wie kann ich Ihnen heute helfen?",
        placeholder: "Geben Sie hier Ihre Nachricht ein...",
        typing: "Schreiben...",
        clear: "Chat gelöscht. Wie kann ich Ihnen sonst noch helfen?",
        online: "Immer online",
        header: "Ekart-Assistent",
        responses: {
            hi: "Hallo! Suchen Sie etwas Bestimmtes in unserem Katalog?",
            product: "Wir haben ein breites Sortiment an Elektronik, Mode und Wohnkultur. Weitere Informationen finden Sie auf der Seite 'Produkte'!",
            price: "Unsere Preise sind sehr wettbewerbsfähig! Viele Artikel sind derzeit reduziert.",
            shipping: "Wir bieten kostenlose Lieferung für die meisten Bestellungen über LKR 5000 an!",
            return: "Wir haben ein 30-tägiges einfaches Rückgaberecht für alle unbenutzten Artikel.",
            default: "Das ist interessant! Ich lerne noch, aber ich kann Ihnen helfen, Produkte zu finden oder Fragen zu Ihren Bestellungen zu beantworten."
        }
    },
    SI: {
        greeting: "ආයුබෝවන්! මම ඔබේ Ekart සාප්පු සහායකයා. අද මම ඔබට උදව් කරන්නේ කෙසේද?",
        placeholder: "ඔබේ පණිවිඩය මෙහි ටයිප් කරන්න...",
        typing: "ලියමින් සිටී...",
        clear: "පණිවිඩ ඉවත් කරන ලදී. ඔබට තවදුරටත් උදව් කරන්නේ කෙසේද?",
        online: "සෑම විටම සබැඳිව",
        header: "Ekart සහායක",
        responses: {
            hi: "ආයුබෝවන්! ඔබ අපගේ නාමාවලියෙහි විශේෂ යමක් සොයන්නේද?",
            product: "අප සතුව ඉලෙක්ට්‍රොනික උපකරණ, විලාසිතා සහ ගෘහ අලංකරණ පුළුල් පරාසයක් ඇත. වැඩිදුර සඳහා 'නිෂ්පාදන' පිටුව බලන්න!",
            price: "අපගේ මිල ගණන් ඉතා තරඟකාරී ය! බොහෝ භාණ්ඩ සඳහා මේ වන විට වට්ටම් ඇත.",
            shipping: "LKR 5000 ට වැඩි බොහෝ ඇණවුම් සඳහා අපි නොමිලේ බෙදා හැරීම ලබා දෙන්නෙමු!",
            return: "භාවිතා නොකළ සියලුම භාණ්ඩ සඳහා අපට දින 30ක පහසු ආපසු හැරවීමේ ප්‍රතිපත්තියක් ඇත.",
            default: "එය සිත්ගන්නා සුළුය! මම තවමත් ඉගෙන ගනිමින් සිටිමි, නමුත් ඔබට නිෂ්පාදන සොයා ගැනීමට හෝ ඔබේ ඇණවුම් පිළිබඳ ප්‍රශ්නවලට පිළිතුරු දීමට මට උදව් කළ හැකිය."
        }
    }
};

const MultiLangChatbot = ({ embed = false }) => {
    const [lang, setLang] = useState('EN');
    const [messages, setMessages] = useState([
        { text: translations[lang].greeting, isBot: true }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    const t = translations[lang];

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    // Update initial message when language changes
    useEffect(() => {
        if (messages.length === 1) {
            setMessages([{ text: translations[lang].greeting, isBot: true }]);
        }
    }, [lang]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { text: input, isBot: false };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        setTimeout(() => {
            const botResponse = getMockResponse(input);
            setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
            setIsTyping(false);
        }, 1200);
    };

    const getMockResponse = (userInput) => {
        const lowerInput = userInput.toLowerCase();
        const r = t.responses;

        if (lowerInput.includes('hi') || lowerInput.includes('hello') || lowerInput.includes('hola') || lowerInput.includes('ආයුබෝවන්')) return r.hi;
        if (lowerInput.includes('product') || lowerInput.includes('item') || lowerInput.includes('භාණ්ඩ')) return r.product;
        if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('මිල')) return r.price;
        if (lowerInput.includes('shipping') || lowerInput.includes('delivery') || lowerInput.includes('නැව්ගත')) return r.shipping;
        if (lowerInput.includes('return') || lowerInput.includes('refund') || lowerInput.includes('ආපසු')) return r.return;
        
        return r.default;
    };

    const clearChat = () => {
        setMessages([{ text: t.clear, isBot: true }]);
    };

    return (
        <div className={`flex flex-col h-full bg-white transition-all duration-500 overflow-hidden ${embed ? 'rounded-2xl border border-gray-100 shadow-sm' : 'rounded-3xl shadow-xl shadow-pink-100 border border-pink-100/50'}`}>
            
            {/* Header */}
            <header className="p-4 md:p-6 bg-white border-b border-gray-50 flex justify-between items-center bg-gradient-to-r from-white to-pink-50/30">
                <div className="flex items-center gap-3 md:gap-4">
                    <div className={`bg-pink-600 rounded-xl md:rounded-2xl flex items-center justify-center text-white shadow-lg shadow-pink-100 ${embed ? 'w-10 h-10' : 'w-12 h-12'}`}>
                        <Sparkles size={embed ? 20 : 24} />
                    </div>
                    <div>
                        <h2 className={`${embed ? 'text-lg' : 'text-xl'} font-bold text-gray-900 leading-none`}>{t.header}</h2>
                        <div className="flex items-center gap-1.5 mt-1">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t.online}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {/* Language Selector */}
                    <div className="relative group">
                        <Button variant="ghost" size="sm" className="h-9 px-2 gap-2 text-gray-500 hover:text-pink-600 hover:bg-pink-50 rounded-lg">
                            <Globe size={18} />
                            <span className="text-xs font-bold">{lang}</span>
                        </Button>
                        <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                            <div className="bg-white border border-gray-100 rounded-xl shadow-xl p-2 min-w-[120px]">
                                {Object.keys(translations).map(l => (
                                    <button
                                        key={l}
                                        onClick={() => setLang(l)}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-colors ${lang === l ? 'bg-pink-600 text-white' : 'text-gray-600 hover:bg-pink-50 hover:text-pink-600'}`}
                                    >
                                        {l === 'EN' ? 'English' : l === 'ES' ? 'Español' : l === 'FR' ? 'Français' : l === 'DE' ? 'Deutsch' : 'සිංහල'}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={clearChat}
                        className="h-9 w-9 text-gray-400 hover:text-pink-600 hover:bg-pink-50 rounded-lg"
                    >
                        <Trash2 size={18} />
                    </Button>
                </div>
            </header>

            {/* Messages */}
            <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 scroll-smooth bg-white"
            >
                {messages.map((msg, index) => (
                    <ChatMessage key={index} message={msg.text} isBot={msg.isBot} />
                ))}
                {isTyping && (
                    <div className="flex items-center gap-2 text-pink-600 font-medium ml-12 mb-4">
                        <div className="flex gap-1">
                            <span className="w-1.5 h-1.5 bg-pink-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="w-1.5 h-1.5 bg-pink-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="w-1.5 h-1.5 bg-pink-600 rounded-full animate-bounce"></span>
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-widest opacity-70">{t.typing}</span>
                    </div>
                )}
            </div>

            {/* Input */}
            <footer className="p-4 md:p-6 bg-white border-t border-gray-50">
                <div className="flex gap-3 md:gap-4 items-center bg-gray-50/50 p-2 pl-4 md:pl-6 rounded-2xl border border-gray-100 focus-within:border-pink-200 focus-within:ring-4 focus-within:ring-pink-50 transition-all">
                    <input 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder={t.placeholder}
                        className="flex-1 border-none bg-transparent shadow-none focus:outline-none h-10 md:h-12 text-sm md:text-base text-gray-700 placeholder:text-gray-400 font-medium"
                    />
                    <Button 
                        onClick={handleSend}
                        disabled={!input.trim() || isTyping}
                        className="w-10 h-10 md:w-12 md:h-12 bg-pink-600 hover:bg-pink-700 text-white rounded-xl shadow-lg shadow-pink-100 transition-transform active:scale-95 disabled:opacity-50 disabled:scale-100"
                    >
                        <Send size={embed ? 18 : 20} />
                    </Button>
                </div>
            </footer>
        </div>
    );
};

export default MultiLangChatbot;
