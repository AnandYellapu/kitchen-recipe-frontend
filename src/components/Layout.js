// import React from 'react'
// import { Outlet } from 'react-router-dom'
// import Header from './Header'
// import Footer from './Footer'

// function Layout() {
//   return (
//     <div className='site-wrapper'>
//       <Header />
//       <main>
//         <Outlet />
//       </main>
//       <Footer />
//     </div>
//   );
// }

// export default Layout;




import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Layout() {
  return (
    <div className='site-wrapper'>
      <Header className='site-header' />
      <main className='site-main'>
        <Outlet />
      </main>
      <Footer className='site-footer' />
    </div>
  );
}

export default Layout;
