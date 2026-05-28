import { Theme } from './settings/types';
import { IKWIDKLandingPage } from './components/generated/IKWIDKLandingPage';

let theme: Theme = 'light';

function App() {
  function setTheme(theme: Theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  setTheme(theme);

  return <IKWIDKLandingPage />;
}

export default App;
