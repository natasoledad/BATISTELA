// Dados fixos da empresa usados em todo o site.
export const site = {
  domain: 'batistelaconsultoria.com',
  email: 'info@batistelaconsultoria.com',
  whatsappDisplay: '+55 48 99911-7072',
  whatsappNumber: '5548999117072', // somente dígitos, para o link wa.me
  address: {
    street: 'R. Santos Dumont, 182',
    district: 'Centro',
    city: 'Florianópolis',
    state: 'SC',
    country: 'BR',
    full: 'R. Santos Dumont, 182, Centro, Florianópolis, SC, Brasil',
  },
  // Envio dos formulários: Google Apps Script ligado à planilha "Batistela - Leads do site".
  // Instruções em integracoes/google-apps-script/README.md. Cole aqui a URL do app da Web (termina em /exec).
  formEndpoint: 'https://script.google.com/macros/s/AKfycbwuWAbMFpOcts9eJecRM8z8zjSdssdnwDh2iBHlaC_HtPe9R4zNFivuB5S0zYumrN5_/exec',
  mapsEmbed: 'https://www.google.com/maps?q=R.+Santos+Dumont,+182,+Centro,+Florian%C3%B3polis,+SC,+Brasil&output=embed',
  mapsLink: 'https://www.google.com/maps/search/?api=1&query=R.+Santos+Dumont,+182,+Centro,+Florian%C3%B3polis,+SC,+Brasil',
  social: {
    instagram: '',
    linkedin: '',
  },
};

export const whatsappLink = (text?: string) =>
  `https://wa.me/${site.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
