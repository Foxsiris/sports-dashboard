import './Skeleton.css'

export default function Skeleton() {
  return (
    <div className="skeleton">
      <div className="skeleton__line skeleton__line--short" />
      <div className="skeleton__line skeleton__line--title" />
      <div className="skeleton__line" />
      <div className="skeleton__line skeleton__line--short" />
    </div>
  )
}
