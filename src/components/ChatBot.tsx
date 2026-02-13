import { useState } from "react";

type Message = {
    role: "user" | "assistant";
    content: string;
};

export default function ChatBot() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage: Message = { role: "user", content: input };
        setMessages((prev) => [...prev, userMessage]);
        setLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input }),
            });

            const data: { reply: string } = await response.json();

            const botMessage: Message = { role: "assistant", content: data.reply };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error("Erreur :", error);
        }

        setInput("");
        setLoading(false);
    };

    return (
        <div
            style={{
                position: "fixed",
                bottom: 20,
                right: 20,
                width: 350,
                background: "white",
                borderRadius: 12,
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                padding: 10,
                zIndex: 9999,
            }}
        >
            <div
                style={{
                    minHeight: 220,
                    maxHeight: 320,
                    overflowY: "auto",
                    border: "1px solid #eee",
                    padding: 10,
                    marginBottom: 10,
                    borderRadius: 10,
                }}
            >
                {messages.length === 0 && (
                    <p style={{ margin: 0, opacity: 0.7 }}>
                        👋 Salut ! Pose-moi une question sur mon parcours, mes projets ou mes
                        compétences.
                    </p>
                )}

                {messages.map((msg, index) => (
                    <div key={index} style={{ marginBottom: 8 }}>
                        <strong>{msg.role === "user" ? "Moi" : "Bot"}:</strong>{" "}
                        {msg.content}
                    </div>
                ))}

                {loading && <p style={{ margin: 0 }}>Le bot réfléchit...</p>}
            </div>

            <div style={{ display: "flex", gap: 8 }}>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Pose une question..."
                    style={{
                        flex: 1,
                        padding: "8px 10px",
                        borderRadius: 10,
                        border: "1px solid #ddd",
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") sendMessage();
                    }}
                />
                <button
                    onClick={sendMessage}
                    style={{
                        padding: "8px 12px",
                        borderRadius: 10,
                        border: "1px solid #ddd",
                        cursor: "pointer",
                    }}
                >
                    Envoyer
                </button>
            </div>
        </div>
    );
}