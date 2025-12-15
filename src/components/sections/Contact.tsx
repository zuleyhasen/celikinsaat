import { useTranslation } from 'react-i18next';
import { MapPin, Mail, Phone } from 'lucide-react';

export default function Contact() {
  const { t } = useTranslation();

  // Harita için placeholder, gerçek bir Google Maps embed kodu buraya eklenebilir.
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.9880000000003!2d28.97495!3d41.00823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab9f2706c5b81%3A0x8f0c5b81f2706c5b8!2sIstanbul%2C%20Turkey!5e0!3m2!1sen!2str!4v1678886400000!5m2!1sen!2str";

  const contactInfo = [
    { icon: MapPin, label: t('contact.address'), value: 'Merkez Mah. Çelik Sok. No: 1, İstanbul, Türkiye' },
    { icon: Phone, label: t('contact.phone'), value: '+90 212 555 55 55' },
    { icon: Mail, label: t('contact.email'), value: 'info@celikinsaat.com' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Veritabanı bağlantısı kaldırıldığı için form gönderimi sadece bilgilendirme amaçlıdır.
    alert(t('contact.formSuccess'));
  };

  return (
    <section id="contact" className="relative py-32 bg-steel-800">
      <div className="container mx-auto px-6">
        <h2 className="text-display-lg font-bold text-white mb-16 text-center">
          {t('contact.title')}
        </h2>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* İletişim Formu */}
          <div className="bg-steel-900 p-10 rounded-lg shadow-2xl">
            <h3 className="text-3xl font-bold text-white mb-8">{t('contact.formTitle')}</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-steel-300 mb-2">
                  {t('contact.nameLabel')}
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full px-4 py-3 bg-steel-700 border border-steel-600 rounded-lg text-white focus:ring-accent-gold focus:border-accent-gold transition-colors"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-steel-300 mb-2">
                  {t('contact.emailLabel')}
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-3 bg-steel-700 border border-steel-600 rounded-lg text-white focus:ring-accent-gold focus:border-accent-gold transition-colors"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-steel-300 mb-2">
                  {t('contact.messageLabel')}
                </label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  className="w-full px-4 py-3 bg-steel-700 border border-steel-600 rounded-lg text-white focus:ring-accent-gold focus:border-accent-gold transition-colors"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-accent-gold text-steel-900 font-bold text-lg rounded-lg hover:bg-yellow-500 transition-colors duration-300"
              >
                {t('contact.sendButton')}
              </button>
            </form>
          </div>

          {/* İletişim Bilgileri ve Harita */}
          <div className="space-y-10">
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <item.icon className="text-accent-gold flex-shrink-0 mt-1" size={24} />
                  <div>
                    <p className="text-sm font-medium text-steel-300">{item.label}</p>
                    <p className="text-lg font-semibold text-white">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Google Haritalar Embed */}
            <div className="rounded-lg overflow-hidden shadow-2xl h-96">
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Çelik İnşaat Konumu"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
