import {QRCanvas} from "./canvas"
import {SectionWrapper} from "../wrapper"

const Connect = () => {
  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <QRCanvas />
    </section>
  )
}

export default SectionWrapper(Connect, "connect");