export type StyleColors = {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  background: string;
};

export type StyleConfig = {
  colors: StyleColors;
  fonts?: {
    heading: string;
    body: string;
  };
};

export const styleMap = {
  modern: {
    colors: {
      primary: '#2563eb',
      secondary: '#1e40af',
      accent: '#3b82f6',
      text: '#333333',
      background: '#ffffff',
    },
    fonts: {
      heading: 'Inter, system-ui, sans-serif',
      body: 'system-ui, sans-serif',
    },
  },
  classic: {
    colors: {
      primary: '#000000',
      secondary: '#4a4a4a',
      accent: '#666666',
      text: '#2a2a2a',
      background: '#ffffff',
    },
    fonts: {
      heading: 'Georgia, serif',
      body: 'Times New Roman, serif',
    },
  },
  minimal: {
    colors: {
      primary: '#111827',
      secondary: '#4b5563',
      accent: '#9ca3af',
      text: '#374151',
      background: '#ffffff',
    },
    fonts: {
      heading: 'system-ui, sans-serif',
      body: 'system-ui, sans-serif',
    },
  },
  creative: {
    colors: {
      primary: '#7c3aed',
      secondary: '#5b21b6',
      accent: '#8b5cf6',
      text: '#1f2937',
      background: '#ffffff',
    },
    fonts: {
      heading: 'Poppins, system-ui, sans-serif',
      body: 'system-ui, sans-serif',
    },
  },
} as const;

export type TemplateStyle = keyof typeof styleMap;
