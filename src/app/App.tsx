import './styles/index.scss';
import {classNames} from "shared/lib/classNames/classNames";
import {useTheme} from "app/providers/ThemeProvider";
import {AppRouter} from "app/providers/router";
import { Navbar } from "widjets/Navbar";
import { Sidebar } from "widjets/Sidebar";


const App = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className={classNames('app', {}, [theme])}>
            <Navbar />
            <div className={'content-page'}> <Sidebar/>
                <AppRouter /></div>
        </div>
    );
};

export default App;
