import { useState } from "react";

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigation = [
    { name: 'Find Artists', href: '#' },
    { name: 'Find Gigs', href: '#' },
  ]
  
  // Toggle the isLoggedIn state when a user logs in or out
  const handleLoginToggle = () => {
    setIsLoggedIn((prevIsLoggedIn) => !prevIsLoggedIn);
  }

  return (
      <nav className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 pb-1.5 h-10"> {/* Fix the class name here */}
        <span className="font-heading text-4xl whitespace-nowrap">LOGO</span>
        <div>
          <ul className="flex space-x-6">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="font-subHeading text-lg font-semibold leading-6 text-accent hover:text-accentHover">
                {item.name}
              </a>
            ))}
          </ul>
        </div>
        <div className="flex space-x-4">
          {/* Conditionally render different buttons based on the isLoggedIn state */}
        {isLoggedIn ? (
          <>
            {/* When the user is logged in */}
            <button 
              className="font-subHeading bg-transparent hover:bg-buttonHover text-button font-semibold hover:text-white py-2 px-4 border border-button hover:border-transparent rounded">
              Profile
            </button>
            <button
              onClick={() => handleLoginToggle()} 
              className="font-subHeading bg-transparent hover:bg-buttonHover text-button font-semibold hover:text-white py-2 px-4 border border-button hover:border-transparent rounded">
              Logout
            </button>
          </>
        ) : (
          <>
            {/* When the user is NOT logged in */}
            <button
              onClick={() => handleLoginToggle()}
              className="font-subHeading bg-transparent hover:bg-buttonHover text-button font-semibold hover:text-white py-2 px-4 border border-button hover:border-transparent rounded">
              Log in
            </button>
            <button className="font-subHeading bg-button hover:bg-buttonHover text-white font-bold py-2 px-4 rounded">
              Register
            </button>
          </>
        )}
          
        </div>
      </nav>
  )
}