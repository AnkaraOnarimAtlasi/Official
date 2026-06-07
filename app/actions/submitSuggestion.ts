'use server';

import { z } from 'zod';
import { supabase } from '@/lib/supabase/client';

// Schema for input validation
const submissionSchema = z.object({
  fullName: z.string().min(2, { message: 'Ad Soyad en az 2 karakter olmalıdır.' }),
  email: z.string().email({ message: 'Geçersiz e-posta adresi.' }),
  artisanName: z.string().min(2, { message: 'Usta veya mekân adı en az 2 karakter olmalıdır.' }),
  district: z.string().min(2, { message: 'Bölge / ilçe bilgisi girmelisiniz.' }),
  craftType: z.string().min(2, { message: 'Zanaat veya onarım türünü girmelisiniz.' }),
  address: z.string().optional(),
  whyIncluded: z.string().min(10, { message: 'Gerekçe en az 10 karakter olmalıdır.' }),
  socialLink: z.string().optional(),
});

export type ActionState = {
  success: boolean;
  message: string;
  errors?: string[];
};

export async function submitSuggestion(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  // Extract values from formData
  const rawData = {
    fullName: formData.get('fullName') as string,
    email: formData.get('email') as string,
    artisanName: formData.get('artisanName') as string,
    district: formData.get('district') as string,
    craftType: formData.get('craftType') as string,
    address: formData.get('address') as string || undefined,
    whyIncluded: formData.get('whyIncluded') as string,
    socialLink: formData.get('socialLink') as string || undefined,
  };

  // Safe parse with schema
  const validated = submissionSchema.safeParse(rawData);
  if (!validated.success) {
    return {
      success: false,
      message: 'Lütfen form alanlarını doğru biçimde doldurun.',
      errors: validated.error.issues.map((err) => err.message),
    };
  }

  const data = validated.data;

  // Insert into Supabase if configured
  if (supabase) {
    try {
      const { error } = await supabase.from('submissions').insert({
        submitted_by_name: data.fullName,
        submitted_by_email: data.email,
        place_name: data.artisanName,
        district: data.district,
        craft_type: data.craftType,
        address_description: data.address,
        reason_for_submission: data.whyIncluded,
        source_url: data.socialLink,
        moderation_status: 'pending',
      });

      if (error) {
        console.error('Supabase insert error:', error);
        return {
          success: false,
          message: `Veritabanına kaydedilirken hata oluştu: ${error.message}`,
        };
      }

      return {
        success: true,
        message: 'Öneriniz başarıyla kaydedildi. Saha ekibimiz en kısa sürede inceleyecektir.',
      };
    } catch (e) {
      console.error('Unexpected connection error:', e);
      return {
        success: false,
        message: 'Beklenmeyen bir veritabanı bağlantı hatası oluştu.',
      };
    }
  }

  // Fallback / Offline Prototype Mode
  console.log('--- Offline Prototype Submission Received ---');
  console.log(data);
  console.log('---------------------------------------------');

  // Simulate write to mock submissions database (local storage simulation on server side console)
  // Wait 300ms to mimic server response lag
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    success: true,
    message: 'Öneriniz başarıyla alındı (Taslak Modu: Çevrimdışı prototip simülasyonu aktif).',
  };
}
