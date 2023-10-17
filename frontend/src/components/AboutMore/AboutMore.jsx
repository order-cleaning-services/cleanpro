import './AboutMore.scss'

function AboutMore({ title, subTitle, src }) {
  return (
    <div>
      <img className="about__more-img" src={src} alt={title} />
      <p className="about__more-title text-m">{title}</p>
      <p className="about__more-subtitle text-s">{subTitle}</p>
    </div>
  )
}

export default AboutMore
