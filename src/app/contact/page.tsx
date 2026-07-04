"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { showToast } from "@/hooks/useToast";
import { FAQS } from "@/lib/data";
import { ChevronDown } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(4, "Subject must be at least 4 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type FormData = z.infer<typeof schema>;

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 800));
    showToast("Message sent! We'll respond within 24h ✉️", "✉️");
    reset();
  };

  return (
    <div>
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-10 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-1">Get in touch</h1>
          <p className="text-slate-500 dark:text-slate-400">We'd love to hear from you — questions, feedback, or just hello.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact form */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-7">
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-5">Send us a message</h2>
            {isSubmitSuccessful ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                <div className="text-5xl mb-3">✉️</div>
                <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-1">Message sent!</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">We'll get back to you within 24 hours.</p>
                <Button variant="outline" className="mt-4" onClick={() => reset()}>Send another</Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-1.5">
                  <Label>Your name</Label>
                  <Input placeholder="Alex Johnson" {...register("name")} />
                  {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label>Email address</Label>
                  <Input type="email" placeholder="you@email.com" {...register("email")} />
                  {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label>Subject</Label>
                  <Input placeholder="What's this about?" {...register("subject")} />
                  {errors.subject && <p className="text-xs text-red-500">{errors.subject.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label>Message</Label>
                  <Textarea rows={5} placeholder="Tell us what's on your mind..." {...register("message")} />
                  {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
                </div>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send message"}
                </Button>
              </form>
            )}
          </div>

          {/* Contact info + FAQ */}
          <div className="space-y-5">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-7">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">Contact details</h3>
              <div className="space-y-3">
                {[["✉️", "Email", "hello@jobz.io"], ["📞", "Phone", "+1 (555) 000-1234"], ["📍", "Office", "San Francisco, CA"]].map(([icon, label, val]) => (
                  <div key={label as string} className="flex justify-between items-center">
                    <span className="text-sm text-slate-400">{icon} {label}</span>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-7">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">FAQ</h3>
              <div className="space-y-2">
                {FAQS.map((faq, i) => (
                  <div key={i} className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="px-4 pb-4 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{faq.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
