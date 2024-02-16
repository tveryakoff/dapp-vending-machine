import cl from 'classnames'

const Container = ({ children, className }) => (
  <section className={cl(className, 'mx-auto w-full max-w-[1400px] max-xl:max-w-[90vw] max-2xl:max-w-[1200px]')}>
    {children}
  </section>
)

export default Container
