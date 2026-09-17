import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import CtaGroup from '../components/ui/CtaGroup.jsx';

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found | Umesh Cleaning Services" description="This page does not exist." path="/404" noindex />
      <section className="section">
        <div className="container-x max-w-2xl">
          <h1>This page does not exist</h1>
          <p className="lede mt-4">
            The link may be old or mistyped. Start from the <Link to="/" className="btn-link">home page</Link>,
            browse <Link to="/services" className="btn-link">our services</Link>, or contact us directly.
          </p>
          <CtaGroup className="mt-7" />
        </div>
      </section>
    </>
  );
}
