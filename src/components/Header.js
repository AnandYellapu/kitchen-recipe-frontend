// import React from 'react';
// import { Link } from 'react-router-dom';
// import { SiFoodpanda } from 'react-icons/si';

// const Header = () => {
//   return (
//     <header>
//        <div className="logo">
//          <Link to="/" className="logo-link">
//           <SiFoodpanda className="logo-icon" />
//           <span className="logo-title">Kitchen Recipe Management</span>
//          </Link>
//        </div>
//       <nav>
//         <Link
//              className='nav-link'
//              activeClassName='active-link'
//              to="/dashboard"
//              style={{ borderBottom: '2px solid transparent' }}
//              activeStyle={{ borderBottom: '2px solid #000', paddingBottom: '5px' }}
//            >
//              Dashboard
//            </Link>
//         <Link
//              className='nav-link'
//              activeClassName='active-link'
//              to="/about"
//              style={{ borderBottom: '2px solid transparent' }}
//              activeStyle={{ borderBottom: '2px solid #000', paddingBottom: '5px' }}
//            >
//              About
//            </Link>
//        </nav>
//     </header>
//   );
// };

// export default Header;





import React from 'react';
import { Link } from 'react-router-dom';
import { SiFoodpanda } from 'react-icons/si';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/" className="logo-link">
          <SiFoodpanda className="logo-icon" />
          <span className="logo-title">Kitchen Recipe Management</span>
        </Link>
      </div>
      <nav className="nav">
        <Link
          className="nav-link"
          activeClassName="active-link"
          to="/dashboard"
        >
          Dashboard
        </Link>
        <Link
          className="nav-link"
          activeClassName="active-link"
          to="/about"
        >
          About
        </Link>
      </nav>
    </header>
  );
};

export default Header;
