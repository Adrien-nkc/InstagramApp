import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center px-6 py-10 text-center">
      <h2 className="mt-6 text-5xl font-semibold">A website that allows you to know who unfollowed you!</h2>

      <img
        src="https://img.freepik.com/free-psd/instagram-application-logo_23-2151544104.jpg?semt=ais_hybrid&w=740&q=80"
        alt="Instagram Logo"
        className="mt-6 w-52 animate-fade-in"
      />

      <button
        type="button"
        className="mt-4 rounded-2xl bg-black px-8 py-4 text-2xl font-medium text-white transition duration-200 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 animate-button-pop"
        onClick={() => navigate("/tracker")}
      >
        Get Started!
      </button>

      <img
        src="https://media.gettyimages.com/id/1009984558/photo/whatsapp-instagram-facebook-and-other-phone-apps-on-iphone-screen.jpg?s=612x612&w=0&k=20&c=r1E6DVAzzmMNwXyypzMGH2impRGB1-Ric7n_e6Wxwl4="
        alt="Social apps on phone screen"
        className="mt-12 mb-12 w-full max-w-4xl animate-fade-in"
      />
    </div>
  );
}

export default Home;
