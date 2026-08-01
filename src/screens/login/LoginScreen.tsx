import { useLoginScreen } from "./useLoginScreen";
import LoginToggle from "./components/loginToggle/LoginToggle";
import LoginHeader from "./components/loginHeader/LoginHeader";
import googleLogo from "../../assets/svg/google_logo.svg";
import { useAppSelector } from "../../store/hooks";

const LoginScreen: React.FC = () => {
  const {
    authType,
    showPassword,
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    toggleAuthType,
    toggleShowPassword,
    handleGoogleLogin,
  } = useLoginScreen();

  const { loading, error } = useAppSelector((state) => state.auth);

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-gradient-to-br from-blue-100 via-slate-100 to-indigo-200 text-charcoal transition-colors duration-200 md:h-screen md:overflow-hidden md:flex md:items-center md:justify-center">
      <div className="w-full max-w-md md:w-[55vw] md:max-w-2xl lg:max-w-3xl mx-auto md:shadow-2xl md:rounded-xl md:overflow-hidden">
        <div className="relative flex flex-col group/design-root md:max-h-[90vh] md:overflow-y-auto  [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <LoginHeader />

          {/* Main Card Section (Overlapping the header) */}
          <div className="relative -mt-8 flex-1 w-full bg-white rounded-t-[32px] px-6 py-8 md:px-12 md:py-10 shadow-[0_-4px_24px_rgba(0,0,0,0.06)] transition-colors duration-200">
            <LoginToggle authType={authType} onToggle={toggleAuthType} />

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 flex items-center gap-3 text-red-600">
                <span className="material-symbols-outlined text-xl">error</span>
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Email Field */}
              <label className="flex flex-col gap-2">
                <span className="text-charcoal text-sm font-semibold ml-1">
                  Email Address
                </span>
                <input
                  className="form-input flex w-full h-12 rounded-full border-none bg-input-bg px-6 text-base text-charcoal placeholder:text-[#A0A0A0] focus:ring-2 focus:ring-primary outline-none transition-all"
                  placeholder="hello@roomies.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              {/* Password Field */}
              <label className="flex flex-col gap-2">
                <span className="text-charcoal text-sm font-semibold ml-1">
                  Password
                </span>
                <div className="relative flex w-full items-center">
                  <input
                    className="form-input w-full h-12 rounded-full border-none bg-input-bg pl-6 pr-14 text-base text-charcoal placeholder:text-[#A0A0A0] focus:ring-2 focus:ring-primary outline-none transition-all"
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-medium-gray hover:text-primary transition-colors flex items-center justify-center cursor-pointer"
                    onClick={toggleShowPassword}
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: "22px" }}
                    >
                      {showPassword ? "visibility" : "visibility_off"}
                    </span>
                  </div>
                </div>
              </label>

              {/* Primary Action Button */}
              <button
                type="submit"
                disabled={loading}
                className={`mt-4 flex w-full h-14 rounded-full items-center justify-center text-white text-base font-semibold shadow-[0px_10px_30px_rgba(59,149,234,0.15)] transition-[transform,opacity] duration-200 ease-in-out ${
                  loading
                    ? "bg-primary/70 cursor-not-allowed"
                    : "bg-primary cursor-pointer hover:scale-[0.99] active:scale-[0.98]"
                }`}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Please wait...</span>
                  </div>
                ) : authType === "login" ? (
                  "Log In"
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>

            {/* Social Divider */}
            <div className="relative my-8">
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center"
              >
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-3 text-sm font-medium text-medium-gray">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Button */}
            <button
              onClick={() => handleGoogleLogin()}
              disabled={loading}
              className="flex h-14 w-full items-center justify-center gap-3 rounded-full border border-gray-200 !bg-[#FCFCFD] hover:!bg-gray-50 hover:scale-[0.99] active:scale-[0.98] transition-[transform,opacity,background-color] duration-200 ease-in-out shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <img src={googleLogo} alt="Google" className="h-5 w-5" />
              <span className="text-base font-semibold !text-charcoal">
                Google
              </span>
            </button>

            {/* Safe area spacer for scroll */}
            <div className="h-6 w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
