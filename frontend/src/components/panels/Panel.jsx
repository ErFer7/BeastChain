import PropTypes from 'prop-types'

Panel.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
}

export default function Panel(props) {
  const { title, description, children } = props

  return (
    <div className="bg-zinc-900 mt-28 w-5/12 p-7 text-center justify-self-center rounded-3xl shadow-xl">
      <div className="mb-6">
        <h1 className="font-bold text-4xl from-[#4ade80] to-[#3b82f6] bg-clip-text text-transparent bg-gradient-to-r">
          {title}
        </h1>
      </div>
      <p className="font-sans mb-12 italic">{description}</p>
      {children}
    </div>
  )
}
