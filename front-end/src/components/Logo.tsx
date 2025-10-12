// 1. Importe os arquivos SVG como se fossem imagens normais.
import logoPrincipalSrc from '../assets/logo-main.png';
import logoMarcadorSrc from '../assets/logo-bullet.png';

export function LogoMain({ className = "w-24 h-24" }: { className?: string }) {
  // 2. Use a tag <img> para exibir a logo principal.
  return (
    <img
      src={logoPrincipalSrc} 
      alt="Logo Principal" 
      className={className}
    />
  );
}

export function LogoBullet({ className = "w-6 h-6" }: { className?: string }) {
  // 3. Use a tag <img> para exibir a logo de marcador.
  return (
    <img 
      src={logoMarcadorSrc} 
      alt="Marcador" 
      className={className} 
    />
  );
}