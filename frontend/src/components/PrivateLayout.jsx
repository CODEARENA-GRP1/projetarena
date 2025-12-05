import NavbarPrivate from "./NavbarPrivate";

export default function PrivateLayout({ children }) {
  return (
    <div className="Home">
      <NavbarPrivate />
      <div className="page-content">{children}</div>
    </div>
  );
}
