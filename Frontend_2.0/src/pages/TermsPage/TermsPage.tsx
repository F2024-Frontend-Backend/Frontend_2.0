import { BrowserRouter, Route, useNavigate } from "react-router-dom";


const TermsPage: React.FC = () => {
  const navigate = useNavigate();


  return (
   <div className="terms-wrapper">
    <div className="terms-and-conditions">
      <h1>TERMS & CONDITIONS:</h1>
      <ul>
        <li>
          <p>Lorem ipsum</p>
        </li>
        <li>
          lorem ipsum
        </li>
        <li>
          <p>
            We own your soul.*
          </p>
        </li>
      </ul>
      *<small>for all intents and purposes this is a joke. Nothing here is binding, and therefore should not be taken seriously.</small>
    </div>
   </div>

  );
};

export default TermsPage;
