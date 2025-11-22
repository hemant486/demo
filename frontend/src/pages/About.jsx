function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-5xl font-bold text-gray-900 mb-8 text-center">
          About Us
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Healthcare Portal is dedicated to revolutionizing healthcare
            management by providing a comprehensive, user-friendly platform that
            connects patients with healthcare providers. Our mission is to make
            healthcare accessible, efficient, and transparent for everyone.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What We Offer
          </h2>
          <ul className="space-y-4 text-gray-600 text-lg">
            <li className="flex items-start gap-3">
              <svg
                className="w-6 h-6 text-green-500 mt-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Easy appointment scheduling and management</span>
            </li>
            <li className="flex items-start gap-3">
              <svg
                className="w-6 h-6 text-green-500 mt-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Secure storage of medical records and prescriptions</span>
            </li>
            <li className="flex items-start gap-3">
              <svg
                className="w-6 h-6 text-green-500 mt-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Real-time health tracking and monitoring</span>
            </li>
            <li className="flex items-start gap-3">
              <svg
                className="w-6 h-6 text-green-500 mt-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Direct communication with healthcare providers</span>
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-4">Join Us Today</h2>
          <p className="text-blue-100 text-lg mb-6">
            Experience the future of healthcare management. Sign up now and take
            control of your health journey.
          </p>
          <button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-bold transition">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default About;
