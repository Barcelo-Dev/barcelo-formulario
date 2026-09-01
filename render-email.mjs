import { couponEmailHtml } from './lib/email.ts';
import { writeFileSync } from 'fs';
const html = couponEmailHtml({ name: 'Ana Morales', claimUrl: 'https://barcelo-formulario.vercel.app/confirmar?token=ejemplo123abc' });
writeFileSync('/tmp/email-preview.html', html);
console.log('email HTML escrito');
