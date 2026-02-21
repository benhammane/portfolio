import { useEffect, useRef, useState } from "react";

type Message = {
    role: "user" | "assistant";
    content: string;
};

export default function ChatBot() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content:
                "Salut 👋 Je suis le chatbot du portfolio d'Amine. Pose-moi une question sur ses projets, compétences ou son parcours.",
        },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const listRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // auto-scroll en bas à chaque nouveau message
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [messages, open]);

    const sendMessage = async () => {
        const text = input.trim();
        if (!text || loading) return;

        setErrorMsg(null);

        // Ajoute le message user
        setMessages((prev) => [...prev, { role: "user", content: text }]);
        setInput("");
        setLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: text }),
            });

            // Si erreur côté API, on affiche un message utile
            if (!response.ok) {
                const maybeJson = await response
                    .json()
                    .catch(() => ({ error: "Erreur API" }));
                throw new Error(maybeJson?.error || `Erreur API (${response.status})`);
            }

            const data: { reply?: string } = await response.json();

            const reply = (data.reply ?? "").trim();
            if (!reply) {
                throw new Error("Réponse vide (API). Vérifie /api/chat.");
            }

            setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
        } catch (err: any) {
            console.error(err);
            setErrorMsg(err?.message || "Erreur inconnue");
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content:
                        "Oups, je n’arrive pas à répondre pour l’instant. Essaie encore dans quelques secondes.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    // Bouton flottant quand le chat est fermé
    if (!open) {
        return (
            <button
                onClick={() => setOpen(true)}
                style={{
                    position: "fixed",
                    bottom: 20,
                    right: 20,
                    width: 56,
                    height: 56,
                    borderRadius: 999,
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(20, 184, 166, 0.95)", // teal-ish
                    color: "#0b1220",
                    fontWeight: 700,
                    cursor: "pointer",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                    zIndex: 9999,
                }}
                aria-label="Ouvrir le chat"
                title="Ouvrir le chat"
            >
                💬
            </button>
        );
    }

    // Fenêtre chat ouverte
    return (
        <div
            style={{
                position: "fixed",
                bottom: 20,
                right: 20,
                width: 360,
                maxWidth: "calc(100vw - 40px)",
                background: "#0b1220", // dark pour matcher ton thème
                color: "#e5e7eb",
                borderRadius: 14,
                boxShadow: "0 10px 30px rgba(0,0,0,0.45)",
                border: "1px solid rgba(255,255,255,0.10)",
                overflow: "hidden",
                zIndex: 9999,
            }}
        >
            {/* Header */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 12px",
                    background: "rgba(255,255,255,0.04)",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                }}
            >
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <div
                        style={{
                            width: 10,
                            height: 10,
                            borderRadius: 999,
                            background: loading ? "#fbbf24" : "#34d399",
                            boxShadow: "0 0 0 3px rgba(52,211,153,0.15)",
                        }}
                    />
                    <div style={{ fontWeight: 700 }}>Assistant Portfolio</div>
                </div>

                <button
                    onClick={() => setOpen(false)}
                    style={{
                        background: "transparent",
                        color: "#e5e7eb",
                        border: "none",
                        cursor: "pointer",
                        fontSize: 18,
                        lineHeight: 1,
                    }}
                    aria-label="Fermer le chat"
                    title="Fermer"
                >
                    ✕
                </button>
            </div>

            {/* Messages */}
            <div
                ref={listRef}
                style={{
                    padding: 12,
                    height: 320,
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                }}
            >
                {messages.map((m, idx) => {
                    const isUser = m.role === "user";
                    return (
                        <div
                            key={idx}
                            style={{
                                alignSelf: isUser ? "flex-end" : "flex-start",
                                maxWidth: "85%",
                                padding: "10px 12px",
                                borderRadius: 14,
                                background: isUser
                                    ? "rgba(20,184,166,0.9)"
                                    : "rgba(255,255,255,0.07)",
                                color: isUser ? "#071016" : "#e5e7eb",
                                border: "1px solid rgba(255,255,255,0.10)",
                                whiteSpace: "pre-wrap",
                                wordBreak: "break-word",
                            }}
                        >
                            {m.content}
                        </div>
                    );
                })}

                {loading && (
                    <div
                        style={{
                            alignSelf: "flex-start",
                            maxWidth: "85%",
                            padding: "10px 12px",
                            borderRadius: 14,
                            background: "rgba(255,255,255,0.07)",
                            border: "1px solid rgba(255,255,255,0.10)",
                        }}
                    >
                        … Le bot réfléchit
                    </div>
                )}

                {errorMsg && (
                    <div
                        style={{
                            marginTop: 6,
                            fontSize: 12,
                            color: "#fca5a5",
                            opacity: 0.95,
                        }}
                    >
                        ⚠️ {errorMsg}
                    </div>
                )}
            </div>

            {/* Input */}
            <div
                style={{
                    display: "flex",
                    gap: 8,
                    padding: 12,
                    borderTop: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.03)",
                }}
            >
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Pose une question…"
                    style={{
                        flex: 1,
                        padding: "10px 12px",
                        borderRadius: 12,
                        border: "1px solid rgba(255,255,255,0.14)",
                        background: "rgba(0,0,0,0.25)",
                        color: "#e5e7eb",
                        outline: "none",
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") sendMessage();
                    }}
                />
                <button
                    onClick={sendMessage}
                    disabled={loading || !input.trim()}
                    style={{
                        padding: "10px 12px",
                        borderRadius: 12,
                        border: "1px solid rgba(255,255,255,0.14)",
                        cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                        background:
                            loading || !input.trim()
                                ? "rgba(255,255,255,0.06)"
                                : "rgba(20,184,166,0.95)",
                        color: loading || !input.trim() ? "#9ca3af" : "#071016",
                        fontWeight: 700,
                    }}
                >
                    Envoyer
                </button>
            </div>
        </div>
    );
}