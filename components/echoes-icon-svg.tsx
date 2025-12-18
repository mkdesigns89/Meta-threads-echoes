import Image from "next/image"

export default function EchoesIconSVG({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <div className={className}>
      <Image
        src="/icons/meta-echoes-icon.webp"
        alt="Meta Echoes"
        width={64}
        height={64}
        className="w-full h-full object-contain"
      />
    </div>
  )
}
