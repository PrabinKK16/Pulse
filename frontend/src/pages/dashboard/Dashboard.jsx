import PageWrapper from "../../components/layout/PageWrapper";
import Button from "../../components/ui/Button";
import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <PageWrapper>
      <motion.section
        className="mt-16 space-y-7"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <h1 className="heading text-[2.75rem] leading-[1.1] max-w-xl">
          Your personal system,
          <br />
          quietly in control.
        </h1>

        <p className="text-[var(--text-muted)] max-w-lg text-sm leading-relaxed">
          Track patterns across money, focus, and habits — not as raw numbers,
          but as signals you can act on.
        </p>

        <div className="pt-4">
          <Button>
            View today’s overview
            <span className="opacity-60 group-hover:translate-x-0.5 transition">
              →
            </span>
          </Button>
        </div>
      </motion.section>
    </PageWrapper>
  );
}
