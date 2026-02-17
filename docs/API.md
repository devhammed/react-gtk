# API Documentation

## createRoot Function

The `createRoot` function is a user interface function that allows users to create a new root for their application rendering. It is an essential part of setting up a React application, providing the ability to manage the rendering of components.

### Syntax

```javascript
const root = createRoot(container);
```

### Parameters
- **container**: A DOM element where the root will be rendered.

### Returns
- Returns a `Root` object that allows for further operations on the rendered components.

### Examples

```javascript
// Import createRoot function from React
import { createRoot } from 'react';

// Get the container element
const container = document.getElementById('app');

// Create a root and render the component
const root = createRoot(container);
root.render(<MyComponent />);
```

## Available Widgets

1. **Button**: A clickable button component.
   - **Props**: `onClick`, `label`, `disabled`

2. **Input**: A form input field.
   - **Props**: `value`, `onChange`, `placeholder`

3. **Select**: A dropdown select component.
   - **Props**: `options`, `onChange`, `value`

4. **Checkbox**: A toggleable checkbox.
   - **Props**: `checked`, `onChange`

5. **Modal**: A dialog box overlay.
   - **Props**: `isOpen`, `onClose`, `children`

Each of these widgets has various properties that can be configured to customize their behavior and appearance within the application.

---

For detailed examples and usage, please refer to the respective widget's documentation in the project repository.