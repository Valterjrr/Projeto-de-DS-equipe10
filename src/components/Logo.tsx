export function LogoMain({ className = "w-24 h-24" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="45" fill="#65B8A6"/>
      <circle cx="50" cy="50" r="35" fill="#2D6073"/>
      <text 
        x="50" 
        y="60" 
        textAnchor="middle" 
        fill="#F0F7DA" 
        fontSize="32" 
        fontFamily="JetBrains Mono, monospace"
        fontWeight="700"
      >
        AI
      </text>
      <circle cx="68" cy="42" r="3" fill="#B5E8C3"/>
    </svg>
  );
}

export function LogoBullet({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" fill="#65B8A6"/>
      <path 
        d="M8 12L11 15L16 9" 
        stroke="#1F192F" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}
