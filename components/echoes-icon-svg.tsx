import Image from "next/image"

export default function EchoesIconSVG({ className = "w-[18px] h-[18px]" }: { className?: string }) {
  return (
    <div className={className}>
      <Image
        src="/icons/meta-echoes-icon.webp"
        alt="Meta Echoes"
        width={18}
        height={18}
        className="w-full h-full object-contain"
      />
    </div>
  )
}
