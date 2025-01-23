

const GreenDot = () => {
  return (
    <span className="relative inline-flex h-3 w-3">
    <span
      className="absolute inline-flex h-3 w-3 animate-ping rounded-full bg-green-400 opacity-75"
    ></span>
    <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
  </span>
  )
}

export default GreenDot;