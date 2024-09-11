import classes from './LogisticsItem.module.css'


function LogisticsItem({icon, children}) {
    const Icon = icon
    return (
        <li className={classes.item}>
            <span className={classes.icon}>
                <Icon />
            </span>
            <span className={classes.content}>{children}</span>
        </li>
    )
}


export default LogisticsItem