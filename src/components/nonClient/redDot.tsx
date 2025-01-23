

const RedDot = () => {
  return (
    <span className="relative inline-flex h-3 w-3">
    <span
      className="absolute inline-flex h-3 w-3 animate-ping rounded-full bg-red-400 opacity-75"
    ></span>
    <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500"></span>
  </span>
  )
}

export default RedDot;