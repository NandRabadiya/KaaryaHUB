import "./Auth.css";
import { Button } from "@/components/ui/button";
import { UserPlus, LogIn } from "lucide-react";
import SignupForm from "./signup/SignupForm";
import LoginForm from "./login/login";
import { useState } from "react";

const Auth = () => {
  const [active, setActive] = useState(true);
  return (
    <div className="loginContainer">
      <div className="box h-auto w-[24rem] md:w-[26rem] animate-float">
        <div className="minContainer login">
          <div className="loginBox w-full px-6 md:px-8 py-8 md:py-10 space-y-6">
            {active ? <SignupForm /> : <LoginForm />}

            <div className="flex items-center justify-center gap-2 mt-6">
              <span className="text-sm text-gray-600">{active ? "Already have an account?" : "Need an account?"}</span>
              <Button 
                onClick={() => setActive(!active)} 
                variant="ghost" 
                className="text-secondary hover:text-primary/80 font-medium p-2"
              >
                {active ? (
                  <span className="flex items-center gap-1"><LogIn className="w-4 h-4" /> Sign In</span>
                ) : (
                  <span className="flex items-center gap-1"><UserPlus className="w-4 h-4" /> Sign Up</span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
