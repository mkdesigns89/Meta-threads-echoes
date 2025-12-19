import Image from "next/image"

export default function EchoesIconSVG({ className = "w-[34px] h-[34px]" }: { className?: string }) {
  return (
    <div className={className}>
      <Image
        src="/icons/meta-echoes-icon.webp"
        alt="Meta Echoes"
        width={34}
        height={34}
        className="w-full h-full object-contain"
      />
    </div>
  )
}
