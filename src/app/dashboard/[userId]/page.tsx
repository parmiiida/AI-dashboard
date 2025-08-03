import Chatbox from "@/components/shared/Chatbox";

export default function Home() {
  return (
    <div className="flex items-center justify-center w-full p-8">
      <div className="w-full max-w-[1600px] h-[600px] rounded-xl border border-[#2a2a2a] bg-[#171717] flex items-center justify-center shadow-md mx-auto">
        <div className="flex flex-col p-2">
          <div className="flex items-center gap-3 pb-4 flex-col">
            <h1 className="text-3xl font-bold">
              What do you want to create today?
            </h1>
            <p>Start generating with a simple conversation.</p>
          </div>
          <Chatbox />
        </div>
      </div>
    </div>
  );
}
