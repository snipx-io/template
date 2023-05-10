// Imports
import React from 'react'
import * as ReactDOMClient from 'react-dom/client'

import './styles/global.css'

// Main React App for extension
function App() {
	return <h1 className="underline">Hello World</h1>
}

// Create a root.
const root = ReactDOMClient.createRoot(document.getElementById('app'))

// Initial render: Render an element to the root.
root.render(<App />)
