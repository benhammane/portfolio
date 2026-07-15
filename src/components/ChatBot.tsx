import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, MessageCircle, Send, Sparkles, X } from 'lucide-react';
import { useClickSound } from '@/hooks/useClickSound';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const WELCOME_MESSAGE: Message = {
  role: 'assistant',
  content:
    "Salut ! Je suis l'assistant IA du portfolio d'Amine. Pose-moi une question sur ses projets, ses compétences ou son parcours.",
};

/** Trois points qui pulsent en cascade pendant que l'assistant répond. */
const TypingDots = () => (
  <div className="flex items-center gap-1 px-1 py-1">
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        className="h-1.5 w-1.5 rounded-full bg-brand/70"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
      />
    ))}
  </div>
);

const ChatBot = () => {
  const { playClick } = useClickSound();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, open, loading]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setErrorMsg(null);
    const nextMessages = [...messages, { role: 'user' as const, content: text }];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // On envoie l'historique (hors message de bienvenue) pour garder le contexte de la conversation.
        body: JSON.stringify({ message: text, history: nextMessages.slice(1, -1) }),
      });

      if (!response.ok) {
        const maybeJson = await response.json().catch(() => ({ error: 'Erreur API' }));
        throw new Error(maybeJson?.error || `Erreur API (${response.status})`);
      }

      const data: { reply?: string } = await response.json();
      const reply = (data.reply ?? '').trim();
      if (!reply) throw new Error('Réponse vide (API). Vérifie /api/chat.');

      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur inconnue';
      console.error(err);
      setErrorMsg(message);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "Oups, je n'arrive pas à répondre pour l'instant. Réessaie dans quelques secondes.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const toggleOpen = () => {
    playClick();
    setOpen((o) => !o);
  };

  return (
    <>
      {/* Bouton flottant */}
      <motion.button
        onClick={toggleOpen}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        aria-label={open ? "Fermer l'assistant" : "Ouvrir l'assistant IA"}
        title="Assistant IA"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-brand-gradient text-primary-foreground shadow-[0_10px_30px_-6px_hsl(var(--brand)/0.55)] transition-shadow hover:shadow-[0_14px_38px_-4px_hsl(var(--brand)/0.7)] sm:bottom-6 sm:right-6"
      >
        {/* halo qui respire, coupé si l'utilisateur préfère moins d'animation */}
        <span className="pointer-events-none absolute inset-0 rounded-full bg-brand-gradient opacity-60 blur-md motion-safe:animate-pulse" />
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? 'close' : 'chat'}
            initial={{ opacity: 0, rotate: -45, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 45, scale: 0.6 }}
            transition={{ duration: 0.18 }}
            className="relative"
          >
            {open ? <X size={22} /> : <MessageCircle size={22} />}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      {/* Fenêtre de chat */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-5 z-40 flex w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-3xl glass border-gradient shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] sm:bottom-28 sm:right-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 border-b border-border/60 bg-card/40 px-4 py-3.5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/10 text-brand ring-1 ring-brand/20">
                  <Bot size={18} />
                </div>
                <div>
                  <p className="flex items-center gap-1.5 font-display text-sm font-semibold">
                    Assistant IA
                    <Sparkles size={12} className="text-brand" />
                  </p>
                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${loading ? 'bg-amber-400' : 'bg-emerald-400'}`}
                    />
                    {loading ? 'Réfléchit…' : 'En ligne'}
                  </p>
                </div>
              </div>
              <button
                onClick={toggleOpen}
                aria-label="Fermer l'assistant"
                className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div ref={listRef} className="flex h-[360px] flex-col gap-3 overflow-y-auto px-4 py-4">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'self-end rounded-br-md bg-brand-gradient text-primary-foreground'
                      : 'self-start rounded-bl-md border border-border/60 bg-secondary/40 text-foreground'
                  }`}
                >
                  {m.content}
                </div>
              ))}

              {loading && (
                <div className="self-start rounded-2xl rounded-bl-md border border-border/60 bg-secondary/40">
                  <TypingDots />
                </div>
              )}

              {errorMsg && (
                <p className="mt-1 text-xs text-destructive/90">⚠ {errorMsg}</p>
              )}
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 border-t border-border/60 bg-card/40 p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Pose une question…"
                aria-label="Votre message à l'assistant IA"
                className="flex-1 rounded-full border border-border bg-background/40 px-4 py-2.5 text-sm placeholder:text-muted-foreground/60 focus:border-brand/50 focus:outline-none focus:ring-2 focus:ring-brand/30"
              />
              <motion.button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                whileHover={{ scale: loading || !input.trim() ? 1 : 1.06 }}
                whileTap={{ scale: loading || !input.trim() ? 1 : 0.94 }}
                aria-label="Envoyer le message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-primary-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send size={16} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
