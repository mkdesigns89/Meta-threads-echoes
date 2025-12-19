import Image from "next/image"

export default function EchoesIconSVG({ className = "w-[24px] h-[24px]" }: { className?: string }) {
  return (
    <div className={className}>
      <Image
        src="/icons/meta-echoes-icon.webp"
        alt="Meta Echoes"
        width={24}
        height={24}
        className="w-full h-full object-contain"
      />
    </div>
  )
}
