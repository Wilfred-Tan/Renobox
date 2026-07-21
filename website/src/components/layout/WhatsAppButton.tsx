import { whatsappHref } from "@/lib/data/site";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed right-6 bottom-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-black/20 transition-transform duration-200 hover:scale-105 active:scale-95 md:right-8 md:bottom-8"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/60 [animation-duration:2.5s] motion-reduce:hidden" />
      <svg viewBox="0 0 32 32" className="relative h-7 w-7 fill-white" aria-hidden="true">
        <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.386.702 4.607 1.912 6.47L4 29l7.72-1.87A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.818a9.77 9.77 0 0 1-4.98-1.363l-.357-.213-4.583 1.11 1.127-4.47-.234-.366A9.78 9.78 0 0 1 5.2 15c0-5.965 4.84-10.818 10.804-10.818S26.8 9.035 26.8 15 21.968 24.818 16.004 24.818Zm5.44-7.61c-.298-.15-1.76-.868-2.033-.967-.273-.1-.472-.15-.67.15-.198.297-.767.966-.94 1.164-.174.198-.348.223-.646.075-.298-.15-1.257-.463-2.394-1.475-.885-.788-1.483-1.763-1.657-2.06-.174-.298-.019-.459.13-.608.134-.133.298-.347.447-.52.15-.174.198-.298.298-.497.1-.198.05-.372-.025-.521-.075-.15-.67-1.612-.918-2.208-.242-.58-.487-.502-.67-.511-.174-.008-.372-.01-.571-.01-.198 0-.521.075-.794.372-.273.298-1.041 1.017-1.041 2.48 0 1.462 1.066 2.875 1.215 3.073.15.198 2.098 3.203 5.083 4.492.71.306 1.263.489 1.695.626.712.227 1.36.195 1.872.118.571-.085 1.76-.719 2.008-1.414.248-.694.248-1.29.174-1.414-.075-.124-.273-.198-.571-.347Z" />
      </svg>
    </a>
  );
}
