import Footer from "./Footer";

function Layout({ children }) {
  return (
    <>
      <div className="shadow-md">
        <div className="md:relative container mx-auto px-3">{children}</div>
      </div>
      <Footer />
    </>
  );
}

export default Layout;
