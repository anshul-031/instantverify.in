import React from 'react';
import Button from '../forms/Button';

export default function SocialLogin() {
  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  const handleFacebookLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/facebook`;
  };

  const handleGithubLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/github`;
  };

  return (
    <div className="space-y-3">
      <Button
        variant="outline"
        className="w-full"
        onClick={handleGoogleLogin}
      >
        <img
          src="https://www.google.com/favicon.ico"
          alt="Google"
          className="w-4 h-4 mr-2"
        />
        Continue with Google
      </Button>

      <Button
        variant="outline"
        className="w-full"
        onClick={handleFacebookLogin}
      >
        <img
          src="https://www.facebook.com/favicon.ico"
          alt="Facebook"
          className="w-4 h-4 mr-2"
        />
        Continue with Facebook
      </Button>

      <Button
        variant="outline"
        className="w-full"
        onClick={handleGithubLogin}
      >
        <img
          src="https://github.com/favicon.ico"
          alt="GitHub"
          className="w-4 h-4 mr-2"
        />
        Continue with GitHub
      </Button>
    </div>
  );
}