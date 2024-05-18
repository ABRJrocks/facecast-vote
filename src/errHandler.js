// errorHandler.js

window.onerror = function(message, source, lineno, colno, error) {
    // Check if the error message contains "Script error"
    if (message && message.indexOf('Script error') > -1) {
      // Suppress the error
      return true;
    }
    
    // Handle other errors normally
    console.error(message, source, lineno, colno, error);
  };
  