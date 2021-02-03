export default function PageTitle({ children }) {
  return (
    <h1 className="text-2xl leading-9 font-normal text-gray-800 tracking-tight sm:text-3xl sm:leading-10 md:leading-14">
      {children}
    </h1>
  )
}
