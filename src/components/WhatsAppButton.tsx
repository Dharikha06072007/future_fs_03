import { MessageCircle } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function WhatsAppButton() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href="https://wa.me/916385395737"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full text-white transition-all duration-300 hover:scale-110 hover:rotate-[10deg] before:absolute before:inset-0 before:rounded-full before:border-4 before:border-[#25D366] before:animate-ping before:opacity-30"
            style={{ backgroundColor: "#25D366", boxShadow: "0 4px 24px rgba(37, 211, 102, 0.4)" }}
            aria-label="Chat with us on WhatsApp"
          >
            <MessageCircle className="h-7 w-7" />
          </a>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Chat with us</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
