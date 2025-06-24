interface EnvVariables {
    API_URL: string;
  }
  

  const defaultEnv: EnvVariables = {
    API_URL: 'http://localhost:8000/api',
  };
  
  export const env: EnvVariables = {
    API_URL: import.meta.env.VITE_API_URL || defaultEnv.API_URL,
  };
  

  export function validateEnv(): boolean {
    const missing = Object.entries(env).filter(([_, value]) => !value);
    
    if (missing.length > 0) {
      console.error(
        'Missing environment variables:',
        missing.map(([key]) => key).join(', ')
      );
      return false;
    }
    
    return true;
  }