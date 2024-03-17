import React, { useContext } from 'react'
import logo from '../assets/images/logo.svg'
import moon from '../assets/images/icon-moon.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOn, faToggleOff,faSun} from '@fortawesome/free-solid-svg-icons';
import './NavBar.css'
import { themeContext } from '../App';

export default function NavBar() {
  const { toggleTheme, theme, setFont } = useContext(themeContext);

  const handleFont = (e)=>{
    setFont(e.target.value)
  }

  const handleToggle = () => {
    toggleTheme();
  };


  return (
    <nav>
      <div>
        <img src={logo} />
      </div>
      <div className='right-wrapper'>
        <select id='fonts' onChange={handleFont}>
          <option value='roboto'>Roboto</option>
          <option value='poppins'>poppins</option>
          <option value='lato'>lato</option>
        </select>
        <FontAwesomeIcon
         onClick={handleToggle}
          className='right-content' 
          icon={theme === 'dark'? faToggleOn : faToggleOff}
          style={{ fontSize: '24px', color: '#a21caf', cursor: 'pointer' }}
          />
          <>{theme === 'dark' ? <FontAwesomeIcon style={{fontSize: 20, color: '#fff'}} className='right-content' icon={faSun} /> : 
                <img
                 className='right-content'
                 src={moon} alt='moon'
                 style={{color:'#a21caf'}}
                 />
                  }
        </>
          
      </div>
    </nav>
  )
}







