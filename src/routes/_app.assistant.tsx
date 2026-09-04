import { createFileRoute } from "@tanstack/react-router";
import { ImagePlus, Mic, Send, Volume2 } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Disclaimer, PageHeader, SectionCard } from "@/components/ui-kit";
import { ASSISTANT_GREETING, ASSISTANT_REPLY, ASSISTANT_SUGGESTIONS, LANGUAGES, type LangCode } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/assistant")({
  head: () => ({
    meta: [
      { title: "KrishiRakshak AI Assistant — Multilingual crop help" },
      { name: "description", content: "Ask about crop symptoms in English, Hindi, Marathi, Bengali, Tamil or Telugu with voice and image support." },
      { property: "og:title", content: "KrishiRakshak AI Assistant" },
      { property: "og:description", content: "Multilingual farmer assistant with clear AI-suspicion wording." },
    ],
  }),
  component: Assistant,
});

interface Msg {
  id: number;
  from: "user" | "ai";
  text: string;
}

function Assistant() {
  const [lang, setLang] = useState<LangCode>("hi");
  const [messages, setMessages] = useState<Msg[]>([{ id: 0, from: "ai", text: ASSISTANT_GREETING.hi }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const turn = useRef(0);

  const switchLang = (code: LangCode) => {
    setLang(code);
    setMessages([{ id: Date.now(), from: "ai", text: ASSISTANT_GREETING[code] }]);
    turn.current = 0;
  };

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { id: Date.now(), from: "user", text }]);
    setInput("");
    setTyping(true);
    const replies = ASSISTANT_REPLY[lang];
    const reply = replies[turn.current % replies.length];
    turn.current += 1;
    window.setTimeout(() => {
      setMessages((m) => [...m, { id: Date.now() + 1, from: "ai", text: reply }]);
      setTyping(false);
    }, 900);
  };

  return (
    <>
      <PageHeader
        eyebrow="Advise"
        title="KrishiRakshak AI Assistant"
        description="Ask in your own language. The assistant always separates AI suspicion from confirmed diagnosis."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_18rem]">
        <SectionCard bodyClassName="p-0" className="flex flex-col">
          <div className="flex flex-wrap gap-1.5 border-b border-border p-3">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => switchLang(l.code)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                  lang === l.code
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:bg-muted",
                )}
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="flex min-h-[26rem] flex-1 flex-col gap-3 overflow-y-auto p-5">
            {messages.map((m) => (
              <div key={m.id} className={cn("flex", m.from === "user" ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                    m.from === "user"
                      ? "rounded-br-sm bg-primary text-primary-foreground"
                      : "rounded-bl-sm border border-border bg-muted/60",
                  )}
                >
                  {m.text}
                  {m.from === "ai" ? (
                    <button
                      onClick={() => toast.info("Reading aloud (demo)")}
                      className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-primary"
                    >
                      <Volume2 className="size-3.5" /> Read aloud
                    </button>
                  ) : null}
                </div>
              </div>
            ))}
            {typing ? (
              <div className="flex gap-1.5 rounded-2xl border border-border bg-muted/60 px-4 py-3 w-fit">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="size-1.5 animate-bounce rounded-full bg-primary"
                    style={{ animationDelay: `${i * 120}ms` }}
                  />
                ))}
              </div>
            ) : null}
          </div>

          <div className="border-t border-border p-3">
            <div className="mb-2 flex flex-wrap gap-1.5">
              {ASSISTANT_SUGGESTIONS[lang].map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted"
                >
                  {s}
                </button>
              ))}
            </div>
            <form
              className="flex items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
            >
              <Button type="button" size="icon" variant="outline" onClick={() => toast.info("Voice input listening (demo)")}>
                <Mic className="size-4" />
              </Button>
              <Button type="button" size="icon" variant="outline" onClick={() => toast.info("Attach a crop image (demo)")}>
                <ImagePlus className="size-4" />
              </Button>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question…"
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Send className="size-4" />
              </Button>
            </form>
          </div>
        </SectionCard>

        <div className="space-y-6">
          <SectionCard title="What I can help with">
            <ul className="space-y-2 text-sm text-foreground/80">
              {[
                "Explain symptoms from a photo",
                "Read your current risk forecast",
                "Walk through IPM steps",
                "Prepare an expert validation request",
                "Explain a lab result in simple words",
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                  {t}
                </li>
              ))}
            </ul>
          </SectionCard>
          <Disclaimer text="The assistant shares AI suspicions only. Confirmed diagnosis requires expert or laboratory review, and chemical advice must follow locally approved guidance and product labels." />
        </div>
      </div>
    </>
  );
}
