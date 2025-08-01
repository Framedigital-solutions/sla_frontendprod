// Mock for lucide-react icons
const createIcon = (name) => {
  const Icon = (props) => <span data-testid={`${name}-icon`} {...props} />;
  return Icon;
};

// Mock all icons used in the application
export const X = createIcon('X');
// Add other icons as needed

export default {
  X,
  // Add other icons as needed
};
