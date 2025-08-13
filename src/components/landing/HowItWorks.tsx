import { ArrowRight, Download, LogIn, MessageCircle } from "lucide-react";

const steps = [
  {
    icon: LogIn,
    step: "01",
    title: "Sign Up & Login",
    description:
      "Create your free account in seconds, No creaditcard required to get started.",
  },
  {
    icon: MessageCircle,
    step: "02",
    title: "Chose your AI Model",
    description:
      "Select from multiple AI models or use our free opwtions. start chatting immediately",
  },
  {
    icon: Download,
    step: "03",
    title: "Save & Export",
    description:
      "Your conversations are autimatically saved, Export important chats anytime.",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-20 lg:py-32" id="how-it-works">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center space-y-6 mb-16">
          <h2>How it works</h2>
          <p>
            Het up and running with AI tools is just three simple steps. No
            complex setup or technical knowledfe reqiored.
          </p>
        </div>
        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from transparent via-border to-transparent transform -translate-y-1/2"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-center space-y-6">
                  <div className="inline-flex items-center justify-center w-16 h-16bg-gradient-primary text-white rounded-2xl text-xl font-bold shadow-elegant">
                    {step.step}
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">
                      {step.description}
                    </p>
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center mt-8 mb-4 ">
                    <ArrowRight className="w-6 h-8 text-muted-foreground rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
