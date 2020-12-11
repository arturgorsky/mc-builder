import Aux from '../../hoc/AuxHoc';
import styles from './Layout.module.css';

const layout = (props) => (
    <Aux>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={styles.content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;