'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const authCode = urlParams.get('code');

      if (authCode) {
        // Procesa el authCode aquí si es necesario
        console.log('Usuario autenticado con código:', authCode);
        router.push('/reports'); // Redirige a la página de reportes
      } else {
        // Redirige al Hosted UI si no hay sesión
        const hostedUIUrl = `https://us-east-2e0cjnjvdw.auth.us-east-2.amazoncognito.com/login?client_id=6uhs62u6k3rela2or6h5kqdtrq&response_type=code&scope=email+openid+phone&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Freports`;
        window.location.href = hostedUIUrl;
      }
    };

    checkAuthentication();
  }, [router]);

  return null; // No mostramos nada mientras se redirige
};

export default HomePage;
