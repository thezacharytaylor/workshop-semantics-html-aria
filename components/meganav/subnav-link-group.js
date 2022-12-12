import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const SubNavLinkGroup = ({ headerText = '', items = [] }) => {
  const [currentPathname, setCurrentPathname] = useState(null);

  useEffect(() => {
    setCurrentPathname(document.location.pathname);
  }, []);

  const setAriaCurrent = (path) => {
    return path === currentPathname ? 'page' : null;
  };

  return (
    <div className="megamenu-submenu-group">
      <h3 className="megamenu-submenu-header">{headerText}</h3>
      <menu>
        {items.map((item, index) => (
          <li className="megamenu-submenu-link" key={index}>
            <a
              className="nav-link"
              data-testid={`link-${index}`}
              href={item.url}
              aria-current={setAriaCurrent(item.url)}
            >
              {item.name}
            </a>
          </li>
        ))}
      </menu>
    </div>
  );
};

SubNavLinkGroup.propTypes = {
  headerText: PropTypes.string,
  items: PropTypes.array,
};

SubNavLinkGroup.defaultProps = {
  headerText: '',
  items: [],
};

export default SubNavLinkGroup;
