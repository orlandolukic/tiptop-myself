import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NProgress from '../node_modules/nprogress/nprogress';

// Import CSS files for the project
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../styles/globals.scss';
import '../styles/buttons.scss';
import '../styles/nprogress.css';

function MyApp({ Component, pageProps }) {   
  const router = useRouter();
  let [ interval, setMyInterval ] = useState(-1);
  let [ loadingState, setLoadingState ] = useState(-1);
  let [ windowOnSelectStart, setWindowOnSelectStart ] = useState( false );
  let [ defaultWindowOnSelectStart, setDefaultWindowOnSelectStart ] = useState( null );

  const routeChangeStart = () => {    
    NProgress.start();
    setLoadingState(1);    
  };
  const routeChangeComplete = () => {          
    NProgress.done();
    setLoadingState(0);  
  };

  useEffect(() => {
    if ( loadingState == 1 ) {      
      setMyInterval(window.setInterval(() => {
        NProgress.inc();
      }, 600));
    } else if ( loadingState == 0 ) {
      window.clearInterval(interval);
      setMyInterval(-1);    
    }
    
    return () => {
      if ( loadingState == 1 ) {
        window.clearInterval(interval);
        setMyInterval(-1);
      }
    }
  }, [loadingState]);
  
  useEffect(() => {    
    router.events.on("routeChangeStart", routeChangeStart);
    router.events.on("routeChangeComplete", routeChangeComplete);
    router.events.on("routeChangeError", routeChangeComplete);

    return () => {
      router.events.off("routeChangeStart", routeChangeStart);
      router.events.off("routeChangeComplete", routeChangeComplete);
      router.events.off("routeChangeError", routeChangeComplete);
    };
  }, [router]);

  const windowOnSelectStartHandler = (e) => {
    return false;
  };

  // Save default handler
  useEffect(() => {
    if ( defaultWindowOnSelectStart )
      return;

    setDefaultWindowOnSelectStart(window.onselectstart);
  }, [defaultWindowOnSelectStart]);
  // Replace default handler with new one
  useEffect(() => {
    window.onselectstart = windowOnSelectStartHandler;    

    return () => {
      window.onselectstart = defaultWindowOnSelectStart;
    };
  }, [ windowOnSelectStart ]);

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || function(page) { return page };
  return getLayout(
    <>
      <Component {...pageProps} />
      <ToastContainer 
        position="top-center"        
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default MyApp
