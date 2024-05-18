import React from "react";
import { useLocation, Link } from "react-router-dom";

const BreadCrumbs = () => {
  let currentLink = "";
  const location = useLocation();
  const breadCrumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb, index, array) => {
      currentLink += `/${crumb}`;
      return (
        <React.Fragment key={index}>
          <Link
            to={currentLink}
            className="text-blue-500 hover:text-blue-700 font-medium"
          >
            {crumb}
          </Link>
          {index !== array.length - 1 && (
            <span className="mx-1">/</span>
          )}
        </React.Fragment>
      );
    });

  return (
    <div className="text-sm">
      <span className="text-gray-500">{breadCrumbs}</span>
    </div>
  );
};

export default BreadCrumbs;
