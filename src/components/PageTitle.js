export default function PageTitle({ children }) {
  return (
    <h1 className="text-2xl leading-9 font-normal text-gray-700 tracking-tight sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">
      {children}
    </h1>
  )
}
