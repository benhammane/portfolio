import { Mail, MapPin, Phone, Send, Github, Linkedin } from 'lucide-react';
import { trackContactSubmit, trackSocialClick } from '@/lib/analytics';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useClickSound } from '@/hooks/useClickSound';
import { toast } from 'sonner';
import { useLocale } from '@/lib/LocaleProvider';
import SectionHeading from '@/components/fx/SectionHeading';

const ContactSection = () => {
  const { playClick } = useClickSound();
  const { t } = useLocale();
  const [formData, setFormData] = useState({ name: '', email: '', message: '', company: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot anti-spam : champ invisible pour les humains, rempli par les bots.
    // On feint un envoi réussi pour ne pas révéler la détection.
    if (formData.company) {
      setFormData({ name: '', email: '', message: '', company: '' });
      toast.success(t('toast_message_sent'));
      return;
    }

    playClick();
    setIsSubmitting(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const toEmail = import.meta.env.VITE_CONTACT_EMAIL;

    if (!serviceId || !templateId || !publicKey || !toEmail) {
      console.error('EmailJS configuration is missing.');
      toast.error(t('toast_message_error'));
      setIsSubmitting(false);
      return;
    }

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_email: toEmail,
    };

    try {
      // Chargé à la demande : la lib n'alourdit plus le bundle initial
      const { default: emailjs } = await import('@emailjs/browser');
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      trackContactSubmit();
      toast.success(t('toast_message_sent'));
      setFormData({ name: '', email: '', message: '', company: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast.error(t('toast_message_error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const infos = [
    { icon: Mail, label: t('contact_email_label'), value: 'benhammanemedamine@gmail.com', href: 'mailto:benhammanemedamine@gmail.com' },
    { icon: Phone, label: t('contact_phone_label'), value: '+33 6 58 67 88 46', href: 'tel:+33658678846' },
    { icon: MapPin, label: t('contact_location_label'), value: 'Lille, France' },
  ];

  const socials = [
    { icon: Github, href: 'https://github.com/benhammane', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/benhammaneamine/', label: 'LinkedIn' },
  ];

  const inputClass =
    'w-full rounded-xl border border-border bg-background/40 px-4 py-3 transition-all placeholder:text-muted-foreground/60 focus:border-brand/50 focus:outline-none focus:ring-2 focus:ring-brand/30';

  return (
    <section id="contact" className="section-padding relative">
      <div className="container relative z-10 mx-auto px-6">
        <SectionHeading
          eyebrow="08 — Contact"
          title="Me"
          highlight="Contacter"
          subtitle={t('contact_sub')}
        />

        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-5">
          {/* Infos */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <h3 className="font-display text-2xl font-semibold">{t('contact_discuss_title')}</h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">{t('contact_discuss_paragraph')}</p>

            <div className="mt-8 space-y-3">
              {infos.map((item) => {
                const content = (
                  <motion.div
                    whileHover={item.href ? { x: 4 } : undefined}
                    onClick={item.href ? playClick : undefined}
                    className={`flex items-center gap-4 rounded-2xl surface p-4 transition-colors duration-300 ${
                      item.href ? 'hover:border-brand/30' : ''
                    }`}
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand ring-1 ring-brand/20">
                      <item.icon size={18} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">{item.label}</p>
                      <p className="font-medium">{item.value}</p>
                    </div>
                  </motion.div>
                );
                return item.href ? (
                  <a key={item.label} href={item.href} className="block">{content}</a>
                ) : (
                  <div key={item.label}>{content}</div>
                );
              })}
            </div>

            <div className="mt-6 flex gap-3">
              {socials.map(({ icon: Icon, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  onClick={() => { playClick(); trackSocialClick(label); }}
                  className="rounded-xl surface p-3 text-muted-foreground transition-colors hover:border-brand/40 hover:text-brand"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Formulaire */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="relative rounded-3xl surface p-6 sm:p-8 lg:col-span-3"
          >
            <div className="space-y-5">
              {/* Honeypot anti-spam : caché visuellement et aux lecteurs d'écran, piège à bots */}
              <div className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden="true">
                <label htmlFor="company">Entreprise</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium">{t('form_name_label')}</label>
                <input
                  type="text" id="name" required value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onFocus={playClick} placeholder={t('form_name_placeholder')} className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium">{t('contact_email_label')}</label>
                <input
                  type="email" id="email" required value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={playClick} placeholder={t('form_email_placeholder')} className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium">{t('form_message_placeholder')}</label>
                <textarea
                  id="message" required rows={5} value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  onFocus={playClick} placeholder={t('form_message_placeholder')}
                  className={`${inputClass} resize-none`}
                />
              </div>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-foreground py-3.5 font-semibold text-background transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? t('form_sending') : t('form_submit')}
                <Send size={18} className={isSubmitting ? 'animate-pulse' : 'transition-transform group-hover:translate-x-1'} />
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
