import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { useClickSound } from '@/hooks/useClickSound';
import { toast } from 'sonner';
import { useLocale } from '@/lib/LocaleProvider';
import emailjs from '@emailjs/browser';

const ContactSection = () => {
  const { playClick } = useClickSound();
  const { t } = useLocale();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    setIsSubmitting(true);

    // EmailJS Configuration
    // To use this form, you need to:
    // 1. Create an account on https://www.emailjs.com/
    // 2. Create an Email Service (e.g., Gmail, Outlook)
    // 3. Create an Email Template with variables: {{from_name}}, {{from_email}}, {{message}}, {{to_email}}
    // 4. Set the environment variables:
    //    - VITE_EMAILJS_SERVICE_ID: Your EmailJS service ID
    //    - VITE_EMAILJS_TEMPLATE_ID: Your EmailJS template ID
    //    - VITE_EMAILJS_PUBLIC_KEY: Your EmailJS public key (safe to expose)
    //    - VITE_CONTACT_EMAIL: The email address to receive messages
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const toEmail = import.meta.env.VITE_CONTACT_EMAIL;

    // Validate required environment variables
    if (!serviceId || !templateId || !publicKey || !toEmail) {
      console.error('EmailJS configuration is missing. Please set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY, and VITE_CONTACT_EMAIL environment variables.');
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
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      toast.success(t('toast_message_sent'));
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast.error(t('toast_message_error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding relative">
      <div className="container mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              {t('contact_title').split(' ')[0]} <span className="text-gradient">{t('contact_title').split(' ').slice(1).join(' ')}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('contact_sub')}
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-cyan-400 mx-auto rounded-full mt-4" />
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <AnimatedSection delay={0.2}>
            <div className="space-y-8">
              <div>
                <h3 className="font-display text-2xl font-semibold mb-6">{t('contact_discuss_title')}</h3>
                <p className="text-muted-foreground leading-relaxed">{t('contact_discuss_paragraph')}</p>
              </div>

              <div className="space-y-4">
                {[
                  { icon: Mail, label: t('contact_email_label'), value: 'benhammanemedamine@gmail.com' },
                  { icon: Phone, label: t('contact_phone_label'), value: '+33 6 59 67 88 46' },
                  { icon: MapPin, label: t('contact_location_label'), value: 'Lille, France' },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    whileHover={{ x: 10 }}
                    onClick={playClick}
                    className="flex items-center gap-4 cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="font-medium">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Contact Form */}
          <AnimatedSection delay={0.4}>
            <form onSubmit={handleSubmit} className="glass rounded-xl p-8">
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    {t('form_name_label')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    onFocus={playClick}
                    className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder={t('form_name_placeholder')}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    {t('contact_email_label')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onFocus={playClick}
                    className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder={t('form_email_placeholder')}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    {t('form_message_placeholder')}
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    onFocus={playClick}
                    rows={5}
                    className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                    placeholder={t('form_message_placeholder')}
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity glow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? t('form_sending') : t('form_submit')}
                  <Send size={18} className={isSubmitting ? 'animate-pulse' : ''} />
                </motion.button>
              </div>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
