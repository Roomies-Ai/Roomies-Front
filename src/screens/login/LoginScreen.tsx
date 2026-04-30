import { useLoginScreen } from './useLoginScreen';
import LoginToggle from './components/loginToggle/LoginToggle';
import LoginHeader from './components/loginHeader/LoginHeader';
import googleLogo from '../../assets/svg/google_logo.svg';

const LoginScreen: React.FC = () => {
    const {
        authType,
        showPassword,
        handleSubmit,
        toggleAuthType,
        toggleShowPassword
    } = useLoginScreen();

    return (
        <div className="w-100 max-w-md mx-auto bg-background-light dark:bg-background-dark text-charcoal dark:text-white overflow-x-hidden min-h-screen transition-colors duration-200">
            <div className="relative flex h-full min-h-screen w-full flex-col group/design-root">
                <LoginHeader />

                {/* Main Card Section (Overlapping the header) */}
                <div className="relative -mt-8 flex-1 w-full bg-white dark:bg-background-dark rounded-t-[32px] px-6 py-8 shadow-[0_-4px_24px_rgba(0,0,0,0.06)] dark:shadow-none transition-colors duration-200">
                    <LoginToggle authType={authType} onToggle={toggleAuthType} />

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        {/* Email Field */}
                        <label className="flex flex-col gap-2">
                            <span className="text-charcoal dark:text-gray-200 text-sm font-semibold ml-1">Email Address</span>
                            <input
                                className="form-input flex w-full h-12 rounded-full border-none bg-input-bg dark:bg-[#1f2b36] px-6 text-base text-charcoal dark:text-white placeholder:text-[#A0A0A0] focus:ring-2 focus:ring-primary outline-none transition-all"
                                placeholder="hello@roomies.com"
                                type="email"
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
                            className="mt-4 flex w-full h-14 rounded-full items-center justify-center bg-primary text-white text-base font-semibold shadow-[0px_10px_30px_rgba(59,149,234,0.15)] hover:scale-[0.99] active:scale-[0.98] transition-all duration-200 ease-in-out"
                        >
                            {authType === 'login' ? 'Log In' : 'Sign Up'}
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
                    <button className="flex h-14 w-full items-center justify-center gap-3 rounded-full border border-gray-200 !bg-white hover:bg-gray-50 transition-all duration-200 shadow-sm">
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
