import React from "react";

export default () => {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center" style={{bottom:"0px",width:"100%"}}>
      Copyright &copy; {new Date().getFullYear()} Dev Connector
    </footer>
  );
};
