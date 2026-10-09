// Dados fixos da empresa usados em todo o site.
export const site = {
  domain: 'batistelaconsultoria.com',
  email: 'info@batistelaconsultoria.com',
  whatsappDisplay: '+55 48 9911-7072',
  whatsappNumber: '554899117072', // somente dígitos, para o link wa.me
  address: {
    street: 'R. Santos Dumont, 182',
    district: 'Centro',
    city: 'Florianópolis',
    state: 'SC',
    country: 'BR',
    full: 'R. Santos Dumont, 182, Centro, Florianópolis, SC, Brasil',
  },
  // Envio dos formulários: FormSubmit entrega direto no e-mail acima, sem backend.
  // Na primeira mensagem o FormSubmit envia um e-mail de ativação para info@ (confirmar uma vez).
  formEndpoint: 'https://formsubmit.co/ajax/info@batistelaconsultoria.com',
  mapsEmbed: 'https://www.google.com/maps?q=R.+Santos+Dumont,+182,+Centro,+Florian%C3%B3polis,+SC,+Brasil&output=embed',
  mapsLink: 'https://www.google.com/maps/search/?api=1&query=R.+Santos+Dumont,+182,+Centro,+Florian%C3%B3polis,+SC,+Brasil',
  social: {
    instagram: '',
    linkedin: '',
  },
};

export const whatsappLink = (text?: string) =>
  `https://wa.me/${site.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
