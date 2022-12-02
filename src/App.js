import {useEffect, useState} from "react";
import axios from "axios";



function App() {
    return (
        <>
      {(function(l) {
        if (l.search[1] === '/' ) {
          var decoded = l.search.slice(1).split('&').map(function(s) { 
            return s.replace(/~and~/g, '&')
          }).join('?');
          window.history.replaceState(null, null,
              l.pathname.slice(0, -1) + decoded + l.hash
          );
        }
      }(window.location))}
        <div className="App">
        </div>
    </>
    );
}

export default App;
