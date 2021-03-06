import React from "react";

const Footer = () => {
  const footerItems = [
    { title: "Link 1" },
    { title: "Link 1" },
    { title: "Link 1" },
    { title: "Link 1" },
  ];
  return (
    <footer style={{ backgroundColor: '#79E0F0' }} class="footer relative pt-1 border-b-2 border-blue-700">
      <div class="container mx-auto px-6">
        <div class="mt-16 border-t-2 border-gray-300 flex flex-col items-center">
          <div class="sm:w-2/3 text-center py-6">
            <p class="text-sm font-bold mb-2">
              © 2021 by Didik Tech
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
