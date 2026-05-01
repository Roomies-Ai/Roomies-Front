import { useLoginScreen } from './useLoginScreen';
import LoginToggle from './components/loginToggle/LoginToggle';
import LoginHeader from './components/loginHeader/LoginHeader';
import googleLogo from '../../assets/svg/google_logo.svg';
import { useAppSelector } from '../../store/hooks';

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
        handleGoogleLogin
    } = useLoginScreen();

    const { loading, error } = useAppSelector((state) => state.auth);

    return (
        <div className="w-100 max-w-md mx-auto bg-background-light dark:bg-background-dark text-charcoal dark:text-white overflow-x-hidden min-h-screen transition-colors duration-200">
            <div className="relative flex h-full min-h-screen w-full flex-col group/design-root">
                <LoginHeader />

                {/* Main Card Section (Overlapping the header) */}
                <div className="relative -mt-8 flex-1 w-full bg-white dark:bg-background-dark rounded-t-[32px] px-6 py-8 shadow-[0_-4px_24px_rgba(0,0,0,0.06)] dark:shadow-none transition-colors duration-200">
                    <LoginToggle authType={authType} onToggle={toggleAuthType} />

                    {error && (
                        <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 flex items-center gap-3 text-red-600 dark:text-red-400">
                            <span className="material-symbols-outlined text-xl">error</span>
                            <span className="text-sm font-medium">{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        {/* Email Field */}
                        <label className="flex flex-col gap-2">
                            <span className="text-charcoal dark:text-gray-200 text-sm font-semibold ml-1">Email Address</span>
                            <input
                                className="form-input flex w-full h-12 rounded-full border-none bg-input-bg dark:bg-[#1f2b36] px-6 text-base text-charcoal dark:text-white placeholder:text-[#A0A0A0] focus:ring-2 focus:ring-primary outline-none transition-all"
                                placeholder="hello@roomies.com"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </label>
                        {/* Password Field */}
                        <label className="flex flex-col gap-2">
                            <span className="text-charcoal dark:text-gray-200 text-sm font-semibold ml-1">Password</span>
                            <div className="relative flex w-full items-center rounded-full bg-input-bg dark:bg-[#1f2b36] focus-within:ring-2 focus-within:ring-primary transition-all">
                                <input
                                    className="form-input flex-1 h-12 w-full border-none bg-transparent px-6 text-base text-charcoal dark:text-white placeholder:text-[#A0A0A0] focus:ring-0 outline-none"
                                    placeholder="Enter your password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <div
                                    className="pr-6 text-medium-gray hover:text-primary transition-colors flex items-center justify-center cursor-pointer"
                                    onClick={toggleShowPassword}
                                >
                                    <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>
                                        {showPassword ? 'visibility' : 'visibility_off'}
                                    </span>
                                </div>
                            </div>
                        </label>
                        {/* Forgot Password */}
                        <div className="flex justify-end -mt-1">
                            <a className="text-primary text-sm font-semibold hover:text-primary/80 transition-colors" href="#">Forgot Password?</a>
                        </div>
                        {/* Primary Action Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`mt-4 flex w-full h-14 rounded-full items-center justify-center text-white text-base font-semibold shadow-[0px_10px_30px_rgba(59,149,234,0.15)] transition-all duration-200 ease-in-out ${
                                loading 
                                ? 'bg-primary/70 cursor-not-allowed' 
                                : 'bg-primary hover:scale-[0.99] active:scale-[0.98]'
                            }`}
                        >
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Please wait...</span>
                                </div>
                            ) : (
                                authType === 'login' ? 'Log In' : 'Sign Up'
                            )}
                        </button>
                    </form>

                    {/* Social Divider */}
                    <div className="relative my-8">
                        <div aria-hidden="true" className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-white dark:bg-background-dark px-3 text-sm font-medium text-medium-gray">Or continue with</span>
                        </div>
                    </div>

                    {/* Social Button */}
                    <button 
                        onClick={() => handleGoogleLogin()}
                        disabled={loading}
                        className="flex h-14 w-full items-center justify-center gap-3 rounded-full border border-gray-200 !bg-white hover:bg-gray-50 transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <img src={googleLogo} alt="Google" className="h-5 w-5" />
                        <span className="text-base font-semibold !text-charcoal">Google</span>
                    </button>

                    {/* Safe area spacer for scroll */}
                    <div className="h-6 w-full"></div>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
