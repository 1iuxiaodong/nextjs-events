import classes from './EventContent.module.css'

function EventContent({text, children}) {
    return (
        <section className={classes.content}>
            {children}
        </section>
    )
}

export default EventContent