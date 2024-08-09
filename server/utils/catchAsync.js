// simply catch our asynchronous errors.

// This function receives the async function(fn) from the controller,
// 

module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
