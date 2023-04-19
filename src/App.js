// Imports
import React from 'react'
import * as ReactDOMClient from 'react-dom/client'

// Main React App for extension
function App () {
    return(
        <>
            <h1>Hello World</h1>
        </>
    )
}

// Create a root.
const root = ReactDOMClient.createRoot(
    document.querySelector('body')
)

// Initial render: Render an element to the root.
root.render(<App />)