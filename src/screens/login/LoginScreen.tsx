import { useLoginScreen } from './useLoginScreen';
import LoginToggle from './components/loginToggle/LoginToggle';
import LoginHeader from './components/loginHeader/LoginHeader';

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
                    <button className="flex h-14 w-full items-center justify-center gap-3 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1f2b36] hover:bg-gray-50 dark:hover:bg-[#2c3b4a] transition-all duration-200 shadow-sm">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.0003 20.4498C16.6669 20.4498 20.5847 16.6631 20.5847 11.9964C20.5847 11.2359 20.4862 10.4996 20.3015 9.7998H12.0003V13.0903H17.0601C16.9248 14.3926 15.9392 15.9229 12.0003 15.9229C8.84758 15.9229 6.16879 13.5658 5.62624 10.3794H2.43579V12.8256C4.05353 16.6625 7.74718 20.4498 12.0003 20.4498Z" fill="#34A853"></path>
                            <path d="M5.62615 10.3796C5.4859 9.83984 5.40552 9.27892 5.40552 8.7001C5.40552 8.12128 5.4859 7.56041 5.62615 7.02061V4.57446H2.4357C1.78505 5.82396 1.41406 7.22728 1.41406 8.7001C1.41406 10.1729 1.78505 11.5762 2.4357 12.8258L5.62615 10.3796Z" fill="#FBBC05"></path>
                            <path d="M11.9999 4.97424C14.0759 4.97424 15.5401 5.92224 16.3279 6.64734L18.8031 4.23075C17.1594 2.6975 14.7936 1.49976 11.9999 1.49976C7.74676 1.49976 4.0531 5.28704 2.43536 9.12396L5.62581 11.5701C6.16836 8.38376 8.84715 4.97424 11.9999 4.97424Z" fill="#EA4335"></path>
                            <path d="M20.5843 11.9966C20.5843 11.2361 20.4858 10.4998 20.3011 9.8H20.3204L22.8427 7.72852C22.6568 8.44116 22.8989 11.6661 20.5843 11.9966Z" fill="#4285F4"></path>
                        </svg>
                        <span className="text-base font-semibold text-charcoal dark:text-white">Google</span>
                    </button>

                    {/* Safe area spacer for scroll */}
                    <div className="h-6 w-full"></div>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
