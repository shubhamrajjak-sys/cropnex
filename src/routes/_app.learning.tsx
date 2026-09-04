import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";
import { FlowDiagram, PageHeader, ScoreBar, SectionCard, StatCard } from "@/components/ui-kit";
import { ACCURACY_TREND, CONFUSION, LEARNING_STATS } from "@/lib/demo-data";

export const Route = createFileRoute("/_app/learning")({
  head: () => ({
    meta: [
      { title: "AI Learning Center — KrishiRakshak AI" },
      { name: "description", content: "Model accuracy trend, expert and lab confirmations, corrections and the feedback loop that improves predictions." },
      { property: "og:title", content: "AI Learning Center — KrishiRakshak AI" },
      { property: "og:description", content: "Every verified field observation makes the model better." },
    ],
  }),
  component: Learning,
});

function Learning() {
  return (
    <>
      <PageHeader
        eyebrow="Learn"
        title="AI Learning Center"
        description="Verified field data closes the loop between prediction and reality."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {LEARNING_STATS.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <SectionCard title="Model accuracy trend" subtitle="Validated against expert and lab confirmations">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ACCURACY_TREND} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                <YAxis domain={[60, 100]} tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", background: "var(--card)", fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="accuracy" name="Accuracy %" stroke="var(--chart-1)" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <ScoreBar value={93} label="Current accuracy" />
            <ScoreBar value={88} label="Precision (high-risk cases)" />
            <ScoreBar value={90} label="Expert agreement rate" />
          </div>
        </SectionCard>

        <SectionCard title="Learning loop">
          <FlowDiagram
            vertical
            steps={[
              "AI Prediction",
              "Field Observation",
              "Expert / Lab Confirmation",
              "Verified Dataset",
              "Model Improvement",
            ]}
          />
          <p className="mt-4 text-sm text-muted-foreground">
            Corrections are weighted higher than confirmations during retraining, so disagreements between AI and
            experts drive the largest improvements.
          </p>
        </SectionCard>
      </div>

      <SectionCard title="Correct vs corrected predictions by disease">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={CONFUSION} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="disease" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
              <YAxis tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", background: "var(--card)", fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="correct" name="Confirmed correct" stackId="a" fill="var(--chart-1)" radius={[0, 0, 0, 0]} />
              <Bar dataKey="corrected" name="Corrected by expert" stackId="a" fill="var(--chart-3)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>
    </>
  );
}
